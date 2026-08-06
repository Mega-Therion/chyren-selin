import type { MessageStreamEvent } from "#protocol/message.js";
/**
 * Returns true when an error looks like a stream socket disconnection that
 * can be recovered via reconnection.
 */
export declare function isStreamDisconnectError(error: unknown): boolean;
/**
 * Reads newline-delimited JSON events from a `ReadableStream<Uint8Array>`.
 *
 * Yields one parsed {@link MessageStreamEvent} per complete NDJSON line.
 * Handles partial lines across chunks via an internal buffer.
 *
 * All read errors — including socket disconnections — propagate to the caller.
 * Use {@link isStreamDisconnectError} to classify them.
 */
export declare function readNdjsonStream(body: ReadableStream<Uint8Array>): AsyncGenerator<MessageStreamEvent>;
