import { generateText, type ModelMessage, streamText } from "ai";
import type { CodeModeApprovalInterrupt, CodeModeApprovalResponse, CodeModeContinuationSecurityOptions, CodeModeOptions, CodeModeToolExecutionOptions, CodeModeToolSet } from "./types.js";
/**
 * Returns true when a value is a code-mode approval interruption.
 *
 * An approval interruption is a `CodeModeInterrupt` whose payload kind is the
 * reserved approval kind, so this also implies `isCodeModeInterrupt`.
 */
export declare function isCodeModeApprovalInterrupt(value: unknown, continuationSecurity?: CodeModeContinuationSecurityOptions): value is CodeModeApprovalInterrupt;
/**
 * Continues a code-mode invocation that previously returned an approval
 * interruption.
 *
 * This is a thin adapter over `continueCodeModeInterrupt`: it validates the AI
 * SDK approval response, maps it to a boolean approval resolution, and forces
 * interrupt-mode approval so any further nested approvals interrupt as well.
 */
export declare function continueCodeModeApproval({ interrupt, approvalResponse, tools, options, toolExecutionOptions, }: {
    interrupt: CodeModeApprovalInterrupt;
    approvalResponse: CodeModeApprovalResponse;
    tools: CodeModeToolSet;
    options?: CodeModeOptions;
    toolExecutionOptions?: Partial<CodeModeToolExecutionOptions>;
}): Promise<unknown>;
/**
 * Builds AI SDK model messages that expose a code-mode nested approval as an
 * approval request for the original inner tool name and input.
 *
 * The interruption id is used as the AI SDK approval id.
 */
export declare function toCodeModeApprovalMessages(interrupt: CodeModeApprovalInterrupt): ModelMessage[];
/**
 * Finds the AI SDK approval response for a stored code-mode approval
 * interruption in a model message list.
 */
export declare function getCodeModeApprovalResponse(messages: ModelMessage[], interrupt: CodeModeApprovalInterrupt): CodeModeApprovalResponse | undefined;
/**
 * Finds a code-mode approval interruption in an AI SDK result-like object.
 */
export declare function getCodeModeApprovalInterrupt(result: unknown, continuationSecurity?: CodeModeContinuationSecurityOptions): CodeModeApprovalInterrupt | undefined;
/**
 * Runs `generateText` and annotates the returned result with any code-mode
 * approval interruption and AI SDK approval messages.
 */
export declare function generateTextWithCodeModeApprovals(options: Parameters<typeof generateText>[0], continuationSecurity?: CodeModeContinuationSecurityOptions): Promise<Awaited<ReturnType<typeof generateText>> & {
    codeModeApproval: CodeModeApprovalInterrupt | undefined;
    codeModeApprovalMessages: ModelMessage[];
}>;
/**
 * Runs `streamText` and adds a `codeModeApproval` promise that resolves to any
 * approval interruption found in the final tool results.
 */
export declare function streamTextWithCodeModeApprovals(options: Parameters<typeof streamText>[0], continuationSecurity?: CodeModeContinuationSecurityOptions): ReturnType<typeof streamText> & {
    codeModeApproval: Promise<CodeModeApprovalInterrupt | undefined>;
};
/**
 * Wraps a ToolLoopAgent-like object so `generate`/`stream` results expose
 * code-mode approval interruption metadata.
 */
export declare function wrapToolLoopAgentForCodeModeApprovals<T extends {
    generate?: (...args: any[]) => Promise<unknown>;
    stream?: (...args: any[]) => Promise<unknown>;
}>(agent: T, continuationSecurity?: CodeModeContinuationSecurityOptions): T;
/**
 * Adds approval interruption metadata to a result-like object.
 */
export declare function attachCodeModeApprovalResult<T>(result: T, continuationSecurity?: CodeModeContinuationSecurityOptions): T & {
    codeModeApproval: CodeModeApprovalInterrupt | undefined;
    codeModeApprovalMessages: ModelMessage[];
};
//# sourceMappingURL=approval-continuation.d.ts.map