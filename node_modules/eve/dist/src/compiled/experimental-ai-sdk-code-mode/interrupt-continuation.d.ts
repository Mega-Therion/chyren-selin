import type { ModelMessage } from "ai";
import type { CodeModeContinuationSecurityOptions, CodeModeInterrupt, CodeModeInterruptPayload, CodeModeOptions, CodeModeToolExecutionOptions, CodeModeToolSet, CodeModeUnwrappedResult } from "./types.js";
/**
 * Returns true when a value is a generic code-mode host interruption.
 */
export declare function isCodeModeInterrupt(value: unknown, continuationSecurity?: CodeModeContinuationSecurityOptions): value is CodeModeInterrupt;
/**
 * Continues a code-mode invocation that previously returned a generic
 * interruption.
 */
export declare function continueCodeModeInterrupt<TPayload extends CodeModeInterruptPayload = CodeModeInterruptPayload, TResolution = unknown>({ interrupt, resolution, tools, options, toolExecutionOptions, }: {
    interrupt: CodeModeInterrupt<TPayload>;
    resolution: TResolution;
    tools: CodeModeToolSet;
    options?: CodeModeOptions;
    toolExecutionOptions?: Partial<CodeModeToolExecutionOptions>;
}): Promise<unknown>;
/**
 * Finds a code-mode interruption in a result-like object.
 */
export declare function getCodeModeInterrupt(result: unknown, continuationSecurity?: CodeModeContinuationSecurityOptions): CodeModeInterrupt | undefined;
/**
 * Normalizes a direct or AI SDK result-like value into completed/interrupted
 * status.
 */
export declare function unwrapCodeModeResult(result: unknown, continuationSecurity?: CodeModeContinuationSecurityOptions): CodeModeUnwrappedResult;
/**
 * Replaces a stored outer `code_mode` interruption result in model history with
 * the final continuation output.
 */
export declare function replaceCodeModeInterruptResult(messages: ModelMessage[], interrupt: CodeModeInterrupt, finalOutput: unknown, continuationSecurity?: CodeModeContinuationSecurityOptions): ModelMessage[];
//# sourceMappingURL=interrupt-continuation.d.ts.map