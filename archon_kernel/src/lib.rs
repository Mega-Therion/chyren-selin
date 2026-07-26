//! ARCHON Kernel: Anti-drift Runtime Control & Holonomy Orchestration Node.
//!
//! Provides public-safe ADCCL verification, provider adapters, and basepoint seals.

pub mod adccl_gate;
pub mod basepoint;
pub mod provider;

pub use adccl_gate::{compute_chiral_invariant, AdcclGate, CHIRAL_FLOOR};
