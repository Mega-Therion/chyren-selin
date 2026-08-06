import { z } from "#compiled/zod/index.js";
/** Outcome of queueing manual context compaction. */
export type CompactStatus = "accepted" | "no_active_session";
/** Successful response returned by the standard session-compaction route. */
export type CompactResponse = {
    readonly ok: true;
    readonly sessionId: string;
    readonly status: "accepted";
} | {
    readonly ok: true;
    readonly status: "no_active_session";
};
/** Validates successful responses from the standard session-compaction route. */
export declare const CompactResponseSchema: z.ZodType<CompactResponse>;
