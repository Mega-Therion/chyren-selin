interface InstalledPackageInfo {
    name: string;
    version: string;
}
interface PackageLocation {
    packageBuildRoot: string | null;
    packageRoot: string;
}
/**
 * Resolves eve's package location relative to an executing module.
 *
 * Direct source and build executions retain their package-local behavior.
 * Bundled executions resolve the installed eve manifest through Node's module
 * resolver instead of treating the bundle owner's manifest as eve's.
 */
export declare function resolvePackageLocationFromModulePath(currentModulePath: string, resolvePackageJsonPath?: (currentModulePath: string) => string): PackageLocation;
/**
 * Resolves the installed eve package root.
 */
export declare function resolvePackageRoot(): string;
/**
 * Resolves one package-owned source file from the currently executing eve installation.
 *
 * Source checkouts use `src/...` paths so local tests exercise live source files.
 * Installed or built package executions use `dist/src/...` so published builds do
 * not depend on unpublished TypeScript sources.
 */
export declare function resolvePackageSourceFilePath(relativeSourcePath: string): string;
/**
 * Resolves one package-owned source directory from the currently executing eve installation.
 */
export declare function resolvePackageSourceDirectoryPath(relativeSourcePath: string): string;
export declare function resolvePackageDependencyPath(specifier: string): string;
/**
 * Resolves one vendored compiled asset from the current eve installation.
 */
export declare function resolvePackageCompiledFilePath(relativeCompiledPath: string): string;
/**
 * Resolves the installed eve package identity from package.json.
 */
export declare function resolveInstalledPackageInfo(): InstalledPackageInfo;
/**
 * Resolves the `@workflow/core` version this eve release bundles, read from
 * eve's own `package.json`.
 *
 * This is the single source of truth for the `@workflow/*` line eve targets, so
 * compatibility checks never hardcode a version. eve's `package.json` is
 * published with its `devDependencies` intact even though those packages are
 * vendored, so the entry is readable from an installed eve as well as a source
 * checkout. Returns `undefined` when the entry cannot be read so callers can
 * no-op rather than fail.
 */
export declare function resolveExpectedWorkflowVersion(): string | undefined;
/**
 * Resolves a Workflow runtime module from eve's narrowed Workflow dependencies.
 *
 * Older Workflow builder output still uses `workflow/*` specifiers. eve maps
 * those historical specifiers to the smaller `@workflow/*` packages it actually
 * needs, plus an eve-owned builtins module for response body step helpers.
 */
export declare function resolveWorkflowModulePath(specifier: string): string;
export {};
