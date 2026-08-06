/**
 * Upload-policy authoring helpers for channel routes.
 */
import type { FilePart, UserContent } from "ai";
/**
 * Framework policy for inbound attachments. Either the literal
 * `"disabled"` (reject every attachment) or a structural config.
 */
export type UploadPolicy = "disabled" | UploadPolicyConfig;
/**
 * - `maxBytes` caps the decoded payload size. Zero also rejects every
 *   attachment; negative values are invalid.
 * - `allowedMediaTypes` is either `"*"` or a list of exact or wildcard
 *   patterns. A pattern ending in `/*` matches any subtype (e.g.
 *   `image/*` matches `image/png`).
 */
export interface UploadPolicyConfig {
    readonly maxBytes: number;
    readonly allowedMediaTypes: readonly string[] | "*";
}
/** Author-facing input accepted by channel factories. */
export type UploadPolicyInput = "disabled" | Partial<UploadPolicyConfig>;
/**
 * Framework default: 25 MB cap, unrestricted media types. Channels
 * override this per-route; authors override per-channel /
 * channel factory call via the `uploadPolicy` option.
 */
export declare const DEFAULT_UPLOAD_POLICY: UploadPolicyConfig;
/**
 * Describes the reason one inbound `FilePart` failed the policy check.
 *
 * Channels use this to produce human-readable error responses
 * (`413 Payload Too Large`, `415 Unsupported Media Type`) or to log and
 * drop individual attachments that should not reach the harness.
 */
export type UploadPolicyViolation = {
    readonly kind: "too-large";
    readonly mediaType: string;
    readonly filename?: string;
    readonly byteLength: number;
    readonly limit: number;
} | {
    readonly kind: "disallowed-media-type";
    readonly mediaType: string;
    readonly filename?: string;
    readonly allowedMediaTypes: readonly string[];
};
/**
 * Produces a final {@link UploadPolicy} by merging an optional partial
 * override on top of `base` (default: {@link DEFAULT_UPLOAD_POLICY}).
 * Returns `"disabled"` unchanged when passed as the override.
 */
export declare function mergeUploadPolicy(override?: UploadPolicyInput, base?: UploadPolicyConfig): UploadPolicy;
/**
 * Returns `true` when `policy` rejects every attachment — the explicit
 * `"disabled"` literal, `maxBytes: 0`, or an empty `allowedMediaTypes`
 * array. Channels use this to skip attachment-discovery work.
 */
export declare function isUploadsDisabled(policy: UploadPolicy): boolean;
/**
 * Returns `true` if `mediaType` is accepted under `policy`.
 */
export declare function isMediaTypeAllowed(mediaType: string, policy: UploadPolicy): boolean;
/**
 * Evaluates a single `FilePart` against a {@link UploadPolicy}. Returns
 * a {@link UploadPolicyViolation} on rejection, or `null` when the
 * part is either accepted or has a non-local payload (remote URL) whose
 * size cannot be determined without fetching.
 *
 * Order of checks is stable: media-type first (cheap), size second.
 * This keeps channel error responses consistent — a 25 MB disallowed
 * CSV surfaces a 415 instead of a 413 — and mirrors how most HTTP
 * proxies enforce policy.
 */
export declare function evaluateFilePart(part: FilePart, policy: UploadPolicy): UploadPolicyViolation | null;
/**
 * Walks a `UserContent` array and returns every policy violation, in
 * iteration order. Non-file parts (text, image) are skipped.
 *
 * Returns an empty array when the message is a plain string or when
 * every file part passes. Channels use this to decide between
 * rejecting an inbound request (HTTP) and dropping individual attachments
 * (Slack).
 */
export declare function collectUploadPolicyViolations(content: string | UserContent, policy: UploadPolicy): readonly UploadPolicyViolation[];
/**
 * Returns a copy of `content` with every {@link FilePart} that violates
 * `policy` removed.
 *
 * Callers that want a hard-fail contract (HTTP) should use
 * {@link collectUploadPolicyViolations} and return a 4xx response
 * instead. Callers that want best-effort delivery (Slack: drop the bad
 * upload, keep the turn going) use this helper and log the dropped
 * attachments.
 */
export declare function stripDisallowedFileParts(content: string | UserContent, policy: UploadPolicy): string | UserContent;
/**
 * Renders a {@link UploadPolicyViolation} as a short human-readable
 * string. Used by channel error responses and warning logs.
 */
export declare function formatUploadPolicyViolation(violation: UploadPolicyViolation): string;
