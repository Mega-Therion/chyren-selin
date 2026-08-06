import { type AlsContext, ContextContainer } from "#context/container.js";
/**
 * Serializes every value in the context to a plain JSON record.
 *
 * Keys with a codec are run through `codec.serialize`; keys without one
 * are stored as-is (they must already be JSON-safe).
 */
export declare function serializeContext(ctx: AlsContext): Record<string, unknown>;
/**
 * Deserializes a plain JSON record into a fresh context container.
 *
 * Each entry is matched to a registered {@link ContextKey} by name.
 * Unknown entries (no registered key) are dropped with a warning.
 */
export declare function deserializeContext(data: Record<string, unknown>): Promise<ContextContainer>;
