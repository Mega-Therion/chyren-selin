export declare const CACHED_CHANNEL_PREFIX = "eve-cached-channel:";
export declare const RESOLVE_EXTENSIONS: readonly [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs", ".json"];
type RolldownResolveResult = {
    readonly id: string;
};
export type RolldownResolveContext = {
    resolve(source: string, importer: string | undefined, options: {
        kind: string;
        skipSelf: boolean;
    }): Promise<RolldownResolveResult | null>;
};
export declare function createGenerationPackageBoundaryPlugin(input: {
    readonly externalDependencies: readonly string[];
    readonly packageRoot: string;
}): Record<string, unknown>;
export declare function createRuntimeLoaderPackageBoundaryPlugin(input: {
    readonly externalDependencies: readonly string[];
    readonly packageRoot: string;
}): Record<string, unknown>;
/**
 * Keeps package imports external in an extension distribution while enforcing
 * that every runtime package is declared by the extension.
 */
export declare function createDistributionPackageBoundaryPlugin(input: {
    readonly runtimeDependencies: readonly string[];
    readonly packageRoot: string;
}): Record<string, unknown>;
export declare function normalizeExternalDependencies(externalDependencies?: readonly string[]): string[];
export declare function isPathImport(source: string): boolean;
export declare function isNodeModulesPath(path: string): boolean;
export {};
