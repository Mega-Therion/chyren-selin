import type { HarnessEmitFn } from "#harness/types.js";
interface OrderedStreamEmitter {
    closeAndDrain(): Promise<void>;
    emit: HarnessEmitFn;
    readonly failureSignal: AbortSignal;
}
/**
 * Decouples model-stream consumption from the durable event sink while
 * preserving FIFO dispatch. Adjacent append events and same-call tool partials
 * waiting behind the active write are folded together; every other event
 * remains an ordering barrier.
 * Coalescing before the durable writer keeps one Workflow chunk per emitted
 * event, so event-count reconnect cursors remain aligned with chunk indexes.
 */
export declare function createOrderedStreamEmitter(emitFn: HarnessEmitFn, options?: {
    readonly maxPendingEvents?: number;
}): OrderedStreamEmitter;
export {};
