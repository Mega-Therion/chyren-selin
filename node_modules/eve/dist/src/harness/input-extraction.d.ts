import type { ContentPart, ModelMessage, ToolSet, TypedToolCall } from "ai";
import type { InputRequest } from "#runtime/input/types.js";
/**
 * Extracts question input requests from tool calls that target the
 * `ask_question` framework tool.
 */
export declare function extractQuestionInputRequests(input: {
    readonly excludedCallIds: ReadonlySet<string>;
    readonly toolCalls: readonly TypedToolCall<ToolSet>[];
}): InputRequest[];
/**
 * Extracts tool approval input requests from AI SDK content parts that
 * contain `tool-approval-request` entries.
 */
export declare function extractToolApprovalInputRequests(input: {
    readonly content: readonly ContentPart<ToolSet>[];
    readonly excludedCallIds?: ReadonlySet<string>;
}): InputRequest[];
/**
 * Recovers request metadata for submitted input response IDs from model
 * history. The newest occurrence wins so compacted or repeated history does
 * not replace the request that is closest to the current turn.
 */
export declare function extractHistoricalInputRequests(input: {
    readonly history: readonly ModelMessage[];
    readonly requestIds: ReadonlySet<string>;
}): ReadonlyMap<string, InputRequest>;
