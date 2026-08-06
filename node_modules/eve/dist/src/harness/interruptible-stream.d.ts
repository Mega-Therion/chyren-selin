/**
 * Stops consuming `stream` as soon as `failureSignal` aborts, including while
 * the underlying iterator is stalled in `next()`.
 */
export declare function interruptStreamOnFailure<T>(stream: AsyncIterable<T>, failureSignal: AbortSignal): AsyncIterable<T>;
