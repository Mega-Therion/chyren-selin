import { type MCPClient } from "#compiled/@ai-sdk/mcp/index.js";
import type { ToolSet } from "ai";
import type { ResolvedConnectionDefinition } from "#runtime/types.js";
import type { ConnectionClient, ConnectionToolExecuteOptions, ConnectionToolMetadata, ToolFilterDefinition } from "#runtime/connections/types.js";
/**
 * Wraps one `MCPClient` from `@ai-sdk/mcp` for a single connection.
 *
 * Created lazily per-connection per-session. Caches tool metadata after
 * the first `getToolMetadata()` call.
 */
export declare class McpConnectionClient implements ConnectionClient {
    #private;
    constructor(connection: ResolvedConnectionDefinition);
    /**
     * Connects to the MCP server, trying Streamable HTTP first and
     * falling back to SSE for transport-compatibility failures.
     *
     * Concurrent callers share the same connection promise to avoid
     * duplicate connections.
     */
    connect(): Promise<MCPClient>;
    /**
     * Returns cached tool metadata for all tools this connection exposes,
     * after applying any configured tool filter.
     *
     * The first call fetches tools from the server via `listTools()` and
     * creates the AI SDK tool set in parallel. Subsequent calls return
     * the cached result. Concurrent callers share the same in-flight
     * promise.
     */
    getToolMetadata(): Promise<readonly ConnectionToolMetadata[]>;
    /**
     * Returns the AI SDK `ToolSet` produced by `@ai-sdk/mcp`'s
     * `toolsFromDefinitions()`. Each entry is a full SDK `Tool` with
     * `inputSchema`, `description`, and `execute` already set.
     */
    getTools(): Promise<ToolSet>;
    /**
     * Executes a named tool through the AI SDK's tool executor, which
     * handles the JSON-RPC `tools/call` internally.
     *
     * A `401`/`invalid_token` from the remote server is translated into
     * {@link ConnectionAuthorizationRequiredError} via {@link #rethrowClassified}
     * so callers re-enter the authorization flow instead of surfacing an
     * opaque transport error.
     */
    executeTool(toolName: string, args: unknown, options?: ConnectionToolExecuteOptions): Promise<unknown>;
    close(): Promise<void>;
}
/**
 * Returns `true` when an error from the MCP transport indicates the
 * bearer was rejected by the remote server — an HTTP `401`. Per
 * RFC 6750 a `401` means the access token is missing, expired, or
 * revoked, all of which are recoverable by re-authorizing. (A `403`
 * is an insufficient-scope / permission problem and is intentionally
 * left to propagate, since re-running the same grant would not help.)
 */
export declare function isMcpAuthRequiredError(error: unknown): boolean;
/**
 * Returns `true` when a tool name passes the configured filter.
 */
export declare function passesToolFilter(toolName: string, filter: Readonly<ToolFilterDefinition> | undefined): boolean;
/**
 * Merges `authorization` (Bearer token) and `headers` into one
 * flat `Record<string, string>` for the transport layer.
 *
 * Resolves dynamic `auth` and `headers` callbacks with the active
 * {@link SessionContext}, then resolves the {@link ConnectionPrincipal}
 * and invokes `authorization.getToken({ principal })` to produce the bearer.
 * `getToken` may throw {@link ConnectionAuthorizationRequiredError};
 * callers (`connection_search`, wrapped connection tools) catch it
 * and it propagates as-is from here.
 */
export declare function resolveHeaders(connection: ResolvedConnectionDefinition): Promise<Record<string, string>>;
