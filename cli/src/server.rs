//! ARCHON Enterprise HTTP Server.
//!
//! Long-running SELIN service endpoint handler with:
//!   GET  /health            → liveness & readiness probe
//!   GET  /metrics           → real-time performance & governance metrics
//!   POST /v1/govern         → govern a prompt, returns ADCCL verdict
//!   GET  /v1/audit/:run_id  → stored proof trace for a run
//!
//! Features:
//!   - Optional API Key / Bearer authentication (`ARCHON_API_KEY`)
//!   - Prompt length boundaries and zero-width injection sanitization
//!   - Concurrency rate-limiting and task timeout bounds
//!   - Enterprise telemetry metrics counter

use std::env;
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use std::time::Duration;

use axum::{
    extract::{Path, State},
    http::{HeaderMap, HeaderValue, StatusCode},
    middleware::{self, Next},
    response::Response,
    routing::{get, post},
    Json, Router,
};
use reqwest::Client;
use serde::Deserialize;
use serde_json::{json, Value};
use tokio::sync::Semaphore;
use tower_http::set_header::SetResponseHeaderLayer;

use crate::governance::{govern, GovernConfig};
use crate::init::open_myelin;

const MAX_PROMPT_BYTES: usize = 32_768; // 32KB boundary
const MAX_CONCURRENT: usize = 16;
const GOVERN_TIMEOUT_SECS: u64 = 120;

#[derive(Default)]
pub struct MetricsState {
    pub total_requests: AtomicU64,
    pub passed_requests: AtomicU64,
    pub rejected_requests: AtomicU64,
    pub error_requests: AtomicU64,
}

pub struct AppState {
    client: Client,
    endpoint: String,
    model: String,
    api_key: Option<String>,
    limiter: Semaphore,
    pub metrics: MetricsState,
}

#[derive(Deserialize)]
struct GovernRequest {
    prompt: String,
    signoff: Option<String>,
}

/// Build the router with all security and telemetry middleware.
pub fn build_app(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/metrics", get(metrics_handler))
        .route("/v1/govern", post(govern_handler))
        .route("/v1/audit/:run_id", get(audit_handler))
        .layer(middleware::from_fn_with_state(state.clone(), auth_middleware))
        .layer(SetResponseHeaderLayer::overriding(
            axum::http::header::X_CONTENT_TYPE_OPTIONS,
            HeaderValue::from_static("nosniff"),
        ))
        .layer(SetResponseHeaderLayer::overriding(
            axum::http::header::X_FRAME_OPTIONS,
            HeaderValue::from_static("DENY"),
        ))
        .layer(SetResponseHeaderLayer::overriding(
            axum::http::header::CONTENT_SECURITY_POLICY,
            HeaderValue::from_static("default-src 'none'"),
        ))
        .with_state(state)
}

/// Build and run the server on `port`.
pub async fn serve(port: u16) {
    let endpoint = crate::init::load_endpoint_from_bp();
    let client = Client::builder()
        .timeout(Duration::from_secs(60))
        .build()
        .expect("failed to build HTTP client");
    let model = crate::preflight::detect_ollama_model(&endpoint, &client).await;
    let api_key = env::var("ARCHON_API_KEY").ok().filter(|k| !k.trim().is_empty());

    if let Some(ref k) = api_key {
        println!("ARCHON Security: API key verification enabled (key length: {})", k.len());
    } else {
        println!("ARCHON Security Warning: ARCHON_API_KEY environment variable not set. Server running unauthenticated.");
    }

    let state = Arc::new(AppState {
        client,
        endpoint: endpoint.clone(),
        model: model.clone(),
        api_key,
        limiter: Semaphore::new(MAX_CONCURRENT),
        metrics: MetricsState::default(),
    });

    let app = build_app(state);

    let addr = format!("0.0.0.0:{port}");
    println!("ARCHON server listening on http://{addr}");
    println!("  endpoint={endpoint}  model={model}  max_concurrent={MAX_CONCURRENT}");
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .unwrap_or_else(|e| panic!("could not bind {addr}: {e}"));
    axum::serve(listener, app).await.expect("server error");
}

