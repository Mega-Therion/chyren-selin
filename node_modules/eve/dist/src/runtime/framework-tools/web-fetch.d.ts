import { z } from "#compiled/zod/index.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
export declare const WEB_FETCH_INPUT_SCHEMA: z.ZodObject<{
    format: z.ZodOptional<z.ZodEnum<{
        html: "html";
        markdown: "markdown";
        text: "text";
    }>>;
    timeout: z.ZodOptional<z.ZodNumber>;
    url: z.ZodString;
}, z.core.$strict>;
export declare const WEB_FETCH_OUTPUT_SCHEMA: z.ZodObject<{
    content: z.ZodString;
    contentType: z.ZodString;
    truncated: z.ZodBoolean;
    url: z.ZodString;
}, z.core.$strict>;
export declare const WEB_FETCH_TOOL_DEFINITION: ResolvedToolDefinition;
