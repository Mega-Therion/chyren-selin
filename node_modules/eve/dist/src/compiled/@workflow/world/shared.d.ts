import { z } from '#compiled/zod/index.js';
export declare const zodJsonSchema: z.ZodType<unknown>;
/**
 * Options for paginated queries.
 * Provides control over page size and cursor-based navigation.
 */
export interface PaginationOptions {
    /** Maximum number of items to return (default varies by service, max: 1000) */
    limit?: number;
    /** Cursor for pagination - token from previous response */
    cursor?: string;
    sortOrder?: 'asc' | 'desc';
}
export declare const PageInfoSchema: z.ZodObject<{
    currentLookbackDays: z.ZodNumber;
    maxLookbackDays: z.ZodNumber;
    currentWindowStart: z.ZodCoercedDate<unknown>;
    maxWindowStart: z.ZodCoercedDate<unknown>;
    upgradeAvailable: z.ZodBoolean;
}, z.core.$strip>;
export type PageInfo = z.infer<typeof PageInfoSchema>;
export declare const PaginatedResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: z.ZodArray<T>;
    cursor: z.ZodNullable<z.ZodString>;
    hasMore: z.ZodBoolean;
    pageInfo: z.ZodOptional<z.ZodObject<{
        currentLookbackDays: z.ZodNumber;
        maxLookbackDays: z.ZodNumber;
        currentWindowStart: z.ZodCoercedDate<unknown>;
        maxWindowStart: z.ZodCoercedDate<unknown>;
        upgradeAvailable: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PaginatedResponse<T> = z.infer<ReturnType<typeof PaginatedResponseSchema<z.ZodType<T>>>>;
/**
 * Controls how much data is resolved in the response.
 * - "none": Returns minimal data with input: [] and output: undefined
 * - "all": Returns full data with complete input and output
 */
export type ResolveData = 'none' | 'all';
/**
 * A standard error schema shape for propogating errors from runs and steps
 */
export declare const StructuredErrorSchema: z.ZodObject<{
    message: z.ZodString;
    stack: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type StructuredError = z.infer<typeof StructuredErrorSchema>;
/**
 * A single chunk from a stream, with its 0-based index and raw binary data.
 */
export interface StreamChunk {
    /** The 0-based position of this chunk in the stream */
    index: number;
    /** The raw chunk data */
    data: Uint8Array;
}
/**
 * Options for paginated chunk retrieval.
 */
export interface GetChunksOptions {
    /** Maximum number of chunks to return per page (default: 100, max: 1000) */
    limit?: number;
    /** Opaque cursor from a previous response to fetch the next page */
    cursor?: string;
}
/**
 * Metadata about a stream, returned by {@link Streamer.getStreamInfo}.
 */
export interface StreamInfoResponse {
    /**
     * The index of the last known chunk (0-based).
     * Returns `-1` when no chunks have been written yet.
     */
    tailIndex: number;
    /** Whether the stream is fully complete (closed). */
    done: boolean;
}
/**
 * Paginated response for stream chunks.
 *
 * Extends the standard `PaginatedResponse` shape with a `done` field that
 * indicates whether the stream has been fully written (closed). When `done`
 * is `false`, additional chunks may appear in future requests even after
 * `hasMore` returns `false` for the current set of available chunks.
 */
export interface StreamChunksResponse {
    /** Array of stream chunks in index order */
    data: StreamChunk[];
    /** Cursor for the next page, or `null` when no more pages are available */
    cursor: string | null;
    /** Whether additional pages of already-written chunks exist */
    hasMore: boolean;
    /** Whether the stream is fully complete (all chunks have been written and the stream is closed) */
    done: boolean;
}
//# sourceMappingURL=shared.d.ts.map