import { z } from "#compiled/zod/index.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Shared input schema used by the framework `bash` tool and any author tool
 * constructed via {@link defineBashTool}.
 *
 * Exported so the public `defineBashTool` factory and the framework
 * `BASH_TOOL_DEFINITION` use the exact same schema object — keeping model
 * input contracts in sync without duplication.
 */
export declare const BASH_INPUT_SCHEMA: z.ZodObject<{
    command: z.ZodString;
}, z.core.$strict>;
/**
 * Shared output schema used by the framework `bash` tool and any author tool
 * constructed via {@link defineBashTool}.
 */
export declare const BASH_OUTPUT_SCHEMA: z.ZodObject<{
    exitCode: z.ZodNumber;
    stderr: z.ZodString;
    stdout: z.ZodString;
    truncated: z.ZodBoolean;
}, z.core.$strict>;
export declare const BASH_TOOL_DEFINITION: ResolvedToolDefinition;
