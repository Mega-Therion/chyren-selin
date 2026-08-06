/** A path, query, header, or cookie parameter resolved from an operation. */
export interface OpenApiParameter {
    readonly name: string;
    readonly location: "path" | "query" | "header" | "cookie";
    readonly required: boolean;
    readonly schema: Record<string, unknown>;
    readonly description?: string;
}
/** A request body resolved from an operation. */
export interface OpenApiRequestBody {
    readonly required: boolean;
    readonly contentType: string;
    readonly schema: Record<string, unknown>;
}
/**
 * Builds the combined JSON Schema the model fills in: each path, query,
 * and header parameter becomes a top-level property; the request body
 * (when present) is nested under `body`.
 */
export declare function buildInputSchema(parameters: readonly OpenApiParameter[], requestBody: OpenApiRequestBody | undefined): Record<string, unknown>;
/** Resolves a single `$ref` node one hop; returns the node unchanged otherwise. */
export declare function deref(document: Record<string, unknown>, node: Record<string, unknown>): unknown;
/**
 * Deeply resolves local `$ref` pointers in a JSON Schema, truncating
 * `$ref` cycles and over-deep nesting so the result stays finite and
 * serializable.
 *
 * Truncation only ever happens at an **object** node — which is always a
 * schema position — by replacing it with an empty schema (`{}`). Scalars
 * (`type` strings, `required` entries, `enum` values) pass through
 * unchanged and arrays are always preserved as arrays, so array-valued
 * keywords like `oneOf`/`anyOf`/`allOf` and `type: [..., "null"]` keep
 * their shape. This keeps the output valid JSON Schema (draft 2020-12)
 * for strict model providers, while the depth bound prevents recursive
 * specs (e.g. Notion blocks) from expanding without limit.
 */
export declare function derefSchema(document: Record<string, unknown>, node: unknown, depth?: number, seen?: ReadonlySet<string>): unknown;
/** Narrows `unknown` to a readonly array, used pervasively when duck-typing spec nodes. */
export declare function isArray(value: unknown): value is readonly unknown[];
