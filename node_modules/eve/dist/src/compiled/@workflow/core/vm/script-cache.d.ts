import { type Context, Script } from 'node:vm';
/**
 * Returns a compiled `vm.Script` for the given workflow bundle code and
 * filename, compiling and caching it on first use. Subsequent calls with the
 * same `(code, filename)` return the cached `Script`.
 *
 * The returned `Script` is not yet bound to any context; the caller runs it
 * against a specific VM context via `script.runInContext(context)`. This is
 * equivalent to `vm.runInContext(code, context, { filename })` but skips the
 * recompile.
 */
export declare function getCachedWorkflowScript(code: string, filename: string): Script;
/**
 * Runs the cached workflow-bundle `Script` against `context`. Compiles and
 * caches the `Script` on first use for the given `(code, filename)`.
 */
export declare function runCachedWorkflowScript(code: string, filename: string, context: Context): unknown;
/**
 * Clears the compiled-script cache. Intended for tests that want to assert
 * compile-vs-cache behaviour in isolation; not used on the hot path.
 */
export declare function clearWorkflowScriptCache(): void;
/**
 * Number of distinct bundle (`code`) versions currently retained. Exposed for
 * tests asserting the LRU bound; not used on the hot path.
 */
export declare function workflowScriptCacheSize(): number;
//# sourceMappingURL=script-cache.d.ts.map