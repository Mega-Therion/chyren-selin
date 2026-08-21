use clap::{Parser, Subcommand};

mod audit;
mod governance;
mod init;
mod mvpc_bridge;
mod preflight;
mod run;
mod server;

#[derive(Parser)]
#[command(name = "selin")]
#[command(version)]
#[command(
    about = "SELIN (ARCHON) — Sovereign Encrypted Localized Identity Node",
    long_about = None
)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize local RIYU identity basepoint
    Init,
    /// Probe the configured model endpoint
    Preflight,
    /// Govern a single prompt through ADCCL
    Run { prompt: String },
    /// Render proof trace for an ADCCL run by run_id
    Audit { run_id: String },
    /// Start the ARCHON HTTP governance server
    Serve {
        /// Port to listen on
        #[arg(long, default_value_t = 8080)]
        port: u16,
        /// Bind address (default 127.0.0.1 local-first; use 0.0.0.0 only knowingly)
        #[arg(long, default_value = "127.0.0.1")]
        bind: String,
        /// Optional API Key for HTTP authentication (defaults to ARCHON_API_KEY env)
        #[arg(long)]
        api_key: Option<String>,
    },
    /// Mechanically audit a formal/claim artifact via local MVPC-X (no network)
    #[command(name = "verify-artifact")]
    VerifyArtifact {
        /// Path to .lean / .v / .thy / .py / claim package
        path: String,
        /// MVPC policy: permissive | default | strict
        #[arg(long, default_value = "default")]
        policy: String,
        /// Forward MVPC JSON to stdout
        #[arg(long)]
        json: bool,
        /// Optional ADCCL run_id for local correlation sidecar only
        #[arg(long)]
        run_id: Option<String>,
    },
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Init => init::execute_init().await,
        Commands::Preflight => preflight::execute_preflight().await,
        Commands::Run { prompt } => run::execute_run(&prompt).await,
        Commands::Audit { run_id } => audit::execute_audit(&run_id),
        Commands::Serve {
            port,
            bind,
            api_key,
        } => server::serve_bind(&bind, port, api_key).await,
        Commands::VerifyArtifact {
            path,
            policy,
            json,
            run_id,
        } => mvpc_bridge::verify_artifact_cli(&path, &policy, json, run_id.as_deref()),
    }
}
