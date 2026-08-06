import type { JWTPayload } from "#compiled/jose/index.js";
import type { AuthenticatedCallerPrincipal, ResolvedTokenClaimMatchers } from "#runtime/governance/auth/types.js";
/**
 * Returns whether the verified JWT payload satisfies the authored subject and
 * claim selectors.
 */
export declare function areTokenClaimMatchersSatisfied(payload: JWTPayload, matchers: ResolvedTokenClaimMatchers): boolean;
/**
 * Creates a normalized JWT-backed eve principal from a verified payload.
 */
export declare function createJwtAuthenticatedCallerPrincipal(input: {
    readonly authenticator: AuthenticatedCallerPrincipal["authenticator"];
    readonly issuerClaims?: readonly string[];
    readonly payload: JWTPayload;
    readonly principalType: AuthenticatedCallerPrincipal["principalType"];
    readonly subjectClaim?: string;
}): AuthenticatedCallerPrincipal;
