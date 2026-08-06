/** Terminal outcome of a cancelled turn. */
export declare class TurnCancelledError extends Error {
    constructor(message?: string);
}
/**
 * A turn cancellation raised when the user declines a session-limit
 * continuation prompt. Carries intent only — the execution layer detects it
 * at the step boundary and cancels the root turn, so a delegated child's
 * decline stops the whole delegation tree. Keeps the harness free of
 * cross-session cancellation authority.
 */
export declare class SessionLimitDeclinedError extends TurnCancelledError {
    readonly sessionLimitDeclined = true;
    constructor();
}
/** True when the error, or one of its causes, marks a session-limit decline. */
export declare function isSessionLimitDecline(error: unknown): boolean;
/** True when the error, or one of its causes, is a {@link TurnCancelledError}. */
export declare function isTurnCancellation(error: unknown): boolean;
/** Throws when the turn signal has aborted. */
export declare function throwIfTurnAborted(abortSignal: AbortSignal | undefined): void;
