import type { RuntimeActionResult } from "#runtime/actions/types.js";
/**
 * Emits one caller-side `invoke_agent` span per successful delegated
 * subagent result that reports token usage, so the parent session's
 * observability can attribute a child agent's tokens. Runs in the
 * parent's turn step, so the span lands in the caller's trace.
 * Best-effort: a tracer failure never blocks the turn.
 */
export declare function recordSubagentUsageSpans(results: readonly RuntimeActionResult[]): void;
