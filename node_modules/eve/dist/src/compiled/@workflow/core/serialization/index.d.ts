/**
 * Serialization module — public API.
 *
 * Re-exports the mode-specific serialize/deserialize functions and
 * the codec/format/encryption abstractions.
 */
export type { Codec, CodecOptions, SerializationMode } from './codec.js';
export { devalueCodec } from './codec-devalue.js';
export { COMPRESSION_MIN_BYTES, type CompressionCodec, type CompressionStats, compress, decompress, isCompressed, } from './compression.js';
export { type CryptoKey, decrypt, type EncryptionKeyParam, encrypt, } from './encryption.js';
export { decodeFormatPrefix, encodeWithFormatPrefix, isEncrypted, peekFormatPrefix, } from './format.js';
export type { GuestCodeExecution, GuestCodeStats } from './hardened.js';
export type { FormatPrefix, Reducers, Revivers, SerializableSpecial, } from './types.js';
export { isFormatPrefix, SerializationFormat } from './types.js';
import * as client from './client.js';
import * as step from './step.js';
import * as workflow from './workflow.js';
export { workflow, step, client };
export { revive } from './reducers/common.js';
//# sourceMappingURL=index.d.ts.map