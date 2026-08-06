import type { LogLevel } from "#internal/logging.js";
import type { JsonObject } from "#shared/json.js";
export type DevDiagnosticSource = "stderr" | "stdout" | "sandbox" | "workflow" | "tool" | "log";
/** Captured output or a failure summary attributed to one capture point. */
export interface DevDiagnosticOutputEntry {
    readonly source: Exclude<DevDiagnosticSource, "log">;
    readonly summary?: string;
    readonly detail: string;
    /** Structured remediation carried by cataloged failures. */
    readonly hint?: string;
}
/** One structured record from eve's own logger. */
export interface DevDiagnosticLogRecordEntry {
    readonly source: "log";
    readonly level: LogLevel;
    readonly namespace: string;
    readonly message: string;
    readonly fields?: JsonObject;
}
export type DevDiagnosticEntry = DevDiagnosticOutputEntry | DevDiagnosticLogRecordEntry;
export interface DevDiagnosticSink {
    readonly path: string;
    /**
     * Project-relative reference with forward slashes on every platform:
     * it is a display and correlation token (transcript pointers,
     * `eve logs <ref>` input), not a filesystem path.
     */
    readonly displayPath: string;
    append(entry: DevDiagnosticEntry): void;
    close(): Promise<void>;
}
export interface CreateDevDiagnosticSinkOptions {
    readonly now?: () => Date;
    readonly pid?: number;
}
/** Creates the local, process-owned diagnostics file used by `eve dev`. */
export declare function createDevDiagnosticSink(appRoot: string, options?: CreateDevDiagnosticSinkOptions): Promise<DevDiagnosticSink>;
