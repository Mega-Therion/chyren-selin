import { type PromiseWithResolvers } from './_workflow-utils.js';
/**
 * A durability barrier a sink may expose under {@link STREAM_DRAIN_SYMBOL}:
 * resolves once every chunk the sink has accepted is durably written, rejects
 * if any server write failed. See `WorkflowServerWritableStream`.
 */
type DrainBarrier = () => Promise<void>;
/**
 * Flow-control knob: upper bound on chunks read-but-not-yet-durably-written
 * while coalescing. Once this many chunks are outstanding the producer stops
 * reading until the consumer drains a batch, so a fast producer paired with a
 * slow server can't grow the in-memory queue without bound. Override:
 * `WORKFLOW_STREAM_MAX_INFLIGHT_CHUNKS`.
 *
 * This is deliberately distinct from the per-request batch caps below: this
 * bounds how much is *buffered*, those bound how much goes out in one
 * `writeMulti`. Raising this must never let a single request exceed a wire
 * limit — batch sizing enforces that independently.
 */
export declare const MAX_INFLIGHT_CHUNKS = 1000;
export declare const getMaxInflightChunks: () => number;
/**
 * Wire limit: maximum number of chunks in a single coalesced `writeMulti`.
 * The server enforces a per-multi-write chunk cap (1,000 today); a batch is
 * split at this bound so it can never be rejected wholesale, independently of
 * the backpressure knob above. Override: `WORKFLOW_STREAM_MAX_CHUNKS_PER_BATCH`.
 */
export declare const MAX_CHUNKS_PER_BATCH = 1000;
export declare const getMaxChunksPerBatch: () => number;
/**
 * Wire limit: maximum cumulative bytes in a single coalesced `writeMulti`.
 * Chunk *count* alone is not enough — 1,000 small chunks are ~100KB but 1,000
 * file-sized chunks can be hundreds of MB, which platform request-body limits
 * reject long before the count cap matters. A batch is split once adding the
 * next chunk would exceed this (a single chunk larger than the cap still goes
 * out alone). Default 1 MiB. Override: `WORKFLOW_STREAM_MAX_BYTES_PER_BATCH`.
 */
export declare const MAX_BYTES_PER_BATCH: number;
export declare const getMaxBytesPerBatch: () => number;
/**
 * Buffer bound (bytes) for the server writable's group-commit buffer — the
 * byte-denominated counterpart of {@link MAX_INFLIGHT_CHUNKS}. `write()`
 * blocks once this much data is buffered-but-not-durable, so a fast producer
 * of large chunks can't grow client memory without bound. Default 8 MiB
 * (eight request-sized groups). Override: `WORKFLOW_STREAM_MAX_BUFFERED_BYTES`.
 */
export declare const MAX_BUFFERED_BYTES: number;
export declare const getMaxBufferedBytes: () => number;
/**
 * Polling interval (in ms) for lock release detection.
 *
 * The Web Streams API does not expose an event for "lock released but stream
 * still open"; we can only distinguish that state by periodically attempting
 * to acquire a reader/writer. For that reason we use polling instead of a
 * fully event-driven approach here.
 *
 * 10ms is chosen so the polling tick almost never sits on the critical path:
 * the V2 step-executor's `opsSettled` race waits for this state to resolve
 * after each step body returns, so a coarser interval (the previous 100ms)
 * adds visible per-step latency to streaming workflows. With a uniformly
 * distributed offset between step return and the next tick, the expected
 * wait is half the interval — so 10ms means ~5ms average wait per step
 * instead of ~50ms. The per-tick work is `writable.locked` plus a
 * `getWriter()`/`releaseLock()` probe, both microsecond-scale; 10× more
 * ticks during a stream's lifetime is not measurable in practice.
 */
export declare const LOCK_POLL_INTERVAL_MS = 10;
/**
 * State tracker for flushable stream operations.
 * Resolves when either:
 * 1. Stream completes (close/error), OR
 * 2. Lock is released AND all pending operations are flushed
 *
 * Note: `doneResolved` and `streamEnded` are separate:
 * - `doneResolved`: The `done` promise has been resolved (step can complete)
 * - `streamEnded`: The underlying stream has actually closed/errored
 *
 * Once `doneResolved` is set to true, the `done` promise will not resolve
 * again. Re-acquiring locks after release is not supported as a way to
 * trigger additional completion signaling.
 */
export interface FlushableStreamState extends PromiseWithResolvers<void> {
    /** Number of write operations currently in flight to the server */
    pendingOps: number;
    /** Whether the `done` promise has been resolved */
    doneResolved: boolean;
    /** Whether the underlying stream has actually closed/errored */
    streamEnded: boolean;
    /** Interval ID for writable lock polling (if active) */
    writablePollingInterval?: ReturnType<typeof setInterval>;
    /** Interval ID for readable lock polling (if active) */
    readablePollingInterval?: ReturnType<typeof setInterval>;
    /**
     * Durability barrier of the pipe's sink, when it acks writes on buffer
     * entry (see {@link STREAM_DRAIN_SYMBOL}). Lock-release completion awaits
     * this before resolving so `pendingOps === 0` (fast, buffered acks) can't
     * complete a step while data is still client-side.
     */
    drainBarrier?: DrainBarrier;
}
export declare function createFlushableState(): FlushableStreamState;
/**
 * Polls a WritableStream to check if the user has released their lock.
 * Resolves the done promise when lock is released and no pending ops remain.
 *
 * Note: Only resolves if stream is unlocked but NOT closed. If the user closes
 * the stream, the pump will handle resolution via the stream ending naturally.
 *
 * Protection: If polling is already active on this state, the existing interval
 * is used to avoid creating multiple simultaneous polling operations.
 */
export declare function pollWritableLock(writable: WritableStream, state: FlushableStreamState): void;
/**
 * Polls a ReadableStream to check if the user has released their lock.
 * Resolves the done promise when lock is released and no pending ops remain.
 *
 * Note: Only resolves if stream is unlocked but NOT closed. If the user closes
 * the stream, the pump will handle resolution via the stream ending naturally.
 *
 * Protection: If polling is already active on this state, the existing interval
 * is used to avoid creating multiple simultaneous polling operations.
 */
export declare function pollReadableLock(readable: ReadableStream, state: FlushableStreamState): void;
/**
 * Creates a flushable pipe from a ReadableStream to a WritableStream.
 * Unlike pipeTo(), this resolves when:
 * 1. The source stream completes (close/error), OR
 * 2. The user releases their lock on userStream AND all pending writes are flushed
 *
 * @param source - The readable stream to read from (e.g., transform's readable)
 * @param sink - The writable stream to write to (e.g., server writable)
 * @param state - The flushable state tracker
 * @returns Promise that resolves when stream ends (not when done promise resolves)
 */
export declare function flushablePipe(source: ReadableStream, sink: WritableStream, state: FlushableStreamState): Promise<void>;
export {};
//# sourceMappingURL=flushable-stream.d.ts.map