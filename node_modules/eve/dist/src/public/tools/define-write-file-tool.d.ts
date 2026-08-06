import type { ToolDefinition } from "#public/definitions/tool.js";
/**
 * Input shape accepted by {@link defineWriteFileTool}.
 */
export interface DefineWriteFileToolInput {
    /**
     * Optional model-facing description. Defaults to a generic
     * "Write a file to the workspace sandbox." line.
     */
    readonly description?: string;
}
/**
 * Defines a model-visible file-writer tool that writes files to the
 * agent's sandbox. Uses the same executor core as the framework
 * `write_file` tool, so input schema, error messages, and result shape
 * are identical.
 *
 * The tool's runtime name comes from the authored file's slug (for
 * example `agent/tools/write_file.ts` becomes a tool named
 * `write_file`).
 */
export declare function defineWriteFileTool(input?: DefineWriteFileToolInput): ToolDefinition;
