/**
 * One session event read back from the local workflow store, shaped like a
 * diagnostic-log line so `eve logs --events` output stays one uniform JSONL
 * stream: `at` and `source` first, then the event identity and payload.
 */
export interface DevSessionEventLine {
    readonly at: string;
    readonly source: "event";
    readonly runId: string;
    readonly type: string;
    readonly data?: unknown;
}
/** Time window (inclusive) of events to resolve, in wall-clock event time. */
export interface DevSessionEventWindow {
    readonly from: Date;
    readonly to: Date;
}
/**
 * Reads session events for one diagnostic-log window from the local
 * workflow store (`.eve/.workflow-data`), at query time — nothing is
 * duplicated at capture time.
 *
 * Runs are enumerated through the vendored Workflow World API and each
 * run's default stream is decoded through `Run.getReadable()` — the same
 * vendored read path the dev server uses to serve session streams over
 * HTTP — never by touching the store's private chunk encoding. The world
 * is opened for storage reads only: `start()` is never called, so queue
 * redelivery cannot be triggered by a CLI read, and unclosed streams
 * (crashed processes) are drained with an idle-timeout cancel instead of
 * waiting for chunks that will never arrive.
 *
 * Returns an empty list when the store does not exist. Selection is by
 * time window: events from any `eve dev` process in the window are
 * included, since the store does not attribute runs to processes.
 */
export declare function readDevSessionEvents(appRoot: string, window: DevSessionEventWindow): Promise<DevSessionEventLine[]>;
