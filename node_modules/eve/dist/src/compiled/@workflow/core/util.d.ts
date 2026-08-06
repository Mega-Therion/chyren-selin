/**
 * Builds a workflow suspension log message based on the counts of steps,
 * hooks, and waits. The structured logger attaches the run context, so the
 * message itself only describes what's being enqueued.
 * @param stepCount - Number of steps to be enqueued
 * @param hookCount - Number of hooks to be enqueued
 * @param waitCount - Number of waits to be enqueued
 * @returns The formatted log message or null if all counts are 0
 */
export declare function buildWorkflowSuspensionMessage(stepCount: number, hookCount: number, waitCount: number): string | null;
/**
 * Generates a stream ID for a workflow run.
 * User-defined streams include a "user" segment for isolation from future system-defined streams.
 * Namespaces are base64-encoded to handle characters not allowed in Redis key names.
 *
 * @param runId - The workflow run ID
 * @param namespace - Optional namespace for the stream
 * @returns The stream ID in format: `strm_{ULID}_user_{base64(namespace)?}`
 */
export declare function getWorkflowRunStreamId(runId: string, namespace?: string): string;
/**
 * Generate a stream ID for an abort signal's backing stream.
 * Uses the "_system_abort" namespace to isolate from user-defined streams.
 *
 * @param id - A unique identifier (typically a ULID)
 * @returns The stream ID in format: `strm_{id}_system_abort`
 */
export declare function getAbortStreamId(id: string): string;
/**
 * Derive the abort stream name from a hook token.
 * Hook tokens use the format `abrt_{id}`, and the corresponding stream is
 * `strm_{id}_system_abort`.
 */
export declare function getAbortStreamIdFromToken(hookToken: string): string;
//# sourceMappingURL=util.d.ts.map