import type { JsonObject } from "#shared/json.js";
/**
 * Parses a durable event-stream write failure raised by the workflow
 * runtime's stream transport into structured diagnostics, or returns
 * `null` when `error` is not such a failure.
 *
 * The harness emits every runtime event by writing to the workflow's
 * durable `getWritable()` stream, and those writes are flushed to the
 * workflow server over HTTP. Because the stream is consumed inside the
 * harness's model-call try/catch, a failed flush (timeout, 5xx) would
 * otherwise be misattributed to the model. This lets the harness label
 * it as the workflow-infrastructure failure it is and attach the
 * failing endpoint + platform error code as evidence.
 *
 * The returned object carries `operation` (`"write"`/`"close"`) and,
 * when present in the message, `statusCode`, `url` (the `PUT` target),
 * `vercelId` (`x-vercel-id`), and `vercelError` (`x-vercel-error`, e.g.
 * `"FUNCTION_INVOCATION_TIMEOUT"`).
 *
 * Walks the cause chain so a wrapped transport error is still detected.
 */
export declare function extractWorkflowStreamWriteErrorDetails(error: unknown): JsonObject | null;
/**
 * Returns `true` when `error` is a durable event-stream write failure
 * raised by the workflow runtime's stream transport, not by the model
 * provider. Thin predicate over
 * {@link extractWorkflowStreamWriteErrorDetails}.
 */
export declare function isWorkflowStreamWriteError(error: unknown): boolean;
