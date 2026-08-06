import { type RunErrorCode } from '#compiled/@workflow/errors/index.js';
/**
 * Attribution of a workflow/step failure for presentation.
 *
 * - `user`: the error came from customer code (a step or workflow function
 *   threw, or a value they passed across a boundary wasn't serializable).
 * - `sdk`: the SDK produced the error itself — an internal invariant broke,
 *   or a runtime guard rejected the call. These should be rare; when they
 *   happen we want to frame the terminal output as "this is us, not you."
 */
export type ErrorAttribution = 'user' | 'sdk';
export interface ErrorDescription {
    attribution: ErrorAttribution;
    errorCode: RunErrorCode;
    /**
     * Short, class-aware hint to help a user understand what the error means.
     * Only set for well-known SDK error classes (SerializationError,
     * WorkflowRuntimeError, context-violation errors); `undefined` for plain
     * user errors, where the stack is already the most useful thing to show.
     */
    hint?: string;
}
/**
 * Error signal fields carried on persisted failure events (e.g.
 * `run_failed` / `step_failed`). The shape is intentionally loose:
 *
 * - `errorCode` is typed as `string` rather than `RunErrorCode` because
 *   the value comes from stored JSON/CBOR and may predate the current
 *   enum — callers should not narrow on it blindly. Values that don't
 *   match a known `RUN_ERROR_CODES` entry fall through to USER_ERROR.
 * - `errorName` is the thrown `Error#name`. It is not universally
 *   persisted today; callers that have access to it (either via an
 *   in-memory throw or a richer payload) can pass it in to sharpen
 *   the attribution and hint. When absent, `describeRunError` still
 *   returns a sensible attribution from `errorCode` alone.
 */
export interface PersistedErrorSignal {
    errorCode?: string;
    errorName?: string;
}
/**
 * Data-driven variant of {@link describeError} that works from persisted
 * event fields instead of a live `Error` instance. Intended for CLI/web
 * renderers that read failure events and no longer have the original
 * thrown object.
 */
export declare function describeRunError(signal: PersistedErrorSignal): ErrorDescription;
/**
 * Describe an error for user-facing presentation. Purely informational —
 * does not change any persisted event data or error classification used by
 * the runtime.
 *
 * The attribution here is more nuanced than `classifyRunError`:
 *
 * - `SerializationError` is technically raised by the SDK, but it almost
 *   always points at something the caller did (passed a non-serializable
 *   value, didn't register a class). We attribute it to the user.
 * - Context-violation errors (`NotInWorkflowContextError`, etc.) likewise
 *   describe a user mistake.
 * - `WorkflowRuntimeError` (and subclasses like `StepNotRegisteredError`)
 *   indicates an internal SDK invariant broke — surface that as `sdk`.
 *
 * @param err The error value thrown by the workflow / step.
 * @param errorCode Optional precomputed error code. Callers that already
 *   know the code (e.g. `REPLAY_TIMEOUT` or `MAX_DELIVERIES_EXCEEDED`, which
 *   `classifyRunError` can't derive from the error alone) should pass it so
 *   the attribution and hint reflect the actual failure category.
 */
export declare function describeError(err: unknown, errorCode?: RunErrorCode): ErrorDescription;
//# sourceMappingURL=describe-error.d.ts.map