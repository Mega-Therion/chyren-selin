import type { ToolSet } from "ai";
import type * as CodeModeModule from "#compiled/experimental-ai-sdk-code-mode/index.js";
/** Model-facing tool name for eve's dynamic subagent orchestration tool. */
export declare const WORKFLOW_TOOL_NAME = "Workflow";
type WorkflowSandboxModule = Pick<typeof CodeModeModule, "continueCodeModeInterrupt" | "createCodeModeTool" | "getCodeModeInterrupt" | "requestCodeModeInterrupt" | "unwrapCodeModeResult">;
export type WorkflowSandboxInterrupt = CodeModeModule.CodeModeInterrupt;
export type WorkflowSandboxLifecycle = NonNullable<CodeModeModule.CodeModeOptions["lifecycle"]>;
export type WorkflowSandboxContinuationSecurity = CodeModeModule.CodeModeContinuationSecurityOptions;
export declare function installWorkflowSandboxModule(module: WorkflowSandboxModule): void;
export declare function createWorkflowSandboxTool(input: {
    readonly bridgeRequestLimit: number;
    readonly continuationSecurity: WorkflowSandboxContinuationSecurity;
    readonly hostTools: ToolSet;
    readonly lifecycle?: WorkflowSandboxLifecycle;
}): Promise<ToolSet[string]>;
export declare function requestWorkflowSandboxInterrupt(input: {
    readonly kind: string;
    readonly runtimeAction: unknown;
    readonly toolInput: unknown;
    readonly toolName: string;
}): Promise<unknown>;
export declare function getWorkflowSandboxInterrupt(result: unknown, continuationSecurity: WorkflowSandboxContinuationSecurity): Promise<WorkflowSandboxInterrupt | undefined>;
export declare function continueWorkflowSandboxInterrupt(input: {
    readonly bridgeRequestLimit: number;
    readonly continuationSecurity: WorkflowSandboxContinuationSecurity;
    readonly interrupt: WorkflowSandboxInterrupt;
    readonly lifecycle?: WorkflowSandboxLifecycle;
    readonly resolution: unknown;
    readonly tools: ToolSet;
}): Promise<unknown>;
export declare function unwrapWorkflowSandboxResult(value: unknown, continuationSecurity: WorkflowSandboxContinuationSecurity): Promise<{
    readonly output: unknown;
    readonly status: "completed";
} | {
    readonly interrupt: WorkflowSandboxInterrupt;
    readonly status: "interrupted";
}>;
export declare function readWorkflowSandboxResolution(options: unknown): unknown;
export {};
