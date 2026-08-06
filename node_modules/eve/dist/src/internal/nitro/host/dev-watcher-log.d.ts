/**
 * The dev watcher's rebuild log line grammar. This module owns both sides of
 * the contract: the formatting used by `dev-authored-source-watcher.ts` to
 * print rebuild lifecycle lines, and the parsing the dev TUI uses to condense
 * those lines into one in-place status row. Keeping format and parse in one
 * file is what stops the two from drifting apart.
 */
/** One filesystem event reported by the authored-source watcher. */
export interface WatcherChangeEvent {
    readonly event: string;
    readonly path: string;
}
/** A rebuild lifecycle update parsed back out of one dev-server log line. */
export type DevRebuildLogUpdate = {
    kind: "rebuilding";
    events: WatcherChangeEvent[];
    more: number;
} | {
    kind: "failed";
    message: string;
} | {
    kind: "rebuilt";
} | {
    kind: "reloading";
};
export declare const AUTHORED_ARTIFACTS_UPDATED_LOG_LINE = "[eve:dev] authored artifacts updated.";
export declare const STRUCTURAL_RELOAD_LOG_LINE = "[eve:dev] structural change detected, reloading Nitro worker...";
/**
 * Formats the watcher's "change detected" line, e.g.
 * `[eve:dev] change detected (1 event: change agent/agent.ts), rebuilding
 * authored artifacts...`. Paths inside the app root display relative to it;
 * paths outside it stay absolute.
 */
export declare function formatChangeDetectedLogLine(appRoot: string, events: readonly WatcherChangeEvent[]): string;
/**
 * Recognizes one rebuild lifecycle line and returns its structured form, or
 * `undefined` for every other log line. The inverse of
 * {@link formatChangeDetectedLogLine} and the two line constants above.
 */
export declare function parseDevRebuildLogLine(line: string): DevRebuildLogUpdate | undefined;
