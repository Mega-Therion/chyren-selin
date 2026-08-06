/**
 * Environment facts captured once per `eve dev` process, written into the
 * diagnostic dump so a shared log always travels with the toolchain state
 * that produced it.
 */
export interface DevEnvironmentInfo {
    readonly eveVersion: string;
    readonly nodeVersion: string;
    readonly platform: string;
    readonly vercelCliVersion?: string;
    readonly vercelCliPath?: string;
    /** Local durable session store measurements; absent when the directory does not exist yet. */
    readonly sessionsDirectory?: {
        readonly path: string;
        readonly files: number;
        readonly bytes: number;
    };
}
/**
 * Aggregate counters for the TUI process's session activity. Reported by
 * the renderer at each turn boundary so the dump stays current even if
 * the process dies mid-session.
 */
export interface DevSessionStats {
    readonly prompts: number;
    readonly inputTokens: number;
    readonly outputTokens: number;
    /** Tool invocations observed, keyed by tool name. */
    readonly toolCalls: Readonly<Record<string, number>>;
    /** Distinct subagent dispatches that produced observable output. */
    readonly subagents: number;
}
export interface DevDiagnosticDump {
    readonly path: string;
    /** Project-relative reference, forward slashes on every platform. */
    readonly displayPath: string;
    updateSessionStats(stats: DevSessionStats): void;
    close(): Promise<void>;
}
export interface CreateDevDiagnosticDumpOptions {
    /** Injectable environment collector; defaults to {@link collectDevEnvironmentInfo}. */
    readonly environment?: () => Promise<DevEnvironmentInfo>;
    readonly now?: () => Date;
}
/**
 * Creates the environment dump paired with one dev diagnostic log: the same
 * instance name with a `.dump` extension. The environment section is
 * collected in the background and written as soon as it resolves; session
 * stats rewrite the file on every update. Like the log sink, write failures
 * disable the dump silently — never through stderr, which the TUI captures.
 */
export declare function createDevDiagnosticDump(appRoot: string, logPath: string, options?: CreateDevDiagnosticDumpOptions): DevDiagnosticDump;
/** Collects the real environment facts for {@link createDevDiagnosticDump}. */
export declare function collectDevEnvironmentInfo(appRoot: string): Promise<DevEnvironmentInfo>;
/**
 * Counts files and total bytes under the app's local durable session store
 * (`.eve/.workflow-data`). Returns `undefined` when the directory does not
 * exist yet.
 */
export declare function measureSessionsDirectory(appRoot: string): Promise<DevEnvironmentInfo["sessionsDirectory"]>;
