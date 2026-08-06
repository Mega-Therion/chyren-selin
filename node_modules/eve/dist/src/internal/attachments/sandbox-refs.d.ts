/**
 * Sandbox-resident attachment references.
 *
 * Refs are the compact wire format used after inbound attachment bytes
 * have been written into the sandbox:
 *
 * ```
 * eve-sandbox:?path=<urlencoded-resolved-path>&size=<bytes>&type=<mediaType>
 * ```
 */
/**
 * Custom URL scheme used by every sandbox-resident attachment ref. The
 * trailing colon is part of the scheme per WHATWG URL semantics.
 */
export declare const SANDBOX_URL_SCHEME = "eve-sandbox:";
/**
 * Serializable description of one sandbox-resident file attachment.
 *
 * `path` is the backend-native absolute path returned by
 * {@link SandboxSession.resolvePath}; `size` and `mediaType` are
 * snapshotted so hydration can decide whether to inline without
 * re-reading the file.
 */
export interface SandboxRef {
    readonly path: string;
    readonly size: number;
    readonly mediaType: string;
}
/**
 * Encodes a {@link SandboxRef} as a URL suitable for use as
 * `FilePart.data`.
 */
export declare function encodeSandboxRef(ref: SandboxRef): URL;
/**
 * Parses a {@link SandboxRef} from its URL form.
 */
export declare function decodeSandboxRef(value: URL | string): SandboxRef;
/**
 * Cheap runtime check: does this value look like a sandbox-ref URL?
 *
 * Accepts `URL` instances with the `eve-sandbox:` scheme. Strings are
 * NOT accepted — the staging and hydration layers only inspect
 * URL-instance `FilePart.data` values, matching the existing
 * `data instanceof URL` branch in `fileDataToBytes`.
 */
export declare function isSandboxRefUrl(value: unknown): value is URL;
