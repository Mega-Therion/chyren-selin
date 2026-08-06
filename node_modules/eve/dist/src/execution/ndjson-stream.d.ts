/**
 * Transforms a byte stream of newline-delimited JSON (NDJSON) into a
 * stream of parsed values.
 *
 * The byte stream is produced lazily by `createByteStream`, so the
 * underlying source (a world-local run readable) is only opened when the
 * returned stream is consumed.
 *
 * Cancellation is forwarded to the source. When the returned stream is
 * cancelled — e.g. an SSE client disconnects and the server cancels the
 * response body — the underlying reader is cancelled too. This matters for
 * runs that never reach EOF: a parked (`session.waiting`) durable run keeps
 * its event stream open indefinitely, and the world-local streamer runs a
 * filesystem poll until its reader is cancelled. Without forwarding the
 * cancel, the read loop below would block on `reader.read()` forever and
 * that poll would leak for the life of the process, degrading streaming
 * throughput for every other session.
 */
export declare function parseNdjsonStream<T>(createByteStream: () => ReadableStream<Uint8Array>): ReadableStream<T>;
