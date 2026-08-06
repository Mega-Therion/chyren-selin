/**
 * The `eve dev` server child: forked `detached` (its own process group) and
 * bound to the CLI's lifetime through the IPC channel, never through the OS.
 *
 * Why the child is not bound to the parent at the OS level (shared process
 * group, inherited terminal signals):
 *
 * - The TUI puts stdin in raw mode, which disables ISIG: Ctrl+C never becomes
 *   a terminal-generated SIGINT, so same-group signal delivery does nothing in
 *   the mode where Ctrl+C matters most.
 * - In headless mode, same-group delivery would signal parent and child
 *   simultaneously, racing the parent's graceful IPC shutdown against the
 *   child's own signal handler.
 * - macOS has no parent-death signal. IPC `disconnect` is the portable
 *   equivalent: the child self-stops whenever this process exits, for any
 *   reason including SIGKILL (see local-server-child.ts).
 *
 * `detached` makes the child a process-group leader, so close() can escalate
 * to a group-wide SIGTERM/SIGKILL that reaps the entire server tree. Sandbox
 * resources leaked by a crash are reconciled by the cleanup-intent janitor on
 * the next run (see local-server-cleanup.ts).
 */
import type { DevelopmentServer, DevelopmentServerOptions } from "#internal/nitro/host/types.js";
/**
 * Worst-case close() duration. Must stay below the forced-exit backstop the
 * dev command arms on its lifecycle (FORCED_EXIT_BACKSTOP_MS in
 * `#cli/shutdown.js`), so a graceful close always beats the backstop and
 * `eve dev` exits 0 after Ctrl+C. Enforced by local-server-process.test.ts.
 */
export declare const DEV_SERVER_CLOSE_BUDGET_MS: number;
export interface DevelopmentServerProcess extends DevelopmentServer {
    wait(): Promise<void>;
}
/** Runs the CLI-owned local server outside the foreground TUI process. */
export declare function createDevelopmentServer(appRoot: string, options?: DevelopmentServerOptions): DevelopmentServerProcess;
