/** A typed success-or-failure value for expected, recoverable outcomes. */
export type Result<T, E> = {
    readonly ok: true;
    readonly value: T;
} | {
    readonly ok: false;
    readonly error: E;
};
/** Wraps a value as a successful {@link Result}. */
export declare function ok<T>(value: T): Result<T, never>;
/** Wraps an error as a failed {@link Result}. */
export declare function err<E>(error: E): Result<never, E>;
