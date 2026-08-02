use clap::{Parser, Subcommand};

mod audit;
mod governance;
mod init;
mod preflight;
mod run;
mod server;

#[derive(Parser)]
#[command(name = "selin")]
#[command(version)]
#[command(
    about = "Chyren SELIN Series (ARCHON) — Sovereign Localized Identity Nestor",
    long_about = None
)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize your Sovereign Identity Basepoint (Yettragrammaton 4-step wizard)
    Init,
    /// Diagnostic preflight check on connected AI model endpoint
    Preflight,
    /// Run an ARCHON-governed task (logs {V, J, χ} to myelin store)
    Run { prompt: String },
    /// Render proof trace for an ADCCL run by run_id
    Audit { run_id: String },
    /// Start the ARCHON HTTP governance server
    Serve {
        /// Port to listen on
        #[arg(long, default_value_t = 8080)]
        port: u16,
    },
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::Init => init::execute_init().await,
        Commands::Preflight => preflight::execute_preflight().await,
        Commands::Run { prompt } => run::execute_run(prompt).await,
        Commands::Audit { run_id } => audit::execute_audit(run_id),
        Commands::Serve { port } => server::serve(*port).await,
    }
}
