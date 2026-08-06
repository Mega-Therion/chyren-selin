import { z } from "#compiled/zod/index.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Shared input schema used by the framework `write_file` tool and any author
 * tool constructed via {@link defineWriteFileTool}.
 *
 * Exported so the public `defineWriteFileTool` factory and the framework
 * `WRITE_FILE_TOOL_DEFINITION` use the exact same schema object — keeping
 * model input contracts in sync without duplication.
 */
export declare const WRITE_FILE_INPUT_SCHEMA: z.ZodObject<{
    content: z.ZodString;
    filePath: z.ZodString;
}, z.core.$strict>;
/**
 * Shared output schema used by the framework `write_file` tool and any author
 * tool constructed via {@link defineWriteFileTool}.
 */
export declare const WRITE_FILE_OUTPUT_SCHEMA: z.ZodObject<{
    existed: z.ZodBoolean;
    path: z.ZodString;
}, z.core.$strict>;
export declare const WRITE_FILE_TOOL_DEFINITION: ResolvedToolDefinition;
