import type { RuntimeActionRequest, RuntimeActionResult } from "#runtime/actions/types.js";
/**
 * Returns the stable match key used to pair one pending runtime action request
 * with its resume result.
 */
export declare function getRuntimeActionRequestKey(action: RuntimeActionRequest): string;
/**
 * Returns the stable match key used to pair one runtime action result with its
 * originating request.
 */
export declare function getRuntimeActionResultKey(result: RuntimeActionResult): string;
