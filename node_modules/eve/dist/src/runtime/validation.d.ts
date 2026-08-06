import type { ZodError } from "#compiled/zod/index.js";
/**
 * Formats one zod validation error into a concise single-message string.
 */
export declare function formatValidationError(error: ZodError): string;
