/**
 * Owns one turn's cancellation surface inside the turn workflow: the
 * turn-private cancel hook and the durable `AbortController` whose
 * signal is serialized into every `turnStep`. Must be created inside a
 * `"use workflow"` body.
 */
export interface TurnCancellationControl {
    /** Turn signal to serialize into each `turnStep` input. */
    readonly signal: AbortSignal;
    /**
     * Resolves `"cancel"` once a matching cancel payload is consumed and
     * the signal aborted. Race it against turn-owned awaits — never
     * `await` it alone.
     */
    readonly requested: Promise<"cancel">;
    /** Disposes the hook, abandoning any outstanding read. Idempotent. */
    dispose(): Promise<void>;
}
/**
 * Creates and claims the private cancel hook for one turn workflow run.
 * Returns `undefined` when the token is still claimed by a crashed prior
 * run — the turn then runs uncancellable rather than failing.
 */
export declare function createTurnCancellationControl(input: {
    readonly controlToken: string;
    readonly expectedTurnId: string;
}): Promise<TurnCancellationControl | undefined>;
