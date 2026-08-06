import type { HarnessEmissionState } from "#harness/emission.js";
import type { HarnessToolMap } from "#harness/types.js";
import { type UnstampedMessageStreamEvent } from "#protocol/message.js";
import type { WorkflowSandboxLifecycle } from "#shared/workflow-sandbox.js";
type EmitWorkflowLifecycleEvent = (event: UnstampedMessageStreamEvent) => Promise<void>;
/** Projects sandboxed subagent calls onto eve's existing action event stream. */
export declare function createWorkflowLifecycle(input: {
    readonly emit: EmitWorkflowLifecycleEvent;
    readonly emissionState: HarnessEmissionState;
    readonly skipReplayed?: boolean;
    readonly tools: HarnessToolMap;
}): WorkflowSandboxLifecycle;
export {};
