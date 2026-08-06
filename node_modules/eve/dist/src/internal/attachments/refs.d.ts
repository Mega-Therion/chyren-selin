/**
 * Opaque attachment references: the wire format a channel uses to carry
 * file identity across step boundaries without inlining the bytes.
 *
 * Refs are compact custom-scheme URLs:
 *
 * ```
 * eve-attachment:?v=1&p=<base64url-encoded JSON of { params, size? }>
 * ```
 */
/**
 * Custom URL scheme used by every attachment ref. The trailing colon
 * is part of the scheme per WHATWG URL semantics.
 */
export declare const ATTACHMENT_REF_SCHEME = "eve-attachment:";
/**
 * Current wire format version. Decoders reject any other value so a
 * future format bump doesn't silently misparse.
 */
export declare const ATTACHMENT_REF_WIRE_VERSION = "1";
/**
 * Serializable description of one inbound file attachment.
 *
 * `params` is an adapter-defined, JSON-safe object typed by the generic
 * parameter. It identifies the upstream file and must not carry
 * credentials; resolvers read credentials from adapter context or closure.
 *
 * `size` is optional. Populating it when the upstream protocol exposes
 * the byte length up front lets upload-policy size checks run without
 * fetching the bytes.
 */
export interface AttachmentRef<TParams = unknown> {
    readonly params: TParams;
    readonly size?: number;
}
/**
 * Encodes an {@link AttachmentRef} as a URL suitable for use as
 * `FilePart.data`.
 *
 * `TParams` links the encoded payload shape to the channel resolver.
 */
export declare function encodeAttachmentRef<TParams>(ref: AttachmentRef<TParams>): URL;
/**
 * Parses an {@link AttachmentRef} back out of a URL.
 */
export declare function parseAttachmentRef<TParams = unknown>(url: URL): AttachmentRef<TParams>;
/**
 * Cheap runtime check: does this value look like an attachment-ref URL?
 *
 * Accepts `URL` instances with the `eve-attachment:` scheme. Strings
 * are NOT accepted — the staging layer only checks URL-instance
 * `FilePart.data` values, matching the existing `data instanceof URL`
 * branch in `fileDataToBytes`.
 */
export declare function isAttachmentRefUrl(value: unknown): value is URL;
