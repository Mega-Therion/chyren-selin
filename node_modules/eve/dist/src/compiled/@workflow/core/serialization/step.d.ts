/**
 * Step mode serialization.
 *
 * Used by the step executor for serializing step return values and
 * deserializing step arguments. Supports encryption as a composable layer.
 */
import type { CodecOptions } from './codec.js';
import { type PayloadKey } from './encryption.js';
/**
 * Serialize a value from the step execution environment.
 */
export declare function serialize(value: unknown, encryptionKey?: PayloadKey, options?: CodecOptions): Promise<Uint8Array | unknown>;
/**
 * Deserialize a value for the step execution environment.
 */
export declare function deserialize(data: Uint8Array | unknown, encryptionKey?: PayloadKey, options?: CodecOptions): Promise<unknown>;
//# sourceMappingURL=step.d.ts.map