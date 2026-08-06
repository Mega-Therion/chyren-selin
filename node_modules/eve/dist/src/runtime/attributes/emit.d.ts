import "#internal/workflow/builtins.js";
import { type EveAttributeValue } from "#runtime/attributes/normalize.js";
export { EVE_ATTRIBUTE_VALUE_MAX_BYTES, type EveAttributeValue, truncateForTag, } from "#runtime/attributes/normalize.js";
/**
 * Writes a batch of eve-owned attributes to the active workflow run.
 *
 * Reserved-namespace contract:
 * - All keys must use the `$eve.` prefix (the workflow runtime would
 *   otherwise reject them as user-space writes into the reserved `$`
 *   namespace).
 * - The call always opts in via `{ allowReservedAttributes: true }`
 *   on behalf of the framework — authored code never calls this helper
 *   directly.
 *
 * Value normalization:
 * - `undefined` entries are dropped so callers can build attribute
 *   maps with optional fields (`$eve.subagent` is only present on
 *   subagent roots, for example).
 * - Numbers are stringified (the runtime stores all values as strings).
 * - Strings are truncated to {@link EVE_ATTRIBUTE_VALUE_MAX_BYTES} via
 *   {@link truncateForTag} so a long free-form value (e.g. `$eve.title`)
 *   can never trip the runtime's per-value byte budget.
 *
 * Failure policy: tag writes are observability metadata, not load-bearing
 * state. A failure inside the runtime (transient network, schema bug,
 * missing world adapter) is logged once per process and then swallowed
 * so the eve session it tagged is unaffected.
 *
 * Must be called from inside a `"use workflow"` or `"use step"` body —
 * the runtime throws a `FatalError` outside those contexts.
 */
export declare function setEveAttributes(attrs: Record<string, EveAttributeValue>): Promise<void>;
