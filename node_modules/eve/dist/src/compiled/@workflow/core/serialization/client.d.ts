/**
 * Client (external) mode serialization.
 *
 * Used when starting workflows from the client side (serializing workflow
 * arguments) and when receiving workflow return values. Supports encryption.
 */
import type { CodecOptions } from './codec.js';
import { type PayloadKey } from './encryption.js';
/**
 * Serialize a value from the client environment (e.g. workflow arguments).
 */
export declare function serialize(value: unknown, encryptionKey?: PayloadKey, options?: CodecOptions): Promise<Uint8Array | unknown>;
/**
 * Deserialize a value for the client environment (e.g. workflow return value).
 */
export declare function deserialize(data: Uint8Array | unknown, encryptionKey?: PayloadKey, options?: CodecOptions): Promise<unknown>;
//# sourceMappingURL=client.d.ts.map