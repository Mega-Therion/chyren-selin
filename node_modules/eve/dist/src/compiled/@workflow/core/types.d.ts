export declare function getErrorName(v: unknown): string;
export declare function getErrorStack(v: unknown): string;
export declare function isAbortError(value: unknown): value is {
    name: 'AbortError';
    message: string;
    stack?: string;
};
export declare function promoteAbortErrorToFatal(value: unknown): unknown;
export interface NormalizedUnknownError {
    name: string;
    message: string;
    stack: string;
}
/**
 * Normalizes unknown thrown values into a stable error shape.
 * This handles Promise/thenable throw values so logs/events never end up
 * with unhelpful "[object Promise]" messages.
 */
export declare function normalizeUnknownError(value: unknown): Promise<NormalizedUnknownError>;
//# sourceMappingURL=types.d.ts.map