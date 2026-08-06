import type { ResolvedOidcAuthStrategy, RouteStrategyAuthenticationResult } from "#runtime/governance/auth/types.js";
/**
 * Verifies one bearer token against a resolved OIDC strategy.
 */
export declare function authenticateOidcStrategy(input: {
    readonly token: string;
    readonly strategy: ResolvedOidcAuthStrategy;
}): Promise<RouteStrategyAuthenticationResult>;
