import type { RuntimeActionResult, RuntimeSubagentChildResult } from "#runtime/actions/types.js";
import type { AgentHandle } from "#harness/handles/store.js";
import type { SessionStateMap } from "#harness/types.js";
/** A handle with one outstanding operation and a confirmed child address. */
export type RunningAgentHandle = Extract<AgentHandle, {
    phase: "running";
}>;
/**
 * Finds the running agent handle a child-produced result must settle: the
 * handle whose recorded operation carries the result's callId.
 *
 * Binding is by callId alone. Possession of the parent's callback token is
 * the authorization to settle; the handle's recorded address is used for
 * outbound delivery (continuation, cancellation), never as an inbound
 * identity check. Under the accepted at-least-once dispatch window a
 * replay-orphaned duplicate child holds the same token and callId and may
 * settle the call in place of the owned child — an accepted trade-off,
 * since both children computed the same input.
 */
export declare function findRunningAgentHandle(state: SessionStateMap | undefined, input: {
    readonly callId: string;
}): RunningAgentHandle | undefined;
/**
 * A subagent result may settle a call only when a running handle records
 * its callId: a late or duplicate result for an already-settled call finds
 * no running handle and is dropped.
 *
 * `dispatch`-origin failures pass unconditionally: the parent synthesizes
 * them for calls whose child never started, and they reach the harness only
 * through the trusted step-result path. Untrusted channels must use
 * {@link isInboxSubagentResultFromRunningHandle} instead.
 */
export declare function isResultBoundToRunningHandle(state: SessionStateMap | undefined, result: RuntimeActionResult): boolean;
/**
 * Strict variant of {@link isResultBoundToRunningHandle} for results arriving
 * over the shared turn inbox (child notifications and remote callbacks).
 * An inbox result must bind to a running handle by callId; one with no
 * matching running handle — including one for a callId whose dispatch
 * already failed — must not overwrite the dispatch-produced error result.
 */
export declare function isInboxSubagentResultFromRunningHandle(state: SessionStateMap | undefined, result: RuntimeSubagentChildResult): boolean;
