/**
 * Framework-internal structured logger.
 *
 * Not public API; authors should use their own logger or Vercel
 * observability primitives.
 */
import { type Span } from "#compiled/@opentelemetry/api/index.js";
import type { JsonObject } from "#shared/json.js";
/**
 * Severity level for a single log record.
 *
 * Exposed so the logger API is composable with future sinks that want
 * to filter or route by severity.
 */
export type LogLevel = "debug" | "info" | "warn" | "error";
/**
 * Extra structured context attached to a log record.
 *
 * Values that are Errors are normalized through {@link formatError}
 * before rendering, so a caller can pass `{ error }` and the full
 * cause chain will flow through to the sink.
 */
type LogFields = Readonly<Record<string, unknown>>;
/**
 * One namespaced logger handle. Returned by {@link createLogger}.
 *
 * Every method accepts an optional {@link LogFields} record of extra
 * key/value pairs to attach to the rendered line. Callers that want to
 * associate related lines should pass the same `errorId` on each call.
 */
export interface Logger {
    debug(message: string, fields?: LogFields): void;
    info(message: string, fields?: LogFields): void;
    warn(message: string, fields?: LogFields): void;
    error(message: string, fields?: LogFields): void;
}
/**
 * Builds a logger bound to a stable namespace (e.g. `"slack.route"` or
 * `"harness.tool-loop"`). The namespace appears in every rendered line
 * and is threaded through to OTel span events so a single grep can
 * correlate structured logs with traces.
 */
export declare function createLogger(namespace: string): Logger;
/**
 * Logs any throwable at `error` severity with its full {@link formatError}
 * representation, and returns the correlated `errorId`.
 *
 * Prefer over `logger.error(message, { error })` at `catch` sites where the
 * caught value is `unknown`: it also normalizes non-`Error` throwables (e.g.
 * plain objects that crossed a workflow step boundary) that the bare logger
 * would otherwise emit without a `detail` dump.
 */
export declare function logError(logger: Logger, message: string, error: unknown, fields?: LogFields): string;
/**
 * Generates a stable, opaque identifier for one error instance.
 *
 * The same identifier should be included in every log line associated
 * with a given failure and in the user-visible error message so a
 * support ticket that quotes the id can be grepped back to a single
 * incident. Uses `crypto.randomUUID()` for uniqueness; callers should
 * not rely on the format beyond opacity.
 */
export declare function createErrorId(): string;
/**
 * Normalizes an unknown throwable into a JSON-serializable summary.
 *
 * Pins `name` and `message` as first-class fields because OTel
 * conventions index them directly, and renders the full `util.inspect`
 * dump (cause chain included) into `detail` so upstream provider
 * `responseBody`, gateway `statusCode`, and any other enumerable
 * fields surface for log aggregators without per-subclass plumbing.
 *
 * Accepts either a raw throwable or an existing `{ errorId }` wrapper
 * so repeated logs can share one identifier.
 */
export declare function formatError(error: unknown, errorId?: string): JsonObject;
/**
 * Pulls the correlated `errorId` off a `step.failed` / `turn.failed`
 * / `session.failed` event's `details` payload (or any other shape
 * produced by {@link formatError}). Returns `undefined` when the
 * sender did not attach one (older cascades, non-model-call error
 * paths that predate the shared format).
 *
 * The inverse-reader of {@link formatError}. Channels that surface
 * user-visible error text use it to embed a correlation id so a
 * support ticket quoting the id can be grepped back to one incident.
 */
export declare function extractErrorId(details: unknown): string | undefined;
/**
 * Formats an "in parentheses" hint summarizing a failed-event payload
 * for user-visible display. Returns an empty string when neither the
 * structured error name nor message is useful.
 */
export declare function formatErrorHint(event: {
    readonly message?: string;
    readonly details?: unknown;
}): string;
/**
 * Records an error on an OTel span and sets the span status to ERROR.
 *
 * Exposed for call sites that already have a span in hand (the harness
 * turn span). The logger itself also records on the *active* span when
 * `.error()` is called, so direct use is only necessary when a specific
 * non-active span should be annotated.
 */
export declare function recordErrorOnSpan(span: Span, error: unknown): void;
/** Returns whether the current threshold emits `level`. */
export declare function isLogLevelEnabled(level: LogLevel): boolean;
/**
 * One structured log record, as delivered to the process-wide subscriber
 * registered via {@link setLogRecordSubscriber}. `fields` carries the
 * {@link renderFields} projection — Errors already replaced by their
 * `formatError` shape — so subscribers receive JSON, never live objects.
 */
export interface LogRecord {
    readonly level: LogLevel;
    readonly namespace: string;
    readonly message: string;
    readonly fields?: JsonObject;
}
/**
 * Registers the process-wide structured log subscriber, replacing any
 * previous one; pass `undefined` to restore plain console output.
 *
 * A registered subscriber takes ownership of rendering: records it
 * handles skip the console entirely, so a host that both displays and
 * persists logs (the dev TUI, which would otherwise scrape its own
 * console output back off stderr) sees each record exactly once, still
 * structured. If the subscriber throws, the record falls through to the
 * console so a broken subscriber can never swallow logs. Single slot by
 * design — one interactive host per process.
 */
export declare function setLogRecordSubscriber(subscriber: ((record: LogRecord) => void) | undefined): void;
/**
 * Renders a throwable's full cause chain via `util.inspect`, bounded to
 * the logger's inline-detail budget. Exported for callers that route a
 * raw error into a diagnostic sink outside a log record (the dev TUI's
 * client-side stream-error capture).
 */
export declare function inspectError(error: unknown): string;
export {};
