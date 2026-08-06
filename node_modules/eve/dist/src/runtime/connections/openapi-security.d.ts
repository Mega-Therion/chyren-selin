import type { ResolvedConnectionDefinition } from "#runtime/types.js";
/**
 * How the connection's resolved credential is placed on a request,
 * derived from the operation's effective `security` requirement and the
 * document's `securitySchemes` (OpenAPI 3.x) or `securityDefinitions`
 * (Swagger 2.0).
 *
 * - `bearer` — `Authorization: Bearer <token>` (the default; also covers
 *   `oauth2` / `openIdConnect`, whose access tokens are bearer tokens).
 * - `basic` — `Authorization: Basic <token>` (the author supplies the
 *   base64-encoded `user:pass` as the token).
 * - `apiKey` — the token is placed in the named header, query param, or
 *   cookie instead of `Authorization`.
 */
export type SecurityPlacement = {
    readonly kind: "bearer";
} | {
    readonly kind: "basic";
} | {
    readonly kind: "apiKey";
    readonly in: "header" | "query" | "cookie";
    readonly name: string;
};
/**
 * Resolves how an operation's credential should be placed, from its
 * effective `security` requirement (operation-level overrides the
 * document-level default) and the document's `securitySchemes`.
 *
 * Returns `undefined` when no requirement applies, in which case the
 * default `Authorization: Bearer` behavior is used. The first recognized
 * scheme in the first requirement object wins.
 */
export declare function resolveSecurity(document: Record<string, unknown>, operation: Record<string, unknown>): SecurityPlacement | undefined;
/**
 * Reshapes the resolved credential according to the operation's
 * {@link SecurityPlacement}. The credential is resolved once by
 * `resolveHeaders` as `Authorization: Bearer <token>`; this moves
 * it where the scheme says (api-key header/query/cookie) or rewrites the
 * `Authorization` scheme (basic). A `bearer` placement, a missing
 * placement, or a connection without `authorization` is a no-op.
 */
export declare function applySecurity(placement: SecurityPlacement | undefined, connection: ResolvedConnectionDefinition, headers: Record<string, string>, query: URLSearchParams, cookies: string[]): void;
