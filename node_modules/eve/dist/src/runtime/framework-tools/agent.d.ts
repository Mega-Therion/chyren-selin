import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Stable model-visible name for the root-only agent delegation tool.
 */
export declare const AGENT_TOOL_NAME = "agent";
/**
 * Model-facing instructions for the root-only agent delegation tool.
 */
export declare const AGENT_TOOL_DESCRIPTION: string;
/**
 * Whether one node receives the implicit built-in `agent` tool.
 *
 * Single source of truth for the injection predicate: node-step uses it to
 * decide whether to add the tool, and prompt bootstrap uses it to decide
 * whether agent-messaging instructions may reference the tool. The
 * `hasAuthoredAgentTool` leg matters because an authored tool named "agent"
 * shadows the framework tool — instructions must not advertise a tool the
 * model cannot call.
 */
export declare function isImplicitAgentToolAvailable(input: {
    readonly disabledFrameworkTools: readonly string[];
    readonly hasAuthoredAgentTool: boolean;
    /** Undefined when the caller prepares a turn without a graph node (never root). */
    readonly nodeId: string | undefined;
}): boolean;
/**
 * Shared metadata for the root-only agent delegation tool.
 */
export declare const AGENT_TOOL_DEFINITION: ResolvedToolDefinition;
