import type { RuntimeActionRequest } from "#runtime/actions/types.js";
import type { WorkflowSandboxInterrupt } from "#shared/workflow-sandbox.js";
/**
 * Default maximum number of subagent (and remote-agent) calls one `Workflow`
 * tool invocation may dispatch.
 */
export declare const DEFAULT_WORKFLOW_MAX_SUBAGENTS = 100;
/**
 * Partition of one workflow interrupt's pending runtime actions against the
 * invocation's subagent budget. `allowed` actions may dispatch; `blocked`
 * actions must resolve with an error result instead of starting a child.
 */
export type WorkflowSubagentDispatchPlan = {
    readonly allowed: readonly RuntimeActionRequest[];
    readonly blocked: readonly RuntimeActionRequest[];
    readonly maxSubagents: number;
    readonly usedCalls: number;
};
/**
 * Counts the subagent calls this Workflow invocation has already resolved.
 *
 * Every host tool bridged into the workflow sandbox is a subagent or
 * remote-agent call, so each fulfilled or rejected `tool` ledger entry is one
 * consumed call. Entries still `interrupted` are the pending actions being
 * planned, not consumed budget.
 */
export declare function countResolvedWorkflowSubagentCalls(interrupt: WorkflowSandboxInterrupt): number;
/**
 * Splits the pending actions of one workflow interrupt into the prefix that
 * still fits the invocation's `maxSubagents` budget and the remainder that
 * must be blocked. Actions keep ledger order so results pair with the
 * sandbox program's call order.
 */
export declare function planWorkflowSubagentDispatch(input: {
    readonly actions: readonly RuntimeActionRequest[];
    readonly interrupt: WorkflowSandboxInterrupt;
    readonly maxSubagents?: number;
}): WorkflowSubagentDispatchPlan;
