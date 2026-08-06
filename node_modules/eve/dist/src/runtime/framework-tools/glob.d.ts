import { z } from "#compiled/zod/index.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Shared input schema used by the framework `glob` tool and any author tool
 * constructed via {@link defineGlobTool}.
 *
 * Exported so the public `defineGlobTool` factory and the framework
 * `GLOB_TOOL_DEFINITION` use the exact same schema object — keeping model
 * input contracts in sync without duplication.
 */
export declare const GLOB_INPUT_SCHEMA: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
    path: z.ZodOptional<z.ZodString>;
    pattern: z.ZodString;
}, z.core.$strict>;
/**
 * Shared output schema used by the framework `glob` tool and any author tool
 * constructed via {@link defineGlobTool}.
 */
export declare const GLOB_OUTPUT_SCHEMA: z.ZodObject<{
    content: z.ZodString;
    count: z.ZodNumber;
    path: z.ZodString;
    truncated: z.ZodBoolean;
}, z.core.$strict>;
export declare const GLOB_TOOL_DEFINITION: ResolvedToolDefinition;
