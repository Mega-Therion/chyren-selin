import type { CodeModeInterruptExecutionContext, CodeModeInterruptPayload, CodeModeOptions, CodeModeToolExecutionOptions, CodeModeToolSet } from "./types.js";
export type HostToolInvocationResult = {
    type: "success";
    valueJson: string;
} | {
    type: "interrupted";
    toolName: string;
    input: unknown;
    toolCallId: string;
    payload: CodeModeInterruptPayload;
};
export declare function invokeHostTool({ toolName, inputJson, tools, baseExecutionOptions, codeModeOptions, maxToolInputBytes, maxToolOutputBytes, toolCallId, codeModeInterrupt, skipApproval, }: {
    toolName: string;
    inputJson: string;
    tools: CodeModeToolSet;
    baseExecutionOptions: CodeModeToolExecutionOptions;
    codeModeOptions: CodeModeOptions;
    maxToolInputBytes: number;
    maxToolOutputBytes: number;
    toolCallId: string;
    codeModeInterrupt?: CodeModeInterruptExecutionContext;
    skipApproval?: boolean;
}): Promise<HostToolInvocationResult>;
//# sourceMappingURL=tool-invocation.d.ts.map