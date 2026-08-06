/**
 * Resolves tsconfig `paths` for authored source imported from linked
 * workspace packages. Rolldown handles the root app tsconfig; this only
 * fills the package-local config gap for sources outside the app root.
 */
export declare function createAuthoredPackageTsConfigPathsPlugin(input: {
    appPackageRoot: string;
    extensions: readonly string[];
}): Record<string, unknown>;
