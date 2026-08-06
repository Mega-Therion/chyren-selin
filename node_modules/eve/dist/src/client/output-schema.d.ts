import type { UnstampedMessageStreamEvent } from "#protocol/message.js";
/**
 * Extracts the most recent finalized structured result from a turn event list.
 */
export declare function extractCompletedResult<TOutput>(events: readonly UnstampedMessageStreamEvent[]): TOutput | undefined;
