import type { ToolSet, TypedToolCall, TypedToolError } from "ai";
import type { RuntimeToolCallActionRequest } from "#runtime/actions/types.js";
/**
 * Returns true when the AI SDK marked the tool call `invalid` (typically
 * because the model emitted unparsable JSON or targeted an unknown tool).
 *
 * Invalid calls have a raw-string or partial `input` payload that cannot
 * satisfy the runtime-action contract. The AI SDK synthesizes a tool-error
 * result for the next model step automatically; callers must skip invalid
 * calls when projecting to `RuntimeActionRequest` values or the harness
 * will throw on the JSON-object invariant.
 */
export declare function isInvalidToolCall(toolCall: TypedToolCall<ToolSet>): boolean;
export declare function createInvalidToolCallInputError(input: {
    readonly error: unknown;
    readonly toolCall: TypedToolCall<ToolSet>;
}): TypedToolError<ToolSet>;
/**
 * Resolves a provider-executed tool call into an observable runtime-action
 * request, or the synthesized tool error when the model emitted arguments
 * that cannot satisfy the JSON-object contract.
 *
 * Provider-executed calls skip the AI SDK's input validation, so malformed
 * JSON argument text reaches the harness only here.
 */
export declare function resolveProviderToolCallRequest(toolCall: {
    readonly input?: unknown;
    readonly toolCallId: string;
    readonly toolName: string;
}): {
    readonly request: RuntimeToolCallActionRequest;
    readonly toolError?: undefined;
} | {
    readonly request?: undefined;
    readonly toolError: TypedToolError<ToolSet>;
};
export declare function getInvalidToolCallInputError(input: {
    readonly toolCall: TypedToolCall<ToolSet>;
}): TypedToolError<ToolSet> | undefined;
