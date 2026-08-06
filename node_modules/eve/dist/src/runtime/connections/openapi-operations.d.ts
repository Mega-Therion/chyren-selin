import type { OpenApiParameter, OpenApiRequestBody } from "#runtime/connections/openapi-schema.js";
import type { SecurityPlacement } from "#runtime/connections/openapi-security.js";
/** HTTP methods OpenAPI defines operations for. */
export declare const HTTP_METHODS: readonly ["get", "put", "post", "delete", "patch", "head", "options"];
export type HttpMethod = (typeof HTTP_METHODS)[number];
/** Internal descriptor for one resolved OpenAPI operation. */
export interface OpenApiOperation {
    readonly toolName: string;
    readonly method: HttpMethod;
    readonly pathTemplate: string;
    readonly description: string;
    readonly parameters: readonly OpenApiParameter[];
    readonly requestBody: OpenApiRequestBody | undefined;
    readonly inputSchema: Record<string, unknown>;
    readonly security: SecurityPlacement | undefined;
}
/**
 * Derives a tool name for an operation that is legal for model providers.
 *
 * Provider tool-name rules (Anthropic, OpenAI) only permit
 * `[a-zA-Z0-9_-]`, so an `operationId` is sanitized rather than used
 * verbatim — characters like dots or slashes (common in real specs)
 * would otherwise be rejected and break the whole connection. Operations
 * without an `operationId` get a deterministic `<method>_<path>` name.
 */
export declare function operationName(operation: Record<string, unknown>, method: HttpMethod, pathTemplate: string): string;
/** Disambiguates a tool name against names already used in the same connection. */
export declare function uniqueName(name: string, used: Set<string>): string;
/** Picks a human description for an operation, preferring `summary` over `description`. */
export declare function operationDescription(operation: Record<string, unknown>): string;
