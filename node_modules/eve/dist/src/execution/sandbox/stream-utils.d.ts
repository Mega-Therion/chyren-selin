/**
 * Collects all chunks of a `ReadableStream<Uint8Array>` into a single
 * Buffer.
 */
export declare function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer>;
/**
 * Wraps a byte buffer as a single-chunk `ReadableStream<Uint8Array>`.
 */
export declare function bufferToStream(buf: Uint8Array): ReadableStream<Uint8Array>;
