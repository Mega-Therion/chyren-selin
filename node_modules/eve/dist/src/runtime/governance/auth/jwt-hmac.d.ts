import type { ResolvedJwtHmacAuthStrategy, RouteStrategyAuthenticationResult } from "#runtime/governance/auth/types.js";
/**
 * Verifies one bearer token against a resolved HMAC JWT strategy.
 */
export declare function authenticateJwtHmacStrategy(input: {
    readonly token: string;
    readonly strategy: ResolvedJwtHmacAuthStrategy;
}): Promise<RouteStrategyAuthenticationResult>;
