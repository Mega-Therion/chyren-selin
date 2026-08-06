/**
 * Normalizes the Vercel SDK's Node-readable file response to Eve's public
 * WHATWG byte-stream contract.
 */
export declare function normalizeVercelReadStream(stream: object | null): ReadableStream<Uint8Array> | null;
