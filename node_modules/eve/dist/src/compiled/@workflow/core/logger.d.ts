type LogMetadata = Record<string, unknown>;
type LogFn = (message: string, metadata?: LogMetadata) => void;
export interface Logger {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
    /**
     * Returns a child logger that merges the given metadata into every call.
     * Useful for attaching stable context (e.g. `workflowRunId`, `workflowName`,
     * `stepId`) so callers don't have to repeat it on every log.
     *
     * Call-site metadata wins on conflict, so children can still override.
     */
    child: (metadata: LogMetadata) => Logger;
    /**
     * Convenience child logger for a workflow run. Equivalent to
     * `logger.child({ workflowRunId, workflowName })`, but centralized so all
     * runtime code structures run metadata consistently.
     */
    forRun: (workflowRunId: string, workflowName?: string, extra?: LogMetadata) => Logger;
}
export declare const stepLogger: Logger;
export declare const runtimeLogger: Logger;
export declare const webhookLogger: Logger;
export declare const eventsLogger: Logger;
export declare const adapterLogger: Logger;
export declare const buildLogger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map