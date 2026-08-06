import type { HarnessSession, SessionStateMap } from "#harness/types.js";
/**
 * Tracks emission lifecycle state across harness step invocations.
 *
 * Persisted on `session.state` so the state survives when the durable
 * workflow runtime recreates the harness at each `"use step"` boundary.
 */
export interface HarnessEmissionState {
    readonly sessionStarted: boolean;
    readonly sequence: number;
    readonly stepIndex: number;
    readonly turnId: string;
}
/** Reads the emission state, returning defaults when absent. */
export declare function getHarnessEmissionState(state: SessionStateMap | undefined): HarnessEmissionState;
/**
 * Returns `true` when the harness is between turns — either no turn has
 * started yet or the previous turn has emitted its epilogue and reset.
 *
 * The empty `turnId` sentinel distinguishes a fresh delivery from an in-flight
 * continuation. Callers should use this predicate instead of reading it.
 */
export declare function isHarnessBetweenTurns(session: HarnessSession): boolean;
/** Writes the emission state onto a new copy of the session. */
export declare function setHarnessEmissionState(session: HarnessSession, state: HarnessEmissionState): HarnessSession;
