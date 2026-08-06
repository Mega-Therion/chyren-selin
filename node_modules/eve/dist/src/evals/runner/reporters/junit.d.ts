import type { EvalReporter } from "#evals/runner/reporters/types.js";
export interface JUnitReporterConfig {
    readonly filePath: string;
    readonly suiteName?: string;
}
/**
 * Creates a reporter that writes one JUnit XML testsuite for an eval run.
 * Each eval becomes one `<testcase>` named by its path-derived id.
 */
export declare function JUnit(config: JUnitReporterConfig): EvalReporter;
