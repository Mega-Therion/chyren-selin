import { type SemanticErrorSummary } from "./rule.js";
export type { ErrorLink, ErrorSignals } from "./signals.js";
export type { LinkPredicate, SemanticErrorRule, SemanticErrorSummary } from "./rule.js";
/**
 * Projects any thrown error into its cataloged semantic summary, or
 * `null` when no rule matches — callers then fall back to the raw
 * message plus the full diagnostic dump routed to the log.
 */
export declare function summarizeKnownError(error: unknown): SemanticErrorSummary | null;
