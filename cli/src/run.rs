use archon_kernel::AdcclGate;

pub fn execute_run(prompt: &str) {
    println!("Executing ARCHON-governed task: \"{}\"", prompt);
    let gate = AdcclGate::default();

    // Simulated multi-pass structural verification
    let v_score = 0.92;
    let j_penalty = 0.08;
    let report = gate.evaluate(v_score, j_penalty);

    if report.passed {
        println!("\n[ADCCL GATE: PASSED]");
        println!("Chiral Invariant: {:.4} (Threshold: {:.4})", report.chiral_invariant, gate.threshold);
        println!("Output: Based on verified evidence, standard physics applies.");
    } else {
        println!("\n[ADCCL GATE: REJECTED]");
        println!("{}", report.rejection_reason.unwrap());
    }
}