/// Authentication middleware enforcing API key verification if configured.
async fn auth_middleware(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    request: axum::extract::Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<Value>)> {
    if let Some(ref required_key) = state.api_key {
        let auth_header = headers.get("Authorization").and_then(|h| h.to_str().ok());
        let x_key_header = headers.get("X-API-Key").and_then(|h| h.to_str().ok());

        let token = auth_header
            .and_then(|h| h.strip_prefix("Bearer ").or(Some(h)))
            .or(x_key_header);

        match token {
            Some(t) if t == required_key => {}
            _ => {
                state.metrics.error_requests.fetch_add(1, Ordering::Relaxed);
                return Err((
                    StatusCode::UNAUTHORIZED,
                    Json(json!({ "error": "Unauthorized: Invalid or missing API key" })),
                ));
            }
        }
    }

    Ok(next.run(request).await)
}

/// Sanitize input prompt by checking length bounds and stripping hidden zero-width unicode.
pub fn sanitize_prompt(prompt: &str) -> Result<String, &'static str> {
    if prompt.trim().is_empty() {
        return Err("prompt must not be empty");
    }
    if prompt.len() > MAX_PROMPT_BYTES {
        return Err("prompt exceeds maximum allowed byte limit (32KB)");
    }

    let sanitized: String = prompt
        .chars()
        .filter(|ch| {
            !matches!(
                ch,
                '\u{200B}'..='\u{200F}' | '\u{202A}'..='\u{202E}' | '\u{2060}'..='\u{2064}' | '\u{FEFF}' | '\u{00AD}'
            )
        })
        .collect();

    Ok(sanitized)
}

async fn health() -> Json<Value> {
    Json(json!({
        "status": "ok",
        "service": "archon-selin",
        "version": env!("CARGO_PKG_VERSION")
    }))
}

async fn metrics_handler(State(state): State<Arc<AppState>>) -> Json<Value> {
    Json(json!({
        "total_requests": state.metrics.total_requests.load(Ordering::Relaxed),
        "passed_requests": state.metrics.passed_requests.load(Ordering::Relaxed),
        "rejected_requests": state.metrics.rejected_requests.load(Ordering::Relaxed),
        "error_requests": state.metrics.error_requests.load(Ordering::Relaxed),
        "max_concurrent_capacity": MAX_CONCURRENT,
    }))
}

async fn govern_handler(
    State(state): State<Arc<AppState>>,
    Json(req): Json<GovernRequest>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    state.metrics.total_requests.fetch_add(1, Ordering::Relaxed);

    let clean_prompt = match sanitize_prompt(&req.prompt) {
        Ok(p) => p,
        Err(err) => {
            state.metrics.error_requests.fetch_add(1, Ordering::Relaxed);
            return Err((
                StatusCode::BAD_REQUEST,
                Json(json!({ "error": err })),
            ));
        }
    };

    // Rate limit: acquire a slot or shed load with 503.
    let _permit = state.limiter.try_acquire().map_err(|_| {
        state.metrics.error_requests.fetch_add(1, Ordering::Relaxed);
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
    let fut = govern(&state.client, &cfg, &clean_prompt);
    match tokio::time::timeout(Duration::from_secs(GOVERN_TIMEOUT_SECS), fut).await {
        Ok(outcome) => {
            if outcome.passed {
                state.metrics.passed_requests.fetch_add(1, Ordering::Relaxed);
            } else {
                state.metrics.rejected_requests.fetch_add(1, Ordering::Relaxed);
            }
            Ok(Json(serde_json::to_value(outcome).unwrap_or(Value::Null)))
        }
        Err(_) => {
            state.metrics.error_requests.fetch_add(1, Ordering::Relaxed);
            Err((
                StatusCode::GATEWAY_TIMEOUT,
                Json(json!({ "error": "governance timed out" })),
            ))
        }
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
    let conn = open_myelin().ok()?;
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
