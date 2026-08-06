/**
 * The options for {@link getWritable}.
 */
export interface WorkflowWritableStreamOptions {
    /**
     * An optional namespace to distinguish between multiple streams associated
     * with the same workflow run.
     */
    namespace?: string;
}
/**
 * Retrieves a writable stream that is associated with the current workflow.
 *
 * The writable stream is intended to be used within step functions to write
 * data that can be read outside the workflow by using the readable method of getRun.
 *
 * @param options - Optional configuration for the writable stream
 * @returns The writable stream associated with the current workflow run
 * @throws Error if called outside a workflow or step function
 */
export declare function getWritable<W = any>(options?: WorkflowWritableStreamOptions): WritableStream<W>;
//# sourceMappingURL=writable-stream.d.ts.map