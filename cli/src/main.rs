use clap::{Parser, Subcommand};

mod audit;
mod init;
mod preflight;
mod run;

#[derive(Parser)]
#[command(name = "selin")]
#[command(version = "1.0.0")]
#[command(about = "Chyren SELIN Series (ARCHON) — Sovereign Encrypted Localized Identity Nestor", long_about = None)]
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
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::Init => init::execute_init(),
        Commands::Preflight => preflight::execute_preflight(),
        Commands::Run { prompt } => run::execute_run(prompt),
        Commands::Audit { run_id } => audit::execute_audit(run_id),
    }
}
