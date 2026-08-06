export interface SessionTokenAmounts {
    readonly inputTokens: number;
    readonly outputTokens: number;
}
export interface SessionRuntimeTokenLimits {
    readonly inputTokens?: number;
    readonly outputTokens?: number;
}
export type SessionTokenLimitViolation = {
    readonly kind: "input";
    readonly limit: number;
    readonly usedTokens: number;
} | {
    readonly kind: "output";
    readonly limit: number;
    readonly usedTokens: number;
};
/** Resolves per-axis lifetime ceilings, preferring a previously granted ceiling. */
export declare function resolveRuntimeTokenLimits(input: {
    readonly configured: SessionRuntimeTokenLimits;
    readonly stored?: SessionRuntimeTokenLimits;
}): SessionRuntimeTokenLimits;
/** Grants one full configured window from the current lifetime usage. */
export declare function grantRuntimeTokenLimits(input: {
    readonly configured: SessionRuntimeTokenLimits;
    readonly usage: SessionTokenAmounts;
}): SessionRuntimeTokenLimits;
/** Returns the unspent quota for each capped axis. */
export declare function remainingRuntimeTokenQuota(input: {
    readonly runtime: SessionRuntimeTokenLimits;
    readonly usage: SessionTokenAmounts;
}): {
    readonly inputTokens: number | false;
    readonly outputTokens: number | false;
};
/** Returns the first exhausted axis, with input taking precedence. */
export declare function findRuntimeTokenLimitViolation(input: {
    readonly configured: SessionRuntimeTokenLimits;
    readonly runtime: SessionRuntimeTokenLimits;
    readonly usage: SessionTokenAmounts;
}): SessionTokenLimitViolation | null;
