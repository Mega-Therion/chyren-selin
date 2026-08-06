import type { ModelMessage } from "ai";
import type { HarnessSession, SessionStateMap } from "#harness/types.js";
import type { WorkflowSandboxInterrupt } from "#shared/workflow-sandbox.js";
export interface PendingWorkflowInterrupt {
    readonly interrupt: WorkflowSandboxInterrupt;
    readonly responseMessages: readonly ModelMessage[];
}
export declare function getPendingWorkflowInterrupt(state: SessionStateMap | undefined): PendingWorkflowInterrupt | undefined;
export declare function setPendingWorkflowInterrupt(input: {
    readonly interrupt: WorkflowSandboxInterrupt;
    readonly responseMessages: readonly ModelMessage[];
    readonly session: HarnessSession;
}): HarnessSession;
export declare function clearPendingWorkflowInterrupt(session: HarnessSession): HarnessSession;
