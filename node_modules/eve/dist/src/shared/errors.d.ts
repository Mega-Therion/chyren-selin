/**
 * Shared pure error projections used by public helpers and internals.
 */
/**
 * Projects an unknown throwable into a human-readable string.
 *
 * Plain objects are rendered as JSON rather than `"[object Object]"`.
 */
export declare function toErrorMessage(error: unknown): string;
/**
 * Coerces an unknown throwable into a proper {@link Error} instance.
 *
 * Returns real Errors unchanged. For plain-object shapes (common after
 * structured-clone strips prototypes), copies useful `message`, `name`,
 * `stack`, and `cause` fields onto a fresh Error.
 */
export declare function toError(raw: unknown): Error;
/**
 * Yields the error itself and every object on its `cause` chain, once
 * each. Cycles terminate the walk instead of looping.
 */
export declare function walkCauseChain(error: unknown): Generator<unknown>;
