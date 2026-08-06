import { z } from "#compiled/zod/index.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Shared input schema used by the framework `grep` tool and any author tool
 * constructed via {@link defineGrepTool}.
 *
 * Exported so the public `defineGrepTool` factory and the framework
 * `GREP_TOOL_DEFINITION` use the exact same schema object — keeping model
 * input contracts in sync without duplication.
 */
export declare const GREP_INPUT_SCHEMA: z.ZodObject<{
    context: z.ZodOptional<z.ZodNumber>;
    glob: z.ZodOptional<z.ZodString>;
    ignoreCase: z.ZodOptional<z.ZodBoolean>;
    limit: z.ZodOptional<z.ZodNumber>;
    literal: z.ZodOptional<z.ZodBoolean>;
    path: z.ZodOptional<z.ZodString>;
    pattern: z.ZodString;
}, z.core.$strict>;
/**
 * Shared output schema used by the framework `grep` tool and any author tool
 * constructed via {@link defineGrepTool}.
 */
export declare const GREP_OUTPUT_SCHEMA: z.ZodObject<{
    content: z.ZodString;
    matchCount: z.ZodNumber;
    path: z.ZodString;
    truncated: z.ZodBoolean;
}, z.core.$strict>;
export declare const GREP_TOOL_DEFINITION: ResolvedToolDefinition;
