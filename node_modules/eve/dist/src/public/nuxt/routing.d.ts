/**
 * Join a route prefix and a path with exactly one separating slash.
 */
export declare function joinRoutePrefix(prefix: string, path: string): string;
/**
 * Reduce an origin string to its canonical `protocol://host[:port]` form.
 */
export declare function normalizeOrigin(origin: string): string;
/**
 * Resolve the local production port the module proxies to when an eve service
 * runs alongside a non-Vercel Nuxt deployment. Defaults to
 * {@link DEFAULT_EVE_NUXT_PRODUCTION_PORT}.
 */
export declare function readLocalProductionPort(): number;
/**
 * Resolve the proxy destination for eve routes in non-Vercel production: an
 * explicit origin override (`EVE_NUXT_PRODUCTION_ORIGIN`) or a local port. On
 * Vercel the module routes at the edge via a Build Output service route
 * instead of proxying.
 */
export declare function resolveProductionTarget(): string;
