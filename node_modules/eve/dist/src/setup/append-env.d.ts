export interface AppendEnvOptions {
    /** Replace existing keys. Default: false (existing keys are preserved). */
    force?: boolean;
}
export interface AppendEnvResult {
    /** Keys that were inserted or replaced. */
    written: string[];
    /** Keys that already existed and were preserved (only when `force` is false). */
    skipped: string[];
}
/**
 * Idempotently merges `values` into the `.env`-style file at `envPath`.
 *
 * - Missing keys are appended.
 * - Existing keys are preserved unless `options.force` is true.
 * - The file is created if it does not exist.
 *
 * Returns which keys were written vs. skipped so callers can report
 * accurately ("already had X — kept your value").
 */
export declare function appendEnv(envPath: string, values: Record<string, string>, options?: AppendEnvOptions): Promise<AppendEnvResult>;
