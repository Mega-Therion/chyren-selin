import type { ToolDefinition } from "#public/definitions/tool.js";
/**
 * Input shape accepted by {@link defineGrepTool}.
 */
export interface DefineGrepToolInput {
    /**
     * Optional model-facing description. Defaults to a generic
     * "Search file contents by pattern in the workspace sandbox." line.
     */
    readonly description?: string;
}
/**
 * Defines a model-visible content-search tool that searches file
 * contents by pattern inside the agent's sandbox. Uses the same
 * executor core as the framework `grep` tool, so input schema, error
 * messages, and result shape are identical.
 *
 * The tool's runtime name comes from the authored file's slug (for
 * example `agent/tools/search_code.ts` becomes a tool named
 * `search_code`).
 */
export declare function defineGrepTool(input?: DefineGrepToolInput): ToolDefinition;
