import type { ResolvedHttpBasicAuthStrategy, RouteStrategyAuthenticationResult } from "#runtime/governance/auth/types.js";
/**
 * Verifies one HTTP Basic credential against a resolved eve strategy.
 */
export declare function authenticateHttpBasicStrategy(input: {
    readonly authorization: string;
    readonly strategy: ResolvedHttpBasicAuthStrategy;
}): RouteStrategyAuthenticationResult;
