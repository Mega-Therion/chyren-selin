/**
 * Claims eve reads from a Vercel OIDC token payload.
 *
 * Decoded locally without signature verification: callers use the values
 * as stable identifiers (sandbox key derivation, credential routing),
 * never to make authentication decisions.
 */
export interface VercelOidcTokenClaims {
    readonly ownerId: string | undefined;
    readonly projectId: string | undefined;
}
/**
 * Decodes the payload claims of a Vercel OIDC token. Values that are not
 * decodable JWTs, or that carry no recognized claims, decode to empty
 * claims — callers only ever check individual fields.
 */
export declare function decodeVercelOidcTokenClaims(token: string): VercelOidcTokenClaims;
/**
 * Resolves the Vercel project id visible to this process: the
 * `VERCEL_PROJECT_ID` env var when exposed, otherwise the `project_id`
 * claim of `VERCEL_OIDC_TOKEN`. Both sources exist at build time and at
 * deployed runtime and name the same project, so identifiers derived
 * from this value agree across the two phases.
 */
export declare function resolveVercelProjectIdFromEnvironment(): string | undefined;
