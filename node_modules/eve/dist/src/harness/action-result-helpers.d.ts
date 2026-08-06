import type { ModelMessage, ToolSet, TypedToolError, TypedToolResult } from "ai";
import type { RuntimeToolResultActionResult } from "#runtime/actions/types.js";
type ToolResponsePart = Extract<ModelMessage, {
    role: "tool";
}>["content"][number];
type ToolResultPart = Extract<ToolResponsePart, {
    type: "tool-result";
}>;
/**
 * Builds a `RuntimeToolResultActionResult` from a raw tool output value.
 *
 * This is the single coercion point for `action.result` projection. Both
 * native tool execution (via {@link createRuntimeToolResultFromStepResult} /
 * {@link createRuntimeToolResultFromMessagePart}) and Workflow child calls
 * funnel through here, so the raw-output-vs-`toModelOutput` decision —
 * always raw — is decided once. The output is validated as JSON here so bad
 * values never reach protocol events or persisted history.
 */
export declare function createRuntimeToolResultFromValue(input: {
    readonly callId: string;
    readonly toolName: string;
    readonly output: unknown;
    readonly isError?: boolean;
}): RuntimeToolResultActionResult;
/**
 * Builds a `RuntimeToolResultActionResult` from one AI SDK
 * {@link TypedToolResult}. Used for tool results captured on the AI SDK
 * step result and for `tool-result` parts that arrive on the stream.
 */
export declare function createRuntimeToolResultFromStepResult(toolResult: TypedToolResult<ToolSet>): RuntimeToolResultActionResult;
/**
 * Builds a failed `RuntimeToolResultActionResult` from one AI SDK
 * `tool-error` part.
 */
export declare function createRuntimeToolResultFromToolError(toolError: TypedToolError<ToolSet>): RuntimeToolResultActionResult;
/**
 * Builds the inline tool-result message part that repairs model history after a
 * local tool execution error.
 */
export declare function createToolResultMessagePartFromToolError(toolError: TypedToolError<ToolSet>): ToolResultPart;
/**
 * Builds a `RuntimeToolResultActionResult` from one tool-result message
 * part as it appears on `step.response.messages`. Used as a fallback when
 * the result is missing from `step.toolResults` (some providers — notably
 * after `tool-output-denied` chunks — surface the result only on the
 * response messages array).
 */
export declare function createRuntimeToolResultFromMessagePart(part: ToolResultPart): RuntimeToolResultActionResult;
export {};
