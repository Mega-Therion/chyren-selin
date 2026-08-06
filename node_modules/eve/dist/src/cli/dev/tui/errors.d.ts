/**
 * Error classification and display formatting shared by the TUI runner and
 * terminal renderer. One module owns the interrupt sentinel and the
 * failure-event projections so the two sides cannot drift apart.
 */
import type { SessionFailedStreamEvent, StepFailedStreamEvent, TurnFailedStreamEvent } from "#client/index.js";
/**
 * One of the failure events a session stream can carry. All three share the
 * same `{ code, message, details? }` payload shape — the harness emits them
 * as a cascade (`step.failed` → `turn.failed` → `session.failed` /
 * `session.waiting`) describing a single underlying failure.
 */
export type FailureStreamEvent = StepFailedStreamEvent | TurnFailedStreamEvent | SessionFailedStreamEvent;
/**
 * Thrown when the user interrupts the TUI (Ctrl+C, or Ctrl+D on an empty
 * prompt). The runner treats it as a clean exit, never as a failure.
 */
export declare class InterruptedError extends Error {
    constructor();
}
export declare function interruptedError(): InterruptedError;
export declare function isInterruptedError(error: unknown): boolean;
/**
 * Recognizes errors raised by aborting an in-flight fetch/stream (e.g. the
 * subagent child-session pump being cancelled). These are expected shutdown
 * noise, not failures to surface.
 */
export declare function isAbortLikeError(error: unknown): boolean;
/**
 * Stable identity for one failure cascade entry. The harness emits the same
 * `{ code, message }` payload on `step.failed`, `turn.failed`, and (for
 * terminal failures) `session.failed`; keying on both lets the stream
 * translator render the underlying failure exactly once.
 */
export declare function failureKey(event: FailureStreamEvent): string;
/**
 * One-line headline for a failure event: `code: message`, except when the
 * message already carries its own class-name prefix (e.g. a
 * `HookConflictError` whose message starts with `HookConflictError:`), in
 * which case the message stands alone instead of reading `Code: Code: …`.
 */
export declare function formatFailureMessage(event: FailureStreamEvent): string;
/**
 * The structured fields the harness attaches to failure-event details:
 * the semantic-error catalog's identity and remediation, plus the raw
 * inspection dump for unrecognized failures. One projection so every
 * consumer narrows the untyped `details` payload the same way.
 */
export interface FailureDetails {
    readonly semanticErrorId?: string;
    readonly hint?: string;
    readonly detail?: string;
}
export declare function failureDetails(event: FailureStreamEvent): FailureDetails;
/**
 * Extracts the structured remediation hint attached to a failure event's
 * details by the semantic-error catalog, if any.
 */
export declare function formatFailureHint(event: FailureStreamEvent): string | undefined;
/**
 * Extracts the diagnostic dump attached to a failure event, if any.
 *
 * `details.detail` is the `util.inspect` rendering (stack trace and cause
 * chain included) that `formatError` attaches to *unrecognized* failures —
 * i.e. code bugs escaping user code. Recognized provider/config failures
 * deliberately ship a curated summary without the dump, so this returns
 * `undefined` for them and the headline stands alone.
 */
export declare function formatFailureDetail(event: FailureStreamEvent): string | undefined;
/**
 * The surface-local hint for a failure, when the TUI can offer a better
 * fix than the catalog's (currently: gateway credential failures resolve
 * in-session via `/model`). Returns `undefined` to keep the harness hint.
 */
export declare function localFailureHint(event: FailureStreamEvent): string | undefined;
