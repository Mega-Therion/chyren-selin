import { z } from "#compiled/zod/index.js";
/** Outcome of queueing a manual context clear. */
export type ClearStatus = "accepted" | "no_active_session";
/** Successful response returned by the standard session-clear route. */
export type ClearResponse = {
    readonly ok: true;
    readonly sessionId: string;
    readonly status: "accepted";
} | {
    readonly ok: true;
    readonly status: "no_active_session";
};
/** Validates successful responses from the standard session-clear route. */
export declare const ClearResponseSchema: z.ZodType<ClearResponse>;
