import { type ToolSet } from "ai";
import type { ResolvedConnectionDefinition } from "#runtime/types.js";
import { type OpenApiOperation } from "#runtime/connections/openapi-operations.js";
import type { ConnectionClient, ConnectionToolExecuteOptions, ConnectionToolMetadata } from "#runtime/connections/types.js";
interface OpenApiToolCache {
    readonly metadata: readonly ConnectionToolMetadata[];
    readonly operations: ReadonlyMap<string, OpenApiOperation>;
    readonly tools: ToolSet;
    readonly baseUrl: string;
}
/**
 * Result of executing an OpenAPI operation. Returned to the model as the
 * tool result so it can react to the status and body of any response,
 * including non-2xx responses.
 */
export interface OpenApiToolResult {
    readonly status: number;
    readonly statusText: string;
    readonly body: unknown;
}
/**
 * A {@link ConnectionClient} that turns an OpenAPI 3.x or Swagger 2.0
 * document into connection tools.
 *
 * Created lazily per-connection per-session. On first use it loads the
 * document (fetching it when `spec` is a URL), dereferences local
 * `$ref` pointers, and maps each operation to a tool whose name is the
 * operation's `operationId`. Tool calls reconstruct the HTTP request —
 * substituting path parameters, appending query parameters, attaching
 * resolved auth and headers — and return the response as a serializable
 * `{ status, statusText, body }`.
 */
export declare class OpenApiConnectionClient implements ConnectionClient {
    #private;
    constructor(connection: ResolvedConnectionDefinition);
    /** Loads and parses the OpenAPI document, sharing one in-flight load. */
    connect(): Promise<OpenApiToolCache>;
    getToolMetadata(): Promise<readonly ConnectionToolMetadata[]>;
    getTools(): Promise<ToolSet>;
    executeTool(toolName: string, args: unknown, options?: ConnectionToolExecuteOptions): Promise<OpenApiToolResult>;
    close(): Promise<void>;
}
export {};
