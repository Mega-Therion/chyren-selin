/**
 * Reads the local trace spool written by {@link LocalTraceSpanProcessor}.
 *
 * The spool is the contract between the dev-time writer and every viewer
 * (`eve traces`, the TUI trace viewer): one directory per trace under
 * `.eve/traces/v1/<traceId>/segments/`, one immutable OTLP/JSON file per
 * span. Parsing is defensive end to end — malformed or oversized segments
 * are skipped so a partial write never breaks a view.
 */
export interface LocalTraceSpanEvent {
    readonly attributes: Readonly<Record<string, unknown>>;
    readonly name: string;
    readonly timeNs: bigint;
}
export interface LocalTraceSpan {
    readonly attributes: Readonly<Record<string, unknown>>;
    readonly endTimeNs: bigint;
    readonly events: readonly LocalTraceSpanEvent[];
    /** OTLP span kind (1 internal … 5 consumer); undefined when absent. */
    readonly kind?: number;
    readonly name: string;
    readonly parentSpanId?: string;
    readonly scope?: string;
    readonly spanId: string;
    readonly startTimeNs: bigint;
    readonly statusCode: number;
    /** Message carried by an ERROR status, when the span recorded one. */
    readonly statusMessage?: string;
    readonly traceId: string;
}
export interface LocalTrace {
    readonly agentName?: string;
    readonly endTimeNs: bigint;
    /** Session that opened the trace, which is the one the list shows. */
    readonly sessionId?: string;
    /**
     * Every session recorded in the trace, opener first.
     *
     * A subagent child records into the window its parent had open, so one
     * trace can hold several sessions and any of their ids resolves to it.
     */
    readonly sessionIds: readonly string[];
    readonly spans: readonly LocalTraceSpan[];
    readonly startTimeNs: bigint;
    readonly traceId: string;
    /** Zero-based session window this trace holds, when the spans record one. */
    readonly window?: number;
}
/**
 * Trace ids held by the spool, unordered. Empty when nothing has been written
 * yet; any other read fault propagates.
 */
export declare function listLocalTraceIds(appRoot: string): Promise<string[]>;
/**
 * Instant one trace last received a span, or `undefined` once retention has
 * pruned it. Reads the segments directory's mtime, so it stays cheap enough to
 * poll a large spool without parsing any span.
 */
export declare function readLocalTraceActivityMs(appRoot: string, traceId: string): Promise<number | undefined>;
/**
 * Segment file names of one trace in read order, or `undefined` when the trace
 * is gone. Segments are immutable and named for their span, so the order is
 * stable across reads and a caller can treat names it has seen as parsed.
 */
export declare function listLocalTraceSegments(appRoot: string, traceId: string): Promise<string[] | undefined>;
/**
 * Spans held by one segment file. An oversized, unreadable, or malformed
 * segment yields none, so a partial write never breaks a view.
 */
export declare function readLocalTraceSegment(appRoot: string, traceId: string, fileName: string): Promise<LocalTraceSpan[]>;
/** Reads valid local traces, newest first, while ignoring malformed segments. */
export declare function listLocalTraces(appRoot: string): Promise<LocalTrace[]>;
/** Sorts spans into timeline order: start, then end, then a stable tiebreak. */
export declare function compareLocalTraceSpans(left: LocalTraceSpan, right: LocalTraceSpan): number;
/** Builds a trace from already-parsed spans, deriving summary fields. */
export declare function assembleLocalTrace(traceId: string, spans: readonly LocalTraceSpan[]): LocalTrace;
/**
 * Extracts short human-facing details from a span's structural attributes
 * (turn id, step index/attempt, action kind/name, model id) for one-line
 * span labels. Raw values — callers sanitize for their output surface.
 */
export declare function describeLocalTraceSpan(span: LocalTraceSpan): string[];
/** Parses one OTLP/JSON segment file into spans belonging to `expectedTraceId`. */
export declare function parseLocalTraceSegment(content: string, expectedTraceId: string): LocalTraceSpan[];
