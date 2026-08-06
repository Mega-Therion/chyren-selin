/**
 * Replaces the connector UID literal in a scaffolded Connect connection
 * definition (`auth: connect("…")`). Returns `{ patched: false }` when the file
 * is missing or contains no `connect("…")` call to rewrite.
 */
export declare function updateConnectionConnectorUid(connectionFilePath: string, connectorUid: string): Promise<{
    patched: boolean;
}>;
