type Format = "html" | "markdown" | "text";
/**
 * Typed input accepted by {@link executeWebFetchTool}.
 */
export interface WebFetchInput {
    readonly format?: Format;
    readonly timeout?: number;
    readonly url: string;
}
/** Per-call options accepted by {@link executeWebFetchTool}. */
export interface WebFetchExecuteOptions {
    /** Signal combined with the request timeout. */
    readonly abortSignal?: AbortSignal;
}
/**
 * Structured result returned from {@link executeWebFetchTool}.
 */
export interface WebFetchResult {
    /** Response body, bounded to the shared tool-output limits. */
    readonly content: string;
    /** Response `Content-Type` header. */
    readonly contentType: string;
    /** Fetched URL. */
    readonly url: string;
    /** True when {@link content} was shortened to fit the output budget. */
    readonly truncated: boolean;
}
/**
 * Executes the `web_fetch` framework tool.
 *
 * Fetches the content at the given URL and returns it in the requested
 * format. HTML responses are automatically converted to Markdown or
 * plain text when the caller requests those formats. Responses up to
 * 5 MB are accepted, and the returned {@link WebFetchResult.content}
 * is capped at the shared tool-output budget (50 KB / 2000 lines) so
 * large pages do not exhaust the model's context window.
 */
export declare function executeWebFetchTool(args: WebFetchInput, options?: WebFetchExecuteOptions): Promise<WebFetchResult>;
export {};
