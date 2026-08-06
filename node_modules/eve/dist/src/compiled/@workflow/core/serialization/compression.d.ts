/**
 * Composable compression layer for serialized data.
 *
 * Wraps/unwraps serialized payloads with a compression codec, using the
 * format prefix system to mark compressed data (e.g. 'zstd' or 'gzip'
 * wrapping the inner format: 'zstd' + zstd('devl' + payload)).
 *
 * Codec selection (write side): zstd is preferred — it is markedly faster
 * than gzip at a comparable-or-better ratio (see scripts/README.md), and
 * compression runs at every step boundary so the write CPU is a per-step
 * tax. zstd requires `node:zlib` >= 22.15 (Web `CompressionStream` has no
 * zstd), so on a runtime without it we fall back to gzip via the portable
 * `CompressionStream`. `WORKFLOW_COMPRESSION_CODEC=gzip` forces the
 * portable codec.
 *
 * Read side: dispatch on the format prefix, so both 'zstd' and 'gzip'
 * payloads are always decodable regardless of which codec wrote them.
 * (The browser o11y read path decodes zstd via a registered WASM decoder —
 * see `serialization-format.ts`; this module's `decompress` is the Node
 * runtime/replay path and uses `node:zlib`.)
 *
 * Layering order with encryption: compression is applied BEFORE
 * encryption (encr(zstd(devl))) — encrypted bytes are high-entropy and
 * do not compress, so the reverse order would be a no-op.
 *
 * Compression is conditional:
 * - Payloads smaller than {@link COMPRESSION_MIN_BYTES} are passed
 *   through unchanged (codec overhead isn't worth it).
 * - If the compressed result isn't meaningfully smaller than the
 *   original (see {@link COMPRESSION_MIN_SAVINGS_RATIO}), the original
 *   is kept. This protects already-compressed binary payloads (images,
 *   archives, etc.) from wasted CPU and size inflation.
 */
/**
 * Payloads below this size are never compressed. The 4-byte format
 * prefix + codec header/trailer overhead means small payloads gain
 * nothing, and tiny ones would grow.
 */
export declare const COMPRESSION_MIN_BYTES = 1024;
/**
 * Compression must shave off at least this fraction of the payload
 * size to be kept; otherwise the uncompressed original is stored.
 * Guards against incompressible (already-compressed / high-entropy)
 * data paying a permanent decompression tax for a negligible win.
 */
export declare const COMPRESSION_MIN_SAVINGS_RATIO = 0.05;
/** Which codec compressed a payload (or `none` when stored uncompressed). */
export type CompressionCodec = 'zstd' | 'gzip' | 'none';
/**
 * Telemetry sink describing what the compression layer did to a payload.
 * Populated by {@link compress} (write) and {@link decompress} (read) when
 * a `stats` object is passed. Sizes are measured at the compression
 * boundary — i.e. before encryption is layered on the write side and after
 * decryption on the read side — so they reflect compression's effect, not
 * the at-rest size (which also includes the `encr` envelope and, on some
 * backends, base64 expansion).
 *
 * Field meanings are identical for both directions:
 * - `uncompressedBytes`: the logical (devalue-prefixed) payload size.
 * - `storedBytes`: the size handed to / read from storage (compressed when
 *   a codec applied, otherwise equal to `uncompressedBytes`).
 * - `codec`: which codec applied (`none` when stored uncompressed).
 */
export interface CompressionStats {
    /** True once the compression layer ran (i.e. saw binary data). */
    recorded?: boolean;
    /** Whether a codec was applied (write) or present (read). */
    compressed?: boolean;
    /** Which codec applied / was present. */
    codec?: CompressionCodec;
    /** Logical, uncompressed payload size in bytes. */
    uncompressedBytes?: number;
    /** Stored (post-compression) payload size in bytes. */
    storedBytes?: number;
}
/**
 * Compress a format-prefixed payload if compression is enabled for the
 * target run and the payload is worth compressing.
 *
 * @param data - The format-prefixed serialized data (e.g. 'devl' + bytes)
 * @param enabled - Whether the target run supports compressed payloads
 *   (run specVersion >= SPEC_VERSION_SUPPORTS_COMPRESSION, and for
 *   cross-deployment writes, the target deployment's capabilities —
 *   see `getRunCapabilities` in capabilities.ts). zstd and gzip read
 *   support co-ship, so a single boolean is sufficient.
 * @param stats - Optional telemetry sink; populated when `data` is binary.
 * @returns The compressed data with a codec prefix, or the original data
 *   when compression is disabled, unavailable, or not worthwhile.
 */
export declare function compress(data: Uint8Array | unknown, enabled: boolean, stats?: CompressionStats): Promise<Uint8Array | unknown>;
/**
 * Decompress a format-prefixed payload if it's compressed.
 * Dispatches on the prefix ('zstd' or 'gzip') and inflates the inner
 * payload (which carries its own format prefix, e.g. 'devl').
 *
 * Non-compressed data (including non-binary legacy data) is returned
 * unchanged, so this is safe to apply unconditionally on read paths.
 */
export declare function decompress(data: Uint8Array | unknown, stats?: CompressionStats): Promise<Uint8Array | unknown>;
/**
 * Check if data is compressed (has a 'zstd' or 'gzip' format prefix).
 */
export declare function isCompressed(data: Uint8Array | unknown): boolean;
//# sourceMappingURL=compression.d.ts.map