/**
 * Live reader over the local trace spool for the `/traces` viewer.
 *
 * The spool's segments are immutable — one file per span, written atomically,
 * never rewritten — so reads cache parsed spans by span id and only parse
 * files that appeared since the last poll. Listing stats directories instead
 * of parsing spans, keeping a 1s poll cheap even with a large spool.
 */
import type { LocalTrace } from "#tracing/local-trace-reader.js";
export interface TraceStoreEntry {
    readonly traceId: string;
    /** Mtime of the trace's segments directory — the instant it last received a span. */
    readonly lastActivityMs: number;
}
export interface TraceStore {
    /** Lists stored traces, most recent activity first. */
    list(): Promise<readonly TraceStoreEntry[]>;
    /**
     * Reads one trace, parsing only segments not seen by earlier reads.
     * Returns `undefined` when the trace is missing or has no valid spans
     * (e.g. retention pruned it between list and read).
     */
    read(traceId: string): Promise<LocalTrace | undefined>;
}
export declare function createTraceStore(options: {
    readonly appRoot: string;
}): TraceStore;
