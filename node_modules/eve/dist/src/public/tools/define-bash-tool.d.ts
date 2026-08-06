import type { ToolDefinition } from "#public/definitions/tool.js";
/**
 * Input shape accepted by {@link defineBashTool}.
 */
export interface DefineBashToolInput {
    /**
     * Optional model-facing description. Defaults to a generic
     * "Execute a shell command in the workspace sandbox." line.
     */
    readonly description?: string;
}
/**
 * Defines a model-visible shell-runner tool that executes commands
 * inside the agent's sandbox. Uses the same executor core as the
 * framework `bash` tool, so input schema, error messages, and result
 * shape are identical.
 *
 * The tool's runtime name comes from the authored file's slug (for
 * example `agent/tools/run_shell.ts` becomes a tool named `run_shell`).
 */
export declare function defineBashTool(input?: DefineBashToolInput): ToolDefinition;
