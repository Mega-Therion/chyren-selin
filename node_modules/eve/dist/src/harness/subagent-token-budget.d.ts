import type { RunSessionLimits } from "#channel/types.js";
import type { HarnessSession } from "#harness/types.js";
/**
 * Computes the session token limits a delegated child inherits from its
 * parent: the parent's remaining runtime-limit quota split evenly across the
 * batch's delegated calls, per axis, at dispatch time. `false` marks an axis
 * with no inherited cap.
 *
 * Splitting by `fanoutSize` makes one dispatch batch collectively
 * bounded by the parent's remainder. N parallel children cannot each spend
 * the full remainder. Sequential batches see the quota net of completed
 * children because their usage folds back into the parent's session totals.
 * A granted continuation bumps the parent's runtime limit, so children
 * dispatched after a grant draw from the fresh window.
 */
export declare function resolveRemainingSessionTokenLimits(session: Pick<HarnessSession, "limits" | "state">, fanoutSize?: number): RunSessionLimits;
