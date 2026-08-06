export declare function waitUntil(promise: Promise<unknown>): void;
/**
 * Schedule a background promise via `waitUntil`, guaranteeing that the
 * promise handed to `waitUntil` can never reject. Nothing consumes a
 * `waitUntil` promise, so a rejection surfaces as an `unhandledRejection`
 * and can crash the process — even when the same underlying error is
 * correctly handled by an awaited copy elsewhere.
 *
 * Expected client-disconnect errors (`AbortError` / `ResponseAborted`)
 * are ignored. Any other error is passed to `onError` and swallowed.
 */
export declare function safeWaitUntil(promise: Promise<unknown>, onError: (err: unknown) => void): void;
/**
 * A small wrapper around `waitUntil` that also returns
 * the result of the awaited promise.
 */
export declare function waitedUntil<T>(fn: () => Promise<T>): Promise<T>;
//# sourceMappingURL=wait-until.d.ts.map