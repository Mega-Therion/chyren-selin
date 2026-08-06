/**
 * Structural validation for authored connection auth definitions. Returns
 * `undefined` on success or a context-free error fragment for the caller to
 * prefix.
 */
import type { AuthorizationDefinition } from "#runtime/connections/types.js";
/**
 * Validates that authored `auth` conforms to the connection auth contract.
 *
 * Returns `undefined` on success; otherwise a descriptive message
 * fragment starting with `The "<fieldName>"...` that the caller is expected
 * to prefix with its own context.
 */
export declare function validateAuthorizationSpec(authorization: unknown, fieldName?: string): string | undefined;
/**
 * Validates and normalizes an authored auth definition into the runtime shape.
 *
 * `getToken`-only auth defaults to `principalType: "app"` so static tokens and
 * custom bearer-token fetchers do not need extra boilerplate.
 */
export declare function normalizeAuthorizationSpec(authorization: unknown, prefix: string, fieldName?: string): AuthorizationDefinition;
