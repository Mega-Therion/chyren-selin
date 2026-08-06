import type { Client } from "#client/client.js";
import type { EveEval, EveEvalConfig, EveEvalRunSummary, EveEvalTargetHandle } from "#evals/types.js";
import type { EvalReporter } from "#evals/runner/reporters/types.js";
/**
 * Options for executing a set of evals as one run.
 */
export interface RunEvalsOptions {
    readonly evaluations: readonly EveEval[];
    /** Run-wide configuration from `evals.config.ts` (defaults shared by every eval). */
    readonly config: EveEvalConfig;
    readonly target: EveEvalTargetHandle;
    readonly client: Client;
    readonly appRoot: string;
    /** Run-level reporters (console, JUnit) that observe every eval. */
    readonly reporters: readonly EvalReporter[];
    /** When false, eval-defined and config `reporters` are ignored (CLI `--skip-report`). */
    readonly includeEvalReporters?: boolean;
    /**
     * Maximum number of evals executing at once. Must be a positive integer.
     * Overrides the config `maxConcurrency`; defaults to 8 when neither is set.
     */
    readonly maxConcurrency?: number;
    /** Overrides every eval's `timeoutMs` when set (CLI `--timeout`). */
    readonly timeoutMs?: number;
    /** Receives `t.log` lines as evals run (used by `--verbose`). */
    readonly onEvalLog?: (evalId: string, message: string) => void;
}
/**
 * Executes every eval with bounded concurrency, drives reporters, writes
 * run artifacts under `.eve/evals/`, and returns the aggregated summary.
 *
 * Run-level reporters observe every eval. Eval-defined reporters observe
 * only the evals that reference them; a reporter instance shared by several
 * evals (e.g. one `Braintrust()` passed to every entry of an array export)
 * is deduplicated and observes all of its evals as one group.
 */
export declare function runEvals(options: RunEvalsOptions): Promise<EveEvalRunSummary>;
