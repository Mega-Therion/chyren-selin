import type { RuntimeActionResult } from "#runtime/actions/types.js";
import type { McpClientConnectionDefinition } from "#public/definitions/connections/mcp.js";
import type { ToolDefinition } from "#public/definitions/tool.js";
/**
 * Narrowed tool result returned by {@link toolResultFrom} when the
 * action result matches an authored {@link ToolDefinition}.
 *
 * `TOutput` is inferred from the tool definition's `execute` return type.
 */
export interface MatchedToolResult<TOutput> {
    readonly callId: string;
    readonly output: TOutput;
    readonly toolName: string;
}
/**
 * Narrowed tool result returned by {@link toolResultFrom} when the
 * action result matches an MCP connection.
 *
 * `output` stays `unknown` because MCP tool schemas are remote.
 * `connectionToolName` is the unqualified MCP tool name (e.g.
 * `"list_issues"`) while `toolName` is the full qualified name
 * (e.g. `"linear__list_issues"`).
 */
export interface MatchedConnectionResult {
    readonly callId: string;
    readonly connectionToolName: string;
    readonly output: unknown;
    readonly toolName: string;
}
/**
 * Discriminated source entry stamped on authored definitions during
 * agent resolution via {@link stampDefinitionSource}.
 */
type DefinitionSourceEntry = {
    readonly kind: "connection";
    readonly logicalPath?: string;
    readonly name: string;
} | {
    readonly kind: "tool";
    readonly logicalPath?: string;
    readonly name: string;
};
/**
 * Stamps a stable key on the definition so it can be identified across
 * module instances. Definition helpers first stamp an authoring-time
 * fallback key; the resolver overwrites it with a source-derived key.
 */
export declare function stampDefinitionKey(definition: object, key: string): void;
/**
 * Registers a definition key → source entry mapping in the global
 * registry. Called by the resolution pipeline after loading the
 * authored module.
 */
export declare function registerDefinitionSource(key: string, entry: DefinitionSourceEntry): void;
/**
 * Overloaded signature for {@link toolResultFrom}.
 */
export interface ToolResultFromFn {
    <TInput, TOutput>(result: RuntimeActionResult, tool: ToolDefinition<TInput, TOutput>): MatchedToolResult<TOutput> | undefined;
    (result: RuntimeActionResult, connection: McpClientConnectionDefinition): MatchedConnectionResult | undefined;
}
/**
 * Narrows a {@link RuntimeActionResult} to a typed tool or connection
 * result by matching against an authored definition object.
 *
 * Pass a `ToolDefinition` to get a typed `output`; pass a
 * `McpClientConnectionDefinition` to match any tool from that
 * connection (`output` stays `unknown`).
 *
 * Returns `undefined` when the result doesn't match, or when
 * `isError` is `true`.
 */
export declare const toolResultFrom: ToolResultFromFn;
export {};
