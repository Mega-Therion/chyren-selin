/**
 * Format prefix system for serialized payloads.
 *
 * All serialized payloads are prefixed with a 4-byte format identifier that
 * allows the deserializer to determine how to decode the payload. This enables:
 *
 * 1. Self-describing payloads — the World layer is agnostic to serialization format
 * 2. Gradual migration — old runs keep working, new runs can use new formats
 * 3. Composability — encryption can wrap any format ("encr" wrapping "devl")
 * 4. Debugging — raw data inspection immediately reveals the format
 *
 * Format: [4 bytes: format identifier][payload]
 *
 * The format prefix is open-ended — any 4-character [a-z0-9] string is valid.
 * This allows new codecs to be added without modifying this module.
 */
import { type FormatPrefix } from './types.js';
/**
 * Encode a payload with a format prefix.
 *
 * @param format - The format identifier (4 chars, [a-z0-9])
 * @param payload - The serialized payload bytes
 * @returns A new Uint8Array with format prefix prepended
 */
export declare function encodeWithFormatPrefix(format: FormatPrefix, payload: Uint8Array | unknown): Uint8Array | unknown;
/**
 * Peek at the format prefix without consuming it.
 *
 * Returns the prefix if it's a valid format prefix ([a-z0-9]{4}),
 * or null if the data is legacy/non-binary or doesn't start with a
 * valid prefix.
 *
 * @param data - The format-prefixed data
 * @returns The format prefix, or null
 */
export declare function peekFormatPrefix(data: Uint8Array | unknown): FormatPrefix | null;
/**
 * Check if data is encrypted (has 'encr' format prefix).
 */
export declare function isEncrypted(data: Uint8Array | unknown): boolean;
/**
 * Decode a format-prefixed payload.
 *
 * Unlike the legacy implementation which only accepted known formats
 * (`devl`, `encr`), this function accepts any valid format prefix
 * (`[a-z0-9]{4}`). This is intentional for forward compatibility —
 * new codecs (e.g. `cbor`) can be added without modifying this module.
 * Callers are responsible for checking whether they support the returned
 * format and throwing an appropriate error if not (e.g. "Unsupported
 * serialization format").
 *
 * @param data - The format-prefixed data
 * @returns An object with the format prefix and payload
 * @throws Error if the data is too short or has an invalid prefix
 */
export declare function decodeFormatPrefix(data: Uint8Array | unknown): {
    format: FormatPrefix;
    payload: Uint8Array;
};
//# sourceMappingURL=format.d.ts.map