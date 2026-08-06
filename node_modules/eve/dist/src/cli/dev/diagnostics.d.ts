import { type LogRecord } from "#internal/logging.js";
import { type CreateDevDiagnosticDumpOptions } from "./diagnostic-dump.js";
import { type DevDiagnosticEntry } from "./diagnostic-sink.js";
/**
 * The one diagnostics recorder an `eve dev` process owns: the per-process
 * JSONL log (sink), its environment dump, session-stats accumulation, and
 * ownership of eve's structured log records. The TUI holds a single
 * reference and calls in at its capture points; everything stateful about
 * diagnostics lives here, not in the renderer.
 */
export interface DevDiagnostics {
    /** Project-relative path of the diagnostic log, for transcript pointers. */
    readonly displayPath: string;
    /** Appends one captured record to the per-process diagnostic log. */
    append(entry: DevDiagnosticEntry): void;
    recordPrompt(): void;
    recordStepUsage(usage: {
        inputTokens?: number;
        outputTokens?: number;
    } | undefined): void;
    recordToolCall(toolName: string): void;
    recordSubagentDispatch(callId: string): void;
    /** Rewrites the environment dump with the stats accumulated so far. */
    reportStats(): void;
    /**
     * Takes ownership of eve's structured log records: each record is
     * persisted to the log with its structure intact and then handed to
     * `onRecord` for display. While subscribed, records never reach the
     * console, so a host that also scrapes stderr sees each record exactly
     * once.
     */
    subscribeLogRecords(onRecord: (record: LogRecord) => void): void;
    unsubscribeLogRecords(): void;
    close(): Promise<void>;
}
/**
 * Creates the diagnostics recorder for one `eve dev` process: the
 * exclusive per-process log plus its same-instance environment dump.
 * Rejects when the log cannot be created (callers run without
 * diagnostics rather than crash the TUI).
 */
export declare function createDevDiagnostics(appRoot: string, options?: CreateDevDiagnosticDumpOptions): Promise<DevDiagnostics>;
