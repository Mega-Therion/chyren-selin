import { z } from "#compiled/zod/index.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Stable model-visible name for the framework question tool.
 */
export declare const ASK_QUESTION_TOOL_NAME = "ask_question";
export declare const ASK_QUESTION_INPUT_SCHEMA: z.ZodObject<{
    allowFreeform: z.ZodOptional<z.ZodBoolean>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        id: z.ZodString;
        label: z.ZodString;
        style: z.ZodOptional<z.ZodEnum<{
            danger: "danger";
            default: "default";
            primary: "primary";
        }>>;
    }, z.core.$strict>>>;
    prompt: z.ZodString;
}, z.core.$strict>;
export declare const ASK_QUESTION_OUTPUT_SCHEMA: z.ZodObject<{
    optionId: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        answered: "answered";
        ignored: "ignored";
    }>;
    text: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Root-only framework tool that lets the agent request structured user input.
 *
 * This is a client-side tool (as indicated by it not having an `execute` method). It requires user input
 * and therefore cannot be autonomously executed by the runtime.
 */
export declare const ASK_QUESTION_TOOL_DEFINITION: ResolvedToolDefinition;
