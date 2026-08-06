/**
 * Token-usage accumulator for `$eve.*` observability tags and session limits.
 * Lives on `session.state` so the totals survive workflow step boundaries the
 * way the rest of the harness state does.
 *
 * The harness runs each turn as a sequence of `"use step"` invocations
 * (one per tool-loop iteration). Each step knows its own
 * `result.usage`, but the dashboard cares about totals **per turn**.
 * The workflow runtime's attribute store is "last write wins" per key,
 * so the simplest cumulative pattern is: read the previous total from
 * `session.state`, add the new step's usage, write the running total
 * back. The most recent emit then carries the final per-turn total.
 *
 * `turnId` keys the turn totals so a fresh turn starts at zero without relying
 * on a separate "reset" code path. Session totals stay in the same state record
 * and keep accumulating until the durable session ends.
 *
 * `TokenUsageTotals` carries `costUsd`/`sawCost` alongside the token counts
 * for the `$eve.*` dashboard tags and session limits — fields the
 * cross-cutting {@link TokenUsage} contract (subagent results, callback
 * bodies, usage spans) does not carry. {@link toUsage} projects a total down
 * to that shared shape at the one site (the driver's `done` action) where a
 * session total crosses into it.
 */
import type { HarnessSession, SessionStateMap } from "#harness/types.js";
import { type SessionRuntimeTokenLimits, type SessionTokenLimitViolation } from "#harness/session-token-limits.js";
import type { TokenUsage } from "#shared/token-usage.js";
export type { SessionRuntimeTokenLimits, SessionTokenLimitViolation };
export interface TokenUsageTotals {
    readonly cacheReadTokens: number;
    readonly cacheWriteTokens: number;
    readonly costUsd: number;
    readonly inputTokens: number;
    readonly outputTokens: number;
    readonly sawCost: boolean;
}
export type TokenUsageDelta = Partial<TokenUsageTotals>;
/**
 * Rolling token usage for the durable session and the in-flight turn.
 *
 * `turnId` is the in-flight turn's stable id; when the harness step
 * runs in a different turn, the flat turn totals reset. The nested
 * `session` totals do not reset.
 */
export interface TurnUsageState extends TokenUsageTotals {
    readonly session: TokenUsageTotals;
    readonly turnId: string;
}
/** Reads the stored per-turn token state, or `undefined` when absent. */
export declare function getTurnUsageState(state: SessionStateMap | undefined): TurnUsageState | undefined;
export declare function getSessionTokenUsage(session: Pick<HarnessSession, "state">): TokenUsageTotals;
/** Projects a {@link TokenUsageTotals} down to the cross-cutting {@link TokenUsage} shape. */
export declare function toUsage(totals: TokenUsageTotals): TokenUsage;
/**
 * The lifetime-usage ceilings currently in force, per axis. An axis is
 * absent when the configured limit leaves it uncapped. Before any granted
 * continuation the runtime limit equals the configured limit; each grant
 * re-anchors it to `usage + configured limit` via
 * {@link bumpSessionRuntimeTokenLimits}.
 */
export declare function getSessionRuntimeTokenLimits(session: Pick<HarnessSession, "limits" | "state">): SessionRuntimeTokenLimits;
/**
 * Bumps the runtime token limits after the user grants a continuation:
 * each capped axis is re-anchored to `current usage + configured limit`, so
 * one approval always buys one full configured window from the moment of
 * the grant (even when the last model call overshot by more than a window).
 * Both axes bump together so a session near two limits gets one prompt, not
 * two back-to-back. The configured limits never change.
 */
export declare function bumpSessionRuntimeTokenLimits(session: HarnessSession): HarnessSession;
/**
 * Remaining lifetime-token quota under the runtime limits, per axis.
 * `false` marks an uncapped axis. This is the pool a delegated child's
 * budget is granted from.
 */
export declare function getSessionRemainingTokenQuota(session: Pick<HarnessSession, "limits" | "state">): {
    inputTokens: number | false;
    outputTokens: number | false;
};
export declare function getSessionTokenLimitViolation(session: Pick<HarnessSession, "limits" | "state">): SessionTokenLimitViolation | null;
/**
 * Takes the session-usage delta accumulated since the previous take and
 * marks it reported.
 *
 * Persisted on `session.state` (not in step-local memory) so the entry
 * snapshot survives `"use step"` boundaries: the totals at the previous
 * settled turn are the totals at this turn's entry, because a parked child
 * runs no model calls in between. Blocked parks (authorization, queued
 * input) between two settlements never lose usage — the delta always
 * measures everything since the last report, so the deltas of a
 * multi-turn persistent child sum exactly to its session totals.
 */
export declare function takeSessionUsageDelta(session: HarnessSession): {
    readonly delta: TokenUsage;
    readonly session: HarnessSession;
};
/** Writes per-turn token state onto a new copy of the session. */
export declare function setTurnUsageState(session: HarnessSession, next: TurnUsageState): HarnessSession;
/**
 * Folds one step's `usage` into the running per-turn totals. When
 * `turnId` differs from the stored state (e.g. a new turn just
 * started), the previous totals are discarded — fresh turns start at
 * zero without an explicit reset path.
 */
export declare function accumulateTurnUsage(input: {
    readonly previous: TurnUsageState | undefined;
    readonly turnId: string;
    readonly usage: TokenUsageDelta | undefined;
}): TurnUsageState;
/**
 * Folds a delegated child session's reported totals into the parent's
 * session totals without touching the in-flight turn totals. Turn tags
 * attribute only the parent's own model calls (child spend is attributed by
 * the caller-side `invoke_agent` span); session totals feed the session
 * token limits and the remaining-quota budget granted to later delegations.
 */
export declare function accumulateSessionUsage(input: {
    readonly previous: TurnUsageState | undefined;
    readonly usage: TokenUsageDelta;
}): TurnUsageState;
