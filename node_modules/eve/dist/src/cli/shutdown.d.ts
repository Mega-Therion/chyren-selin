/**
 * How long a stop request may run before the process force-exits, passed as
 * `exitAfterMs` by commands that own child resources. Cleanup owners must
 * finish inside this budget — see DEV_SERVER_CLOSE_BUDGET_MS in
 * `#cli/dev/local-server-process.js`.
 */
export declare const FORCED_EXIT_BACKSTOP_MS = 900;
export interface CommandLifecycle {
    readonly signal: AbortSignal;
    readonly stopped: Promise<NodeJS.Signals | undefined>;
    /** Temporarily gives SIGINT and SIGTERM to an inherited-stdio subprocess. */
    withTerminalLease?<T>(task: () => Promise<T>): Promise<T>;
    requestStop(): void;
    dispose(): void;
}
/** Owns SIGINT/SIGTERM listeners for one running CLI command. */
export declare function installShutdownSignal(input?: {
    readonly exitAfterMs?: number;
    readonly onStop?: () => void;
}): CommandLifecycle;
/** Waits for a signal, or until the owned server stops on its own. */
export declare function waitForShutdownSignal(input: {
    readonly close: () => Promise<void>;
    readonly wait?: () => Promise<void>;
}): Promise<void>;
