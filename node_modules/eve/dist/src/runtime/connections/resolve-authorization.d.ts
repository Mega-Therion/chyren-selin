import type { SessionContext } from "#public/definitions/callback-context.js";
import type { ResolvedConnectionDefinition } from "#runtime/types.js";
import type { AuthorizationDefinition } from "#runtime/connections/types.js";
type ResolvedAuthorization = Readonly<AuthorizationDefinition> | undefined;
/**
 * Resolves and validates the auth provider for the active connection call.
 * Dynamic providers are cached for the execution step so token resolution,
 * interactive OAuth, and eviction all use the same provider instance.
 */
export declare function resolveConnectionAuthorization(connection: ResolvedConnectionDefinition, ctx?: SessionContext): Promise<ResolvedAuthorization>;
export {};
