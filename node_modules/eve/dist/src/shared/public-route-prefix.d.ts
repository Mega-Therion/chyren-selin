/**
 * Environment variable naming the public route prefix an eve agent's
 * `/eve/v1/*` transport surface is mounted under on its callback origin.
 *
 * Multi-agent host integrations mount each named agent under
 * `/eve/agents/<name>/eve/v1/*` and strip that prefix before requests reach
 * the eve service, so a running agent cannot recover its own public mount
 * from an inbound request. The integration exports this variable in the
 * generated service build command, the eve CLI resolves it once into the
 * build input, the build bakes it into every emitted Vercel workflow function
 * environment, and callback-URL minting prepends it so framework-owned
 * callbacks resolve to a routable public path.
 *
 * Self-hosted deployments that proxy an agent behind a path prefix can set
 * it directly on the runtime environment.
 */
export declare const EVE_PUBLIC_ROUTE_PREFIX_ENV = "EVE_PUBLIC_ROUTE_PREFIX";
/**
 * Normalizes a public route prefix to `/segment(/segment)*` form: adds the
 * leading slash, strips trailing slashes, and returns `undefined` for
 * values that resolve to the root route (empty, blank, or `/`).
 */
export declare function normalizePublicRoutePrefix(value: string | undefined): string | undefined;
