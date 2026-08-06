import { type DevSessionEventLine, type DevSessionEventWindow } from "./logs-events.js";
interface CliLogsLogger {
    error(message: string): void;
    log(message: string): void;
}
/** One `eve dev` diagnostic log file under `.eve/logs`. */
export interface DevDiagnosticLogEntry {
    /** Stable reference: the file name without the `.log` extension. */
    readonly id: string;
    readonly path: string;
    /** Process start time encoded in the file name, when parseable. */
    readonly startedAt: Date | undefined;
    readonly sizeBytes: number;
}
/**
 * Lists `eve dev` diagnostic logs for an app root, most recent first. The
 * sortable timestamp prefix in each file name provides the ordering; a missing
 * log directory yields an empty list.
 */
export declare function listDevDiagnosticLogs(appRoot: string): Promise<DevDiagnosticLogEntry[]>;
/**
 * Resolves a user-supplied log reference to one entry. Accepts the full id,
 * the file name, the transcript's `.eve/logs/...` path, or any unambiguous
 * prefix of the id (with or without the `dev-` lead).
 */
export declare function resolveDevDiagnosticLog(logs: readonly DevDiagnosticLogEntry[], reference: string): DevDiagnosticLogEntry;
/** Options accepted by {@link runLogsShowCommand}. */
export interface LogsShowCommandOptions {
    /** Prepend the log's environment dump (the same-instance `.dump` sibling). */
    dump?: boolean;
    /** Interleave session events resolved from the local workflow store. */
    events?: boolean;
    /** Injectable event reader and clock; defaults to the real store and `Date.now`. */
    readEvents?: (appRoot: string, window: DevSessionEventWindow) => Promise<DevSessionEventLine[]>;
    now?: () => Date;
}
/**
 * `eve logs [logid]`: prints one diagnostic log to stdout — the most recent
 * when `logid` is omitted. The output carries nothing but records (no
 * resolved-path banner, no progress notes on either stream), so
 * `eve logs 2>&1 | jq` always parses; discover ids and paths with
 * `eve logs ls`. With `--dump`, the log's environment dump (a JSON
 * document) is prepended to the JSONL log body, forming one
 * self-contained, parseable report. With `--events`, session events are
 * resolved from the local workflow store at query time — never duplicated
 * into the log at capture time — and interleaved by timestamp as
 * `source: "event"` records.
 */
export declare function runLogsShowCommand(logger: CliLogsLogger, appRoot: string, logId?: string, options?: LogsShowCommandOptions): Promise<void>;
/** Options accepted by {@link runLogsListCommand}. */
export interface LogsListCommandOptions {
    /** Emit a machine-readable JSON array instead of the human listing. */
    json?: boolean;
}
/** Machine-readable row emitted by `eve logs ls --json`. */
export interface DevDiagnosticLogJson {
    id: string;
    path: string;
    startedAt: string | null;
    sizeBytes: number;
}
/** `eve logs ls`: lists diagnostic logs, most recent first. */
export declare function runLogsListCommand(logger: CliLogsLogger, appRoot: string, options?: LogsListCommandOptions): Promise<void>;
export {};
