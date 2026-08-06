import type { EvalReporter } from "#evals/runner/reporters/types.js";
/**
 * Configuration for the console reporter. Every field is optional.
 */
export interface ConsoleReporterConfig {
    /** Function to print console log messages. */
    log?: (message: string) => void;
    /** Whether to log with colored output. */
    color?: boolean;
}
/**
 * Creates a {@link ConsoleReporter}.
 */
export declare function Console(config?: ConsoleReporterConfig): EvalReporter;
