/**
 * Deterministic HITL continuation prompt for session token limits.
 *
 * When a durable session reaches its configured token budget, the harness
 * parks on a harness-authored input request instead of failing the session.
 * The request is derived only from the session identity and violation, so
 * identical session state always produces an identical prompt — no model call
 * is involved.
 */
import type { InputRequest, InputResponse } from "#runtime/input/types.js";
import type { SessionTokenLimitViolation } from "#harness/turn-tag-state.js";
/** Synthetic action tool name carried by session-limit continuation requests. */
export declare const SESSION_LIMIT_CONTINUATION_TOOL_NAME = "session_limit_continuation";
/** Option id that grants a fresh token budget window. */
export declare const SESSION_LIMIT_CONTINUE_OPTION_ID = "continue";
/** Option id that declines continuation and ends the session. */
export declare const SESSION_LIMIT_STOP_OPTION_ID = "stop";
/**
 * Builds the deterministic continuation prompt for one session token limit
 * violation.
 */
export declare function createSessionLimitContinuationRequest(input: {
    readonly sessionId: string;
    readonly violation: SessionTokenLimitViolation;
}): InputRequest;
/**
 * Returns true when a request is a harness-authored session-limit
 * continuation prompt.
 */
export declare function isSessionLimitContinuationRequest(request: InputRequest): boolean;
/**
 * Matches request ids minted by {@link createSessionLimitContinuationRequest}.
 *
 * Continuation requests never enter model history (no matching tool call
 * exists), so the id shape is the only durable marker for recognizing a
 * stale continuation answer after its request left the pending batch.
 */
export declare function isSessionLimitContinuationRequestId(requestId: string): boolean;
/**
 * Resolves the user's answer to a session-limit continuation prompt.
 *
 * Returns `{ granted: true }` for "continue", `{ granted: false }` for
 * "stop", and `undefined` when the batch carries no continuation request or
 * the user has not answered it — an unanswered prompt is re-raised on the
 * next step because the violation still holds.
 */
export declare function resolveSessionLimitContinuation(input: {
    readonly requests: readonly InputRequest[];
    readonly responses: readonly InputResponse[];
}): {
    readonly granted: boolean;
} | undefined;
