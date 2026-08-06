import type { CodeModeContinuation, CodeModeContinuationSecurityOptions, UnsignedCodeModeContinuation } from "./types.js";
export interface ResolvedCodeModeContinuationSecurity {
    signingKey: Buffer;
    maxAgeMs: number;
}
/**
 * Sets the process-global continuation signing key.
 *
 * Hosts that need approval or interrupt continuations to survive process
 * restarts must configure the same secret before creating and resuming
 * continuations. Calling without arguments restores a random process-local key.
 *
 * @param key - Secret key bytes or UTF-8 string, or `undefined` to reset.
 * @param options - Optional continuation signing policy.
 */
export declare function setCodeModeContinuationSigningKey(key?: string | Uint8Array, options?: {
    maxAgeMs?: number;
}): void;
/**
 * Resolves continuation security for one invocation without mutating process
 * defaults.
 *
 * @internal
 */
export declare function resolveCodeModeContinuationSecurity(options?: CodeModeContinuationSecurityOptions): ResolvedCodeModeContinuationSecurity;
/**
 * Signs a host-created continuation as an unforgeable bearer capability.
 *
 * @internal
 */
export declare function signCodeModeContinuation(continuation: UnsignedCodeModeContinuation, security?: ResolvedCodeModeContinuationSecurity): CodeModeContinuation;
/**
 * Verifies that a continuation was issued by this host and has not expired.
 *
 * @internal
 */
export declare function verifyCodeModeContinuation(continuation: CodeModeContinuation, security?: CodeModeContinuationSecurityOptions): void;
/**
 * Returns whether a value is a currently valid signed continuation.
 *
 * @internal
 */
export declare function hasValidCodeModeContinuationCapability(value: unknown, security?: CodeModeContinuationSecurityOptions): value is CodeModeContinuation;
//# sourceMappingURL=continuation-capability.d.ts.map