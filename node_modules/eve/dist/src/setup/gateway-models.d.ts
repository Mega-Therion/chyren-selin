/**
 * Fetches the set of AI Gateway model ids, for validating a `--model` before
 * scaffolding. Routed through the (required) Vercel CLI — equivalent to:
 *
 *   vercel curl https://ai-gateway.vercel.sh/v1/models -- --silent | jq -r '.data[].id'
 *
 * Returns `null` when the catalog is unreachable (no `vercel`, not logged in, or
 * a malformed response) — callers must not block creation on it.
 */
export declare function fetchGatewayModelIds(cwd: string): Promise<Set<string> | null>;
