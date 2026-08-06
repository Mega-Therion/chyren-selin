/**
 * Build-time catalog of known eve connections. Each entry drives both the
 * `eve connections add` picker and the per-entry scaffold template.
 *
 * Connection *identity* (slug, label, transport, description) is owned by
 * `@eve/catalog`, the cross-surface source of truth shared with the
 * docs gallery. This module overlays the scaffolder-only concern — the Connect
 * auth spec to emit — and shapes the result into {@link ConnectionCatalogEntry}.
 *
 * Phase 1 ships MCP-only scaffolding plus a "custom" escape hatch. OpenAPI
 * entries can be scaffolded later by widening {@link SUPPORTED_PROTOCOLS}, with
 * no command-surface change.
 */
import { type ConnectionProtocol } from "@eve/catalog";
/** Wire protocol a connection speaks at runtime. */
export type { ConnectionProtocol };
/** Protocols the scaffolder can currently emit. */
export declare const SUPPORTED_PROTOCOLS: readonly ConnectionProtocol[];
/** Maps an outgoing request header to the environment variable that supplies it. */
export interface EnvHeader {
    /** Header sent to the connection endpoint (e.g. `DD-API-KEY`). */
    header: string;
    /** Environment variable that holds the value (e.g. `DD_API_KEY`). */
    envVar: string;
}
/** How a scaffolded connection authenticates to its endpoint. */
export type ConnectionAuthSpec = 
/**
 * Vercel Connect-managed OAuth via `connect(<connector>)`.
 *
 * `connector` is the value written into the generated `connect("…")` call.
 * It starts as a placeholder and is rewritten to the real connector UID once
 * the connector is provisioned (see {@link service}). `service` is the
 * managed-connector identifier passed to `vercel connect create <service>`
 * (e.g. `mcp.linear.app`); when omitted, eve falls back to the MCP endpoint
 * host. It is distinct from the connector UID, which Vercel assigns when the
 * connector is created or listed.
 */
{
    kind: "connect";
    connector: string;
    service?: string;
}
/** Static bearer token read from a single environment variable. */
 | {
    kind: "bearer-env";
    envVar: string;
}
/** Static credentials passed as one or more request headers. */
 | {
    kind: "header";
    headers: readonly EnvHeader[];
}
/** No auth (public or locally-trusted endpoints). */
 | {
    kind: "none";
};
/** Per-protocol endpoint configuration. */
export interface McpEndpoint {
    url: string;
}
export interface OpenApiEndpoint {
    spec: string;
    baseUrl?: string;
}
/** A known connection the picker can scaffold without further input. */
export interface ConnectionCatalogEntry {
    /** File name + runtime connection name (e.g. `linear`). */
    slug: string;
    /** Human label shown in the picker (e.g. `Linear`). */
    label: string;
    /** Short qualifier shown next to the label (e.g. `OAuth via Connect`). */
    hint?: string;
    /** Protocols this service supports. */
    protocols: readonly ConnectionProtocol[];
    /** Description written into the generated definition. */
    description: string;
    /** MCP endpoint, present iff `"mcp"` is in {@link protocols}. */
    mcp?: McpEndpoint;
    /** OpenAPI endpoint, present iff `"openapi"` is in {@link protocols}. */
    openapi?: OpenApiEndpoint;
    /** Authentication strategy emitted into the template. */
    auth: ConnectionAuthSpec;
}
/** Free-form connection supplied through the custom picker option. */
export interface CustomConnectionInput {
    slug: string;
    description: string;
    protocols: readonly ConnectionProtocol[];
    mcp?: McpEndpoint;
    openapi?: OpenApiEndpoint;
    auth?: ConnectionAuthSpec;
}
/** Sentinel picker value for the "Custom connection" option. */
export declare const CUSTOM_CONNECTION_SLUG = "custom";
export declare const CONNECTION_CATALOG: readonly ConnectionCatalogEntry[];
/** Returns the catalog entry for a slug, or `undefined` when not curated. */
export declare function getCatalogEntry(slug: string): ConnectionCatalogEntry | undefined;
/** All curated connection slugs, in catalog order. */
export declare function catalogSlugs(): string[];
/**
 * Effective protocols for an entry: the intersection of what the scaffolder
 * supports and what the entry declares. Custom inputs use the full supported
 * set when they declare no protocols.
 */
export declare function effectiveProtocols(declared: readonly ConnectionProtocol[] | undefined): ConnectionProtocol[];
/** True when a slug is a valid filesystem-derived connection name. */
export declare function isValidConnectionSlug(slug: string): boolean;
/**
 * The `vercel connect create <service>` identifier for a Connect-backed
 * connection: the explicit `auth.service` when set, otherwise the MCP host.
 * Returns `undefined` when neither is available, in which case the connector
 * must be provisioned out of band.
 */
export declare function connectorServiceForEntry(entry: Pick<ConnectionCatalogEntry, "mcp" | "auth">): string | undefined;
/** Canonical connector name attempted before offering discovery or creation. */
export declare function canonicalConnectorNameForEntry(entry: {
    auth?: ConnectionAuthSpec;
}): string | undefined;
/** Extracts the bare host from an MCP URL, or `undefined` when unparseable. */
export declare function mcpServiceHost(url: string | undefined): string | undefined;
/** Returns the endpoint block required for a protocol, or `null` when missing. */
export declare function endpointForProtocol(entry: Pick<ConnectionCatalogEntry, "mcp" | "openapi">, protocol: ConnectionProtocol): McpEndpoint | OpenApiEndpoint | null;
