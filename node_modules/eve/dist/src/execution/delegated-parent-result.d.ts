/**
 * Pure helpers that project a delegated subagent's terminal output
 * into the runtime-action result shape its parent driver expects.
 * Lives in its own (non-directive) file to escape the workflow
 * step-proxy transform.
 */
import type { RuntimeSubagentChildResult } from "#runtime/actions/types.js";
/**
 * Builds the success-shaped {@link RuntimeSubagentChildResult}.
 * Returns `undefined` for root sessions (no parent to notify).
 */
export declare function createDelegatedSubagentSuccessResult(serializedContext: Record<string, unknown>, output: unknown): RuntimeSubagentChildResult | undefined;
/** Failure-path mirror of {@link createDelegatedSubagentSuccessResult}. */
export declare function createDelegatedSubagentErrorResult(serializedContext: Record<string, unknown>, error: unknown): RuntimeSubagentChildResult | undefined;
