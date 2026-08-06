import type { SpanProcessor } from "#compiled/@vercel/otel/index.js";
/** Resolves the directory holding one trace per subdirectory. */
export declare function resolveLocalTraceSchemaDirectory(appRoot: string): string;
/**
 * Resolves the directory holding one trace's span segments.
 *
 * Segments are added, never rewritten, so this directory's mtime is the instant
 * the trace last received a span.
 */
export declare function resolveLocalTraceSegmentsDirectory(appRoot: string, traceId: string): string;
/** Persists spans from agent-owned traces as immutable OTLP/JSON segments. */
export declare class LocalTraceSpanProcessor implements SpanProcessor {
    #private;
    constructor(appRoot: string);
    forceFlush(): Promise<void>;
    onStart(): void;
    onEnd(span: unknown): void;
    shutdown(): Promise<void>;
}
