//! ARCHON HTTP server.
//!
//! Turns SELIN into an actual long-running service (the Docker container used to
//! just run `preflight` once and exit). Endpoints:
//!   GET  /health            → liveness probe
//!   POST /v1/govern         → govern a prompt, returns the ADCCL verdict
//!   GET  /v1/audit/:run_id  → the stored proof trace for a run
//!
//! Concurrency is capped with a semaphore (basic rate limiting) and every
//! govern call is bounded by a timeout so one slow model can't wedge the server.

use std::sync::Arc;
use std::time::Duration;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use reqwest::Client;
use rusqlite::Connection;
use serde::Deserialize;
use serde_json::{json, Value};
use tokio::sync::Semaphore;

use crate::governance::{govern, GovernConfig};
use crate::init::myelin_db_path;

struct AppState {
    client: Client,
    endpoint: String,
    model: String,
    /// Bounds concurrent govern calls (simple in-process rate limit).
    limiter: Semaphore,
}

const MAX_CONCURRENT: usize = 8;
const GOVERN_TIMEOUT_SECS: u64 = 120;

#[derive(Deserialize)]
struct GovernRequest {
    prompt: String,
    signoff: Option<String>,
}

/// Build and run the server on `port`.
pub async fn serve(port: u16) {
    let endpoint = crate::init::load_endpoint_from_bp();
    let client = Client::builder()
        .timeout(Duration::from_secs(60))
        .build()
        .expect("failed to build HTTP client");
    let model = crate::preflight::detect_ollama_model(&endpoint, &client).await;

    let state = Arc::new(AppState {
        client,
        endpoint: endpoint.clone(),
        model: model.clone(),
        limiter: Semaphore::new(MAX_CONCURRENT),
    });

    let app = Router::new()
        .route("/health", get(health))
        .route("/v1/govern", post(govern_handler))
        .route("/v1/audit/:run_id", get(audit_handler))
        .with_state(state);

    let addr = format!("0.0.0.0:{port}");
    println!("ARCHON server listening on http://{addr}");
    println!("  endpoint={endpoint}  model={model}  max_concurrent={MAX_CONCURRENT}");
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .unwrap_or_else(|e| panic!("could not bind {addr}: {e}"));
    axum::serve(listener, app).await.expect("server error");
}

async fn health() -> Json<Value> {
    Json(json!({ "status": "ok", "service": "archon-selin", "version": env!("CARGO_PKG_VERSION") }))
}

async fn govern_handler(
    State(state): State<Arc<AppState>>,
    Json(req): Json<GovernRequest>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    if req.prompt.trim().is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(json!({ "error": "prompt must not be empty" })),
        ));
    }
    // Rate limit: acquire a slot or shed load with 503.
    let _permit = state.limiter.try_acquire().map_err(|_| {
        (
            StatusCode::SERVICE_UNAVAILABLE,
            Json(json!({ "error": "server at capacity, retry shortly" })),
        )
    })?;

    let cfg = GovernConfig {
        endpoint: state.endpoint.clone(),
        model: state.model.clone(),
        signoff_phrase: req.signoff.clone(),
    };
    let fut = govern(&state.client, &cfg, &req.prompt);
    match tokio::time::timeout(Duration::from_secs(GOVERN_TIMEOUT_SECS), fut).await {
        Ok(outcome) => Ok(Json(serde_json::to_value(outcome).unwrap_or(Value::Null))),
        Err(_) => Err((
            StatusCode::GATEWAY_TIMEOUT,
            Json(json!({ "error": "governance timed out" })),
        )),
    }
}

async fn audit_handler(
    Path(run_id): Path<String>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    let result = tokio::task::spawn_blocking(move || read_run(&run_id))
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": format!("audit task failed: {e}") })),
            )
        })?;
    match result {
        Some(v) => Ok(Json(v)),
        None => Err((
            StatusCode::NOT_FOUND,
            Json(json!({ "error": "run_id not found" })),
        )),
    }
}

/// Read one run's proof trace from the myelin store.
fn read_run(run_id: &str) -> Option<Value> {
    let conn = Connection::open(myelin_db_path()).ok()?;
    conn.query_row(
        "SELECT run_id, created_at, prompt_hash, v_score, j_penalty, chi_invariant, passed, rejection_reason, model_endpoint, raw_output_snippet
         FROM adccl_runs WHERE run_id = ?1",
        rusqlite::params![run_id],
        |r| {
            Ok(json!({
                "run_id": r.get::<_, String>(0)?,
                "created_at": r.get::<_, String>(1)?,
                "prompt_hash": r.get::<_, String>(2)?,
                "v_score": r.get::<_, f64>(3)?,
                "j_penalty": r.get::<_, f64>(4)?,
                "chi_invariant": r.get::<_, f64>(5)?,
                "passed": r.get::<_, i64>(6)? == 1,
                "rejection_reason": r.get::<_, Option<String>>(7)?,
                "model_endpoint": r.get::<_, String>(8)?,
                "raw_output_snippet": r.get::<_, Option<String>>(9)?,
            }))
        },
    )
    .ok()
}
