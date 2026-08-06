import type { McpClientConnectionDefinition } from "#public/definitions/connections/mcp.js";
import type { OpenAPIConnectionDefinition } from "#public/definitions/connections/openapi.js";
/**
 * Validates one authored MCP client connection module export at build time
 * and returns the public definition type. The module export is `unknown`
 * because it comes from a dynamically-loaded authored file; this function
 * bridges the gap with runtime checks so authoring errors surface during
 * `eve build`.
 */
export declare function normalizeMcpClientConnectionDefinition(value: unknown, message: string): McpClientConnectionDefinition;
/**
 * Validates one authored OpenAPI connection module export at build time
 * and returns the public definition type. Mirrors
 * {@link normalizeMcpClientConnectionDefinition} but validates the
 * OpenAPI-specific `spec`/`baseUrl`/`operations` fields and reuses the
 * shared auth and headers validation.
 */
export declare function normalizeOpenApiConnectionDefinition(value: unknown, message: string): OpenAPIConnectionDefinition;
