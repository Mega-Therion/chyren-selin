/**
 * Shared error formatting utility for serialization failures.
 *
 * Used by the mode-specific serializers (workflow, step, client) to
 * produce consistent error messages with devalue path information.
 *
 * Returns a `{ message, hint }` pair so callers can throw a
 * `SerializationError(message, { hint, cause })` and have the hint flow
 * through the standard friendly-errors framing instead of being baked
 * into the message string.
 */
/**
 * Rethrow SDK runtime errors that must not be reframed as
 * `SerializationError`.
 *
 * The serialize/dehydrate wrappers catch every throw and reframe it as a
 * `SerializationError` (which classifies as `USER_ERROR`). That's correct
 * for genuine serialization failures, but a `RuntimeDecryptionError` from
 * the AES-GCM layer is an SDK-internal failure that must keep its identity
 * so the run-failure classifier routes it to `RUNTIME_ERROR`. Call this at
 * the top of each serialize catch block to let those errors propagate
 * unchanged.
 */
export declare function rethrowIfRuntimeError(error: unknown): void;
/**
 * Format a serialization error with context about what failed.
 * Extracts path, value, and reason from devalue's DevalueError when available.
 * Logs the problematic value to the console for better debugging.
 */
export declare function formatSerializationError(context: string, error: unknown): {
    message: string;
    hint: string;
};
//# sourceMappingURL=errors.d.ts.map