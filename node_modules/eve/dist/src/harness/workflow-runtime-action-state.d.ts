import type { RuntimeActionRequest } from "#runtime/actions/types.js";
import type { WorkflowSandboxInterrupt } from "#shared/workflow-sandbox.js";
export declare const WORKFLOW_RUNTIME_ACTION_INTERRUPT_KIND = "eve.workflow-runtime-action";
export declare function isWorkflowRuntimeActionInterrupt(interrupt: unknown): boolean;
export declare function buildRuntimeActionFromWorkflowInterrupt(interrupt: WorkflowSandboxInterrupt): RuntimeActionRequest;
/** Returns every pending runtime-action interrupt in deterministic ledger order. */
export declare function getWorkflowRuntimeActionInterrupts(interrupt: WorkflowSandboxInterrupt): WorkflowSandboxInterrupt[];
export declare function buildRuntimeActionsFromWorkflowInterrupt(interrupt: WorkflowSandboxInterrupt): RuntimeActionRequest[];
export declare function getRuntimeActionKeysFromWorkflowInterrupt(interrupt: WorkflowSandboxInterrupt): string[];
