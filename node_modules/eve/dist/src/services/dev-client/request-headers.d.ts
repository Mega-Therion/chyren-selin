import { z } from "zod";
declare const VercelOidcClaimsSchema: z.ZodObject<{
    owner_id: z.ZodString;
    project_id: z.ZodString;
}, z.core.$strip>;
/** Vercel owner and project expected to have minted an OIDC token. */
export interface DevelopmentOidcTarget {
    readonly ownerId: string;
    readonly projectId: string;
    /** Ignore an ambient token and ask Vercel for this exact project. */
    readonly forceRefresh?: boolean;
}
type VercelOidcClaimName = keyof z.infer<typeof VercelOidcClaimsSchema>;
type InvalidVercelOidcClaim = VercelOidcClaimName | "claims";
/** Why eve could not use a locally resolved Vercel OIDC token. */
export type DevelopmentOidcTokenFailure = {
    readonly kind: "resolution-failed";
    readonly message: string;
} | {
    readonly kind: "malformed-token";
    readonly reason: "missing-payload" | "invalid-json-payload";
} | {
    readonly kind: "invalid-claims";
    readonly invalidClaims: readonly InvalidVercelOidcClaim[];
} | {
    readonly kind: "target-mismatch";
    readonly mismatchedClaims: readonly VercelOidcClaimName[];
};
/** Result of resolving and checking a Vercel OIDC token for one target. */
export type DevelopmentOidcTokenResolution = {
    readonly kind: "resolved";
    readonly token: string;
} | DevelopmentOidcTokenFailure;
/**
 * Resolves and claim-checks the local Vercel OIDC token for a verified target.
 * It does not authorize a destination; callers must verify the exact origin
 * first and install the result in a `DevelopmentCredentialGate`.
 */
export declare function resolveDevelopmentOidcToken(input: DevelopmentOidcTarget): Promise<DevelopmentOidcTokenResolution>;
/**
 * Resolves the current linked project's Vercel OIDC token for a local TUI request.
 *
 * An unavailable token deliberately becomes no bearer, so ordinary local
 * requests still reach `localDev()`; user-scoped Connect requests then report
 * that they need a Vercel user rather than trusting a client-supplied failure.
 */
export declare function resolveLinkedDevelopmentOidcToken(workspaceRoot: string): Promise<string>;
/**
 * Vercel header used to bypass preview protection for framework-owned routes
 * during local CLI development. Paired with a Protection Bypass for
 * Automation token issued from Project Settings.
 */
export declare const VERCEL_PROTECTION_BYPASS_HEADER = "x-vercel-protection-bypass";
export {};
