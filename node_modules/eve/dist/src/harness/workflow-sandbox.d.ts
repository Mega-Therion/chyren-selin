import type { ToolSet } from "ai";
import type { HarnessToolMap } from "#harness/types.js";
import { type WorkflowSandboxContinuationSecurity, type WorkflowSandboxLifecycle } from "#shared/workflow-sandbox.js";
interface WorkflowToolSet {
    readonly hostTools: ToolSet;
    readonly modelTools: ToolSet;
}
/**
 * Adds the dynamic `Workflow` tool while leaving every ordinary model tool
 * untouched. Only subagent and remote-agent runtime actions enter the sandbox.
 */
export declare function applyWorkflowTool(input: {
    readonly continuationSecurity: WorkflowSandboxContinuationSecurity;
    readonly harnessTools: HarnessToolMap;
    readonly lifecycle?: WorkflowSandboxLifecycle;
    readonly maxSubagents?: number;
    readonly tools: ToolSet;
}): Promise<WorkflowToolSet>;
/**
 * Keeps code mode's bridge capacity strictly above eve's dispatch budget.
 * The extra request lets the first over-budget call resolve through eve's
 * `WORKFLOW_SUBAGENT_LIMIT_REACHED` result instead of failing the sandbox.
 */
export declare function resolveWorkflowSandboxBridgeRequestLimit(maxSubagents?: number): number;
/** Rebuilds the subagent-only host surface used to resume a parked workflow. */
export declare function buildWorkflowHostTools(input: {
    readonly tools: HarnessToolMap;
}): ToolSet;
export {};
