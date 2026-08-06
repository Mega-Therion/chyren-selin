import type { SessionCallback } from "#channel/types.js";
export type SessionCallbackParseResult = {
    readonly callback: SessionCallback;
    readonly ok: true;
} | {
    readonly cause: unknown;
    readonly message: string;
    readonly ok: false;
};
export declare function parseSessionCallback(value: unknown): SessionCallbackParseResult;
