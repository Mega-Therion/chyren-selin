import type { CompiledAgentManifest } from "#compiler/manifest.js";
export interface AuthoredModuleLoadOptions {
    readonly externalDependencies?: readonly string[];
    /**
     * When set, the module being loaded is extension-owned: its
     * `defineState`/`defineExtension` calls (and those of its same-package
     * dependencies bundled with it) are scoped to this namespace at bundle time.
     */
    readonly extensionScopeNamespace?: string;
}
/**
 * Loads one authored module namespace from disk during compile-time
 * discovery. Concurrent loads of the same `modulePath` share a single
 * Promise so the underlying bundle/import pipeline runs once.
 */
export declare function loadAuthoredModuleNamespace(modulePath: string, options?: AuthoredModuleLoadOptions): Promise<Record<string, unknown>>;
/**
 * Bundles one authored entry for immediate dev/eval loading. Package dependencies
 * remain external while relative authored source is inlined.
 */
export declare function bundleAuthoredModuleCode(modulePath: string, options?: AuthoredModuleLoadOptions): Promise<string>;
/**
 * Bundles one authored entry for an immutable development generation. Ordinary
 * package dependencies are inlined so the emitted code stays executable after
 * the original workspace changes; framework runtime imports and explicitly
 * configured external dependencies keep their normal runtime resolution.
 */
export declare function bundleAuthoredModuleForGeneration(modulePath: string, options?: AuthoredModuleLoadOptions): Promise<string>;
/** One path-preserving entry in an extension distribution graph. */
export interface ExtensionDistributionGraphEntry {
    /** Output path relative to `dist/`, without the `.mjs` extension. */
    readonly name: string;
    /** Absolute authored module path. */
    readonly path: string;
}
/**
 * Transforms an extension's authored modules as one code-split graph while
 * preserving an entry for every agent-shaped source module. Package imports
 * remain external for the consuming app and source maps are omitted.
 */
export declare function bundleExtensionDistributionGraph(input: {
    readonly entries: readonly ExtensionDistributionGraphEntry[];
    readonly packageRoot: string;
    readonly runtimeDependencies: readonly string[];
}): Promise<ReadonlyMap<string, string>>;
/**
 * Bundles every runtime-authored module in one immutable generation graph.
 * Shared dependencies are parsed and emitted once instead of once per authored
 * entry.
 */
export declare function bundleAuthoredModuleMapForGeneration(input: {
    readonly manifest: CompiledAgentManifest;
    readonly moduleMapPath: string;
}): Promise<string>;
