import type { ToolSet, TypedToolResult } from "ai";
/** Returns whether an inline tool result represents a pending authorization interrupt. */
export declare function isInlineAuthorizationToolResult(toolResult: TypedToolResult<ToolSet>): boolean;
