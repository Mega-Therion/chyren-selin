/**
 * Parses a fetched spec body as either JSON or YAML.
 *
 * JSON is tried first (the common case and fastest path); on a parse
 * failure the body is treated as YAML. YAML is parsed by wrapping the
 * document in front-matter delimiters so the bundled `gray-matter`
 * engine reads the whole file — the same approach the eval YAML loader
 * uses, avoiding a second YAML dependency.
 */
export declare function parseSpecDocument(text: string): unknown;
/**
 * Picks a base URL from an OpenAPI document.
 *
 * OpenAPI 3.x documents use `servers`; Swagger 2.0 documents use
 * `schemes`/`host`/`basePath`. Returns `undefined` when neither shape
 * yields an absolute HTTP(S) URL.
 */
export declare function extractServerUrl(document: Record<string, unknown>, specSource: string | Record<string, unknown> | undefined): string | undefined;
