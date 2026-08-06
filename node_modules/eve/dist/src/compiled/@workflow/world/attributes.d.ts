import { z } from '#compiled/zod/index.js';
/**
 * Reserved key prefix for system-managed attributes. User code may not set
 * keys starting with `$` — those are blocked at validation time so the
 * namespace remains available for future system use.
 */
export declare const RESERVED_ATTRIBUTE_KEY_PREFIX = "$";
/**
 * Reserved attribute keys recording cross-run lineage. `start()` sets these on
 * a run created from inside another run: `$rootRunId` is the root of the chain,
 * `$parentRunId` the direct parent edge.
 */
export declare const ROOT_RUN_ID_ATTRIBUTE = "$rootRunId";
export declare const PARENT_RUN_ID_ATTRIBUTE = "$parentRunId";
/** Max length of an attribute key, in characters. */
export declare const ATTRIBUTE_KEY_MAX_LENGTH = 256;
/** Max length of an attribute value, in bytes (UTF-8). */
export declare const ATTRIBUTE_VALUE_MAX_BYTES = 256;
/** Max number of attributes on a single run (post-merge). */
export declare const ATTRIBUTE_MAX_PER_RUN = 64;
/**
 * A single change in an `experimentalSetAttributes` call. `value: null`
 * means "remove this key from the run's attributes".
 *
 * The shape is deliberately the same as the future `attr_set` event's
 * `eventData.changes` entries so the SDK and wire format do not change
 * when the full attributes feature lands.
 */
export declare const AttributeChangeSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodUnion<readonly [z.ZodString, z.ZodNull]>;
}, z.core.$strip>;
export type AttributeChange = z.infer<typeof AttributeChangeSchema>;
export declare const AttributeChangesSchema: z.ZodArray<z.ZodObject<{
    key: z.ZodString;
    value: z.ZodUnion<readonly [z.ZodString, z.ZodNull]>;
}, z.core.$strip>>;
/**
 * Result returned by `runs.experimentalSetAttributes` — the post-merge
 * snapshot of all attributes on the run. Provided so callers (notably
 * `setAttributes` and observability emitters) do not need a follow-up read.
 */
export interface ExperimentalSetAttributesResult {
    attributes: Record<string, string>;
}
export interface AttributeValidationContext {
    /**
     * Existing attribute keys on the run, used to enforce the per-run
     * cap accurately against the post-merge total — an incoming change
     * that updates an already-present key contributes zero net adds.
     *
     * If omitted, the cap check assumes every non-null change is a fresh
     * add, which is conservative but still safe (the only false-positive
     * shape rejects updates to existing keys at the cap boundary; the
     * authoritative server-side check uses the real post-merge size).
     */
    existingKeys?: Iterable<string>;
    /**
     * Permit keys that start with the reserved `$` prefix. Default `false`.
     *
     * The `$` namespace is reserved for framework / library code built on
     * top of the workflow SDK (telemetry, agent metadata, etc.). User code
     * MUST NOT set it; if a user tries, validation rejects the call so
     * accidental conflicts with tooling-owned keys can't slip through.
     *
     * Set this to `true` only from framework-level code that is aware of
     * the namespace conventions in use. Misuse can collide with tooling
     * keys and break observability surfaces.
     */
    allowReservedAttributes?: boolean;
}
export interface AttributeKeyValidationOptions {
    /**
     * Permit keys that start with the reserved `$` prefix. See the
     * `allowReservedAttributes` note on `AttributeValidationContext`.
     */
    allowReservedAttributes?: boolean;
}
/**
 * Thrown when an attribute key or value violates one of the validation
 * rules. Use a plain `Error` here so the world layer can decide whether
 * to wrap as `FatalError` (SDK) or return a 400 (server endpoint).
 */
export declare class AttributeValidationError extends Error {
    constructor(message: string);
}
/**
 * Validate a single attribute key. Returns an `AttributeValidationError`
 * on violation, or `null` if the key is valid. Returning instead of
 * throwing lets callers aggregate or wrap the failure as needed.
 *
 * The reserved `$`-prefix rule is enforced by default; framework code
 * may pass `allowReservedAttributes: true` to opt out.
 */
export declare function validateAttributeKey(key: string, options?: AttributeKeyValidationOptions): AttributeValidationError | null;
/**
 * Validate a single attribute value. `null` represents an unset and is
 * always valid. Returns an `AttributeValidationError` on violation or
 * `null` if the value is valid.
 */
export declare function validateAttributeValue(value: string | null): AttributeValidationError | null;
/**
 * Validate a batch of attribute changes. Throws `AttributeValidationError`
 * on the first violation found. Pass `existingKeys` (in `context`) so
 * the per-run cap check can use the real post-merge total — without it
 * the check is conservative and may reject an update to an
 * already-present key when the run is at the cap.
 */
export declare function validateAttributeChanges(changes: AttributeChange[], context?: AttributeValidationContext): void;
/**
 * Apply a batch of validated changes to an existing attribute map. Returns
 * a new map; does not mutate the input. The world layer uses this to
 * compute the post-merge snapshot when the underlying store cannot do the
 * merge in a single atomic operation.
 */
export declare function applyAttributeChanges(existing: Record<string, string> | undefined, changes: AttributeChange[]): Record<string, string>;
//# sourceMappingURL=attributes.d.ts.map