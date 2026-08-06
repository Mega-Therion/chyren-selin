import type { DeliverPayload } from "#channel/types.js";
/** Coalesces channel payloads while preserving turn input and adapter-specific fields. */
export declare function coalesceDeliverPayloads(payloads: readonly DeliverPayload[]): DeliverPayload;
