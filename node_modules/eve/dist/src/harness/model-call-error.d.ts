import type { JsonObject } from "#shared/json.js";
/**
 * The most informative human-readable rejection a model-call error
 * carries, extracted from the upstream response. Not a semantic-error
 * classification: the message is arbitrary provider prose, so it carries
 * no catalog id — `semanticErrorId` is reserved for registered rules.
 */
export interface UpstreamRejectionSummary {
    readonly name: string;
    readonly message: string;
}
/**
 * Extracts the most informative upstream rejection message from a
 * model-call error that the semantic-error catalog did not recognize.
 * These failures happen before the agent can produce a response, so the
 * user-facing message should avoid implying a bad tool call. Returns
 * `null` when the error carries nothing better than its raw message.
 */
export declare function extractUpstreamRejectionMessage(error: unknown): UpstreamRejectionSummary | null;
/**
 * Returns the distinct upstream tool types referenced by any
 * "tool type 'X' is not supported" rejection in an AI Gateway error's
 * provider attempt list.
 *
 * Walks the cause chain to find the gateway error and inspects both the
 * structured `data` field and the raw `responseBody` JSON. Returns an
 * empty array for errors that are not of this shape.
 *
 * Used by the harness recovery path to identify which framework tools
 * to drop before retrying the failing step. Detection is by string
 * match on the upstream tool type — see
 * {@link resolveFrameworkToolFromUpstreamType} for the mapping back to
 * framework tool names.
 */
export declare function extractUnsupportedProviderToolTypes(error: unknown): readonly string[];
/**
 * Extracts compact, structured diagnostics from AI SDK / AI Gateway model-call
 * errors. The full SDK error can include very large request bodies (especially
 * tool schemas), so this shape lifts the important upstream response fields into
 * `step.failed.details` before any inspector output gets truncated.
 */
export declare function extractModelCallErrorDetails(error: unknown): JsonObject;
/**
 * A model call that produced no content. Raised by tool-loop.ts from
 * either of its two triggers: `isEmptyModelResponse` (a completed step
 * with finishReason 'other' and no output — AI Gateway HTTP 200 whose
 * stream carries no content, no usage, and no error) or
 * {@link isNoOutputGeneratedError} (the AI SDK rejecting a stream that
 * closed after metadata without output, normalized via the model call's
 * rethrow so both shapes funnel into one recovery).
 *
 * The message is channel-visible when recovery is exhausted, so it is
 * written for end users. The SDK rejection is preserved as `cause` to
 * keep the two triggers distinguishable in logs.
 */
export declare class EmptyModelResponseError extends Error {
    constructor(options?: {
        cause?: unknown;
    });
}
/**
 * Coerces a streamed provider failure into an Error while retaining the raw
 * payload so provider discriminators remain visible to error classification.
 */
export declare function normalizeModelStreamError(raw: unknown): Error;
/**
 * True when the error (or any error in its cause chain) is the AI SDK's
 * `NoOutputGeneratedError`. Since `ai@7.0.0-canary.169` (vercel/ai#15938)
 * a model stream that ends after metadata without any output or finish
 * chunk rejects with this error instead of completing an empty step —
 * the same upstream failure `isEmptyModelResponse` detects, surfaced as
 * a throw. Matched by `name` rather than `instanceof` so the check
 * survives a duplicated `ai` package and `toError`'s plain-object
 * coercion, which preserves `name` but not class identity.
 */
export declare function isNoOutputGeneratedError(error: unknown): boolean;
/**
 * Classifies a model-call failure into the runtime's recovery policy.
 */
export declare function classifyModelCallError(error: unknown): "retry" | "recoverable" | "terminal";
