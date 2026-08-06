/**
 * Resolves every local tsconfig/jsconfig file that can affect bundling from
 * one package root: root configs plus their extends chain.
 */
export declare function resolveTsConfigDependencyPaths(appRoot: string): Promise<string[]>;
export declare function resolveRootTsConfigPaths(appRoot: string): Promise<string[]>;
export declare function collectTsConfigDependencyPaths(input: {
    readonly configPath: string;
    readonly resolvedConfigPaths: Set<string>;
    readonly visitingConfigPaths: Set<string>;
}): Promise<void>;
export declare function readTextFileIfExists(path: string): Promise<string | undefined>;
export declare function parseTsConfigObject(source: string): Record<string, unknown> | undefined;
export declare function extractTsConfigExtendsSpecifiers(source: string): string[];
export declare function resolveTsConfigExtendsTargetPaths(input: {
    readonly configPath: string;
    readonly extendsSpecifier: string;
}): string[];
export declare function resolveFirstExistingTsConfigExtendsTarget(input: {
    readonly configPath: string;
    readonly extendsSpecifier: string;
}): string | undefined;
export declare function isTsConfigFilePath(specifier: string): boolean;
