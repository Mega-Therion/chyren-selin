/**
 * Shared helpers for decoding AI SDK `FilePart.data` values into raw
 * bytes and inspecting their size without fetching remote resources.
 *
 * URL-shaped inputs that require IO return `null`; channel attachment
 * refs are resolved explicitly by the staging layer.
 */
/**
 * Converts any inline AI SDK `FilePart.data` value into raw bytes.
 *
 * Returns `null` for every URL-shaped input the caller is expected to
 * handle out-of-band, including `eve-attachment:` refs and remote URLs.
 */
export declare function fileDataToBytes(data: unknown): Promise<Buffer | null>;
/**
 * Returns the byte length of `FilePart.data` without performing any IO.
 */
export declare function getKnownByteLength(data: unknown): number | null;
