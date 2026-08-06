/** Derives the private cancellation hook token for one dispatched turn. */
export declare function turnCancellationHookToken(controlToken: string): string;
/**
 * Payload accepted by the private turn cancel hook. A mismatched `turnId` is a
 * benign no-op; omitting it targets whichever turn owns the hook.
 */
export interface TurnCancelPayload {
    readonly turnId?: string;
}
