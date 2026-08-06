/**
 * Lazy loader for getPort that prevents bundlers (Turbopack, esbuild)
 * from statically tracing @workflow/utils/get-port and its filesystem
 * operations (readdir, readFile, readlink) into the flow route bundle.
 *
 * Uses createRequire with a dynamically constructed specifier so the
 * dependency is invisible to bundler static analysis.
 */
export declare function getPortLazy(): Promise<number | undefined>;
/**
 * Resets the per-process port cache. Intended for tests; not used on the hot
 * path. Callers must let any in-flight lookup settle (await the pending
 * `getPortLazy()` call) before resetting: clearing `_inFlight` here does not
 * cancel an already-scheduled resolution, so a late `.then` could otherwise
 * repopulate `_cachedPort` after the reset and bleed into the next test.
 */
export declare function resetPortCacheForTesting(): void;
/**
 * Installs a fake port resolver and clears the cache. Test-only seam: the real
 * resolver is loaded via `createRequire` with a runtime-built specifier (to
 * hide it from bundlers), which also defeats module mocking, so injection is
 * the only deterministic way to exercise the caching contract.
 */
export declare function setPortResolverForTesting(fn: () => Promise<number | undefined>): void;
//# sourceMappingURL=get-port-lazy.d.ts.map