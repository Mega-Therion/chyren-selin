import type { ConnectionProtocol } from "#runtime/connections/types.js";
/**
 * Stamps the wire protocol on a connection definition. Called by the
 * `define*` factory that produced it.
 */
export declare function stampConnectionProtocol(definition: object, protocol: ConnectionProtocol): void;
/**
 * Reads the stamped protocol from a connection definition, defaulting
 * to `"mcp"` when unstamped so connection modules authored before the
 * marker existed continue to compile as MCP connections.
 */
export declare function readConnectionProtocol(definition: unknown): ConnectionProtocol;
