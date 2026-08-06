/**
 * Runtime-owned compiled artifact paths for one application root.
 */
export interface RuntimeCompilerArtifactPaths {
    readonly appRoot: string;
    readonly compiledManifestPath: string;
    readonly compileDirectoryPath: string;
    readonly compileMetadataPath: string;
    readonly diagnosticsPath: string;
    readonly discoveryManifestPath: string;
    readonly discoveryDirectoryPath: string;
    readonly moduleMapPath: string;
}
/**
 * Resolves the stable eve artifact paths for one application root without
 * depending on Node path helpers.
 */
export declare function resolveRuntimeCompilerArtifactPaths(appRoot: string): RuntimeCompilerArtifactPaths;
