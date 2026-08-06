import { z } from "#compiled/zod/index.js";
import { type JsonObject, type JsonValue } from "#shared/json.js";
/**
 * Zod schema for JSON-serializable values.
 */
export declare const jsonValueSchema: z.ZodType<JsonValue>;
/**
 * Zod schema for JSON-serializable object values.
 */
export declare const jsonObjectSchema: z.ZodType<JsonObject>;
