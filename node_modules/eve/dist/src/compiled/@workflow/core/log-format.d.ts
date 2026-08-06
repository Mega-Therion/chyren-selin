/**
 * Structured-log composition for `console.error` / `console.warn`. Emits
 * one string in three sections so the most useful information is at the
 * top, stack trace at the bottom:
 *
 *     [workflow-sdk] <framing line>
 *       user error · FatalError
 *       run    wrun_…
 *       step   step_… · add (./workflows/x)
 *       hint:  Move the call to a step function.
 *     FatalError: …
 *         at … (trimmed stack — internals collapsed)
 *
 * Without this composition, callers passing `${framing}\n${stack}` as the
 * message and structured fields as the metadata object got `util.inspect`'s
 * default object dump appended *after* the stack, which buries the run ID
 * and attribution badge under 30+ lines of `node_modules/.pnpm/...` frames.
 *
 * The same metadata is also emitted as structured OTel span events from
 * the logger itself, so backends that want JSON-shaped data still get it.
 * web/web-shared do not consume stderr at all — they read CBOR/JSON event
 * payloads from the World event log.
 */
export declare function composeLogLine(prefix: string, message: string, metadata: Record<string, unknown> | undefined): string;
//# sourceMappingURL=log-format.d.ts.map