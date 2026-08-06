import { z } from "#compiled/zod/index.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Shared input schema used by the framework `read_file` tool and any author
 * tool constructed via {@link defineReadFileTool}.
 *
 * Exported so the public `defineReadFileTool` factory and the framework
 * `READ_FILE_TOOL_DEFINITION` use the exact same schema object — keeping
 * model input contracts in sync without duplication.
 */
export declare const READ_FILE_INPUT_SCHEMA: z.ZodObject<{
    filePath: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
/**
 * Shared output schema used by the framework `read_file` tool and any author
 * tool constructed via {@link defineReadFileTool}.
 */
export declare const READ_FILE_OUTPUT_SCHEMA: z.ZodObject<{
    content: z.ZodString;
    nextOffset: z.ZodOptional<z.ZodNumber>;
    path: z.ZodString;
    totalLines: z.ZodNumber;
    truncated: z.ZodBoolean;
}, z.core.$strict>;
export declare const READ_FILE_TOOL_DEFINITION: ResolvedToolDefinition;
