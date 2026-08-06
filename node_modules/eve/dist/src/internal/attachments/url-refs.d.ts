/**
 * Custom URL scheme for serializing `URL` objects in `FilePart.data`
 * across the queue boundary.
 *
 * Route handlers place `new URL("https://...")` on `FilePart.data`.
 * Before the message crosses the queue, `send()` rewrites these as
 * `eve-url:https://...` strings. After the queue, the staging pipeline
 * reconstitutes them back to `URL` objects so `instanceof URL` checks
 * work reliably.
 */
export declare function serializeUrlFilePart(url: URL): string;
export declare function isSerializedUrlFilePart(data: unknown): data is string;
export declare function deserializeUrlFilePart(data: string): URL;
/**
 * Whether a `FilePart.data` string carries a framework-internal ref scheme.
 */
export declare function hasInternalRefScheme(data: string): boolean;
