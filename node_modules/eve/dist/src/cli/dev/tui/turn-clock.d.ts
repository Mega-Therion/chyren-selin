/**
 * One turn's wall clock and summed token flow. "When did this turn start"
 * is a single fact; this object is its single representation — armed once
 * per turn (a prompt submit, or an `--input` turn arming itself), fed by
 * step usage reports, and consumed exactly once by the end-of-turn coda.
 * Multi-pass turns (question answers, connection authorizations) re-stream
 * without re-arming, so one turn gets one coda.
 */
export declare class TurnClock {
    #private;
    /** Starts the turn: resets the summed flow and stamps the clock. */
    arm(): void;
    get armed(): boolean;
    get startedAtMs(): number | undefined;
    get usage(): {
        readonly inputTokens: number;
        readonly outputTokens: number;
    };
    addUsage(usage: {
        inputTokens?: number;
        outputTokens?: number;
    }): void;
    /**
     * Consumes the armed clock, returning the turn's elapsed time and summed
     * flow — or `undefined` when no turn was armed (the coda's "already
     * settled" signal). The flow survives the settle so a repaint between the
     * coda and the next arm still reads the last turn's numbers.
     */
    settle(): {
        elapsedMs: number;
        inputTokens: number;
        outputTokens: number;
    } | undefined;
    /** Drops the clock without a coda (conversation boundaries). */
    reset(): void;
}
