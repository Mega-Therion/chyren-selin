/**
 * A `docs:` line URL. The leading protocol is part of the type so call sites
 * can't accidentally pass a protocol-relative or bare path.
 */
export type DocsUrl = `https://${string}`;
declare const INSPECT_CUSTOM: unique symbol;
/**
 * Structured data for a framed error. The base class takes this and renders
 * it to plain text (for `.message` / `.stack` / structured logs) or to an
 * ANSI-framed string (for terminal display via `util.inspect` / `toString`).
 *
 * Keeping the pieces structured means we never have to strip ANSI back out
 * once it's in the message — we just don't put it there in the first place.
 */
export interface FramedContent {
    /** Headline. `{ code: 'foo()' }` segments render as backticked inline code. */
    readonly title: readonly Segment[];
    /** One framed branch per entry. The last uses `╰▶`, others use `├▶`. */
    readonly details: readonly Detail[];
}
export type Segment = {
    readonly text: string;
} | {
    readonly code: string;
} | {
    readonly dim: string;
};
export type Detail = {
    readonly type: 'plain';
    readonly segments: readonly Segment[];
} | {
    readonly type: 'docs';
    readonly url: DocsUrl;
};
export declare function renderPlain(c: FramedContent): string;
export declare function renderPretty(c: FramedContent): string;
/**
 * Base class for structured context-violation errors.
 *
 * Design notes:
 *
 * - `.message` is **plain text** (no ANSI escape bytes). Structured logs,
 *   log drains, CBOR-serialized event data, and anything else that reads
 *   `err.message` / `err.stack` as a string gets clean output — no mojibake
 *   in JSON, no `\x1B[...m` noise in Vercel logs.
 *
 * - The ANSI-framed version is rendered **lazily** via `toString()` and
 *   `[util.inspect.custom]`. When the error is thrown and Node prints it
 *   via `util.inspect`, the user sees the colored, framed box. When it's
 *   attached to a structured log field, the consumer sees plain text.
 *
 * - `fatal = true` marks these as non-retryable. Calling `createHook()`
 *   from a step function will never succeed no matter how many retries —
 *   burning attempts just produces duplicated log output. The runtime's
 *   `FatalError.is(err)` gate recognizes any error with `fatal: true`.
 */
export declare abstract class ContextViolationError extends Error {
    #private;
    /** Non-retryable — see class doc. */
    readonly fatal = true;
    constructor(content: FramedContent);
    /**
     * `console.log(err)` and most Node internals route through `util.inspect`,
     * which respects this symbol. Returning a custom string here means the
     * thrown error prints as a pretty frame in the terminal while `.message`
     * and `.stack` stay plain.
     */
    [INSPECT_CUSTOM](): string;
    toString(): string;
}
/**
 * Thrown when an API that must run inside a workflow function is called
 * from outside a workflow context (e.g. from a step function or from
 * regular application code).
 */
export declare class NotInWorkflowContextError extends ContextViolationError {
    name: string;
    constructor(functionName: string, docsUrl: DocsUrl);
}
/**
 * Thrown when an API that must run inside a step function is called from
 * outside a step context.
 */
export declare class NotInStepContextError extends ContextViolationError {
    name: string;
    constructor(functionName: string, docsUrl: DocsUrl);
}
/**
 * Thrown when an API that must run inside either a workflow or step function
 * is called from regular application code.
 */
export declare class NotInWorkflowOrStepContextError extends ContextViolationError {
    name: string;
    constructor(functionName: string, docsUrl: DocsUrl);
}
export {};
//# sourceMappingURL=context-violation-error.d.ts.map