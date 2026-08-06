/** Product token for the installed package, such as `package-name/1.2.3`. */
export declare function buildPackageUserAgent(): string;
/** Appends the installed package product without discarding an existing User-Agent. */
export declare function appendPackageUserAgent(headers: Headers): Headers;
/**
 * Wraps a `fetch` implementation so every request's `user-agent` carries the
 * installed package product token (appended after existing products). Without
 * an explicit `inner`, `globalThis.fetch` is resolved per request rather than
 * captured at wrap time, so globally installed instrumentation still applies.
 */
export declare function withPackageUserAgent(inner?: typeof globalThis.fetch): typeof globalThis.fetch;
