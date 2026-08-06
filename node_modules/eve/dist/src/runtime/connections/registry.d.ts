import type { Approval } from "#public/definitions/approval.js";
import type { ResolvedConnectionDefinition } from "#runtime/types.js";
import type { ConnectionClient, ConnectionRegistry } from "#runtime/connections/types.js";
/**
 * Per-session container mapping connection names to lazily-initialized
 * client wrappers.
 *
 * The registry is protocol-agnostic: it dispatches to the client
 * implementation matching each connection's `protocol` (MCP or OpenAPI).
 */
export declare class ConnectionRegistryImpl implements ConnectionRegistry {
    #private;
    constructor(connections: readonly ResolvedConnectionDefinition[]);
    /**
     * Returns the client for the named connection, creating it on first
     * access. The connection's `protocol` selects the client type.
     */
    getClient(connectionName: string): ConnectionClient;
    /**
     * Returns the authored approval function for the named connection,
     * or `undefined` if the connection did not specify one.
     */
    getConnectionApproval(connectionName: string): Approval | undefined;
    /**
     * Returns all registered connection names.
     */
    getConnectionNames(): readonly string[];
    /**
     * Returns the resolved definitions for all connections.
     */
    getConnections(): readonly ResolvedConnectionDefinition[];
    /**
     * Closes all active client connections.
     */
    dispose(): Promise<void>;
}
