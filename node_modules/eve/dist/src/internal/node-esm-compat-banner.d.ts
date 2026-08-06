/**
 * Options for {@link buildNodeEsmCompatBanner} and
 * {@link createNodeEsmCompatBannerPlugin}.
 *
 * Bundle output that re-declares one of the CJS path globals at the top
 * level would otherwise collide with the banner, producing
 * `SyntaxError: Identifier '__dirname' has already been declared` at load
 * time. The banner builder omits any line whose binding the chunk already
 * provides.
 */
interface NodeEsmCompatBannerOptions {
    /** Whether to expose a CommonJS `require` shim alongside the path globals. */
    readonly includeRequire?: boolean;
}
/**
 * Builds the ESM CommonJS-compatibility banner appropriate for a single
 * bundle chunk's code. Identifiers the chunk already binds at the top
 * level (e.g. `const __dirname = ...` emitted by an inlined module) are
 * skipped so the prepended banner never re-declares them.
 *
 * Returns an empty string when the chunk already provides every binding.
 */
export declare function buildNodeEsmCompatBanner(code: string, options?: NodeEsmCompatBannerOptions): string;
interface BannerPlugin {
    readonly name: string;
    renderChunk(code: string, chunk?: {
        readonly fileName?: string;
    }): {
        code: string;
        map: SourceMap;
    } | null;
}
interface SourceMap {
    readonly version: 3;
    readonly sources: readonly string[];
    readonly sourcesContent: readonly string[];
    readonly names: readonly string[];
    readonly mappings: string;
}
/**
 * Creates a bundler plugin that prepends the Node ESM compatibility
 * banner to each output chunk, skipping any banner line whose binding
 * the chunk already provides. Compatible with both Rollup and Rolldown.
 */
export declare function createNodeEsmCompatBannerPlugin(options?: NodeEsmCompatBannerOptions): BannerPlugin;
export {};
