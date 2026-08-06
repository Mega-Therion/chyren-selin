import type { LocalTrace } from "#tracing/local-trace-reader.js";
interface CliTraceLogger {
    error(message: string): void;
    log(message: string): void;
}
/**
 * Resolves an exact trace/session id or an unambiguous prefix. One session id
 * can match several traces, since a long session windows into more than one.
 */
export declare function resolveLocalTraces(traces: readonly LocalTrace[], reference: string): readonly LocalTrace[];
export declare function runTraceListCommand(logger: CliTraceLogger, appRoot: string, options?: {
    readonly json?: boolean;
}): Promise<void>;
export declare function runTraceShowCommand(logger: CliTraceLogger, appRoot: string, reference?: string, options?: {
    readonly json?: boolean;
    readonly verbose?: boolean;
}): Promise<void>;
export {};
