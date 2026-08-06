/**
 * Maximum UTF-8 byte size for one Workflow run attribute value.
 *
 * Mirrored from `ATTRIBUTE_VALUE_MAX_BYTES` in `@workflow/world` so the
 * normalization helper stays independent of the full world package.
 * `emit.drift.test.ts` guards the mirror against upstream changes.
 */
export declare const EVE_ATTRIBUTE_VALUE_MAX_BYTES = 256;
/** Attribute value accepted by eve's internal attribute builders. */
export type EveAttributeValue = string | number | undefined;
/**
 * Truncates a string to Workflow's UTF-8 byte budget without splitting
 * a surrogate pair.
 */
export declare function truncateForTag(value: string, maxBytes?: number): string;
/** Normalizes sparse eve attributes into Workflow's string-only shape. */
export declare function normalizeEveAttributes(attrs: Record<string, EveAttributeValue>): Record<string, string>;
