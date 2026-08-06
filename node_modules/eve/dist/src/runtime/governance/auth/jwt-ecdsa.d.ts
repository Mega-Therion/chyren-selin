import type { ResolvedJwtEcdsaAuthStrategy, RouteStrategyAuthenticationResult } from "#runtime/governance/auth/types.js";
/**
 * Verifies one bearer token against a resolved ECDSA JWT strategy.
 */
export declare function authenticateJwtEcdsaStrategy(input: {
    readonly token: string;
    readonly strategy: ResolvedJwtEcdsaAuthStrategy;
}): Promise<RouteStrategyAuthenticationResult>;
