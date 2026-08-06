/**
 * Serializes and rebuilds workflow errors across hook and step
 * boundaries.
 */
/**
 * Reduces an arbitrary throwable to a shape that survives the
 * serialization the workflow devkit performs on step inputs.
 */
export declare function normalizeSerializableError(error: unknown): unknown;
/**
 * Rebuilds an {@link Error} from the normalized hook payload sent by a
 * child workflow.
 */
export declare function rebuildSerializableError(error: unknown): Error;
