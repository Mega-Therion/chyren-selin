import type { DiscoverDiagnostic, DiscoverDiagnosticsSummary } from "#discover/diagnostics.js";
import type { AgentSourceManifest } from "#discover/manifest.js";
import type { CompiledAgentManifest } from "#compiler/manifest.js";
/**
 * Stable diagnostics artifact kind emitted by the compiler.
 */
declare const DISCOVERY_DIAGNOSTICS_ARTIFACT_KIND = "eve-discovery-diagnostics";
/**
 * Current diagnostics artifact schema version.
 */
declare const DISCOVERY_DIAGNOSTICS_ARTIFACT_VERSION = 1;
/**
 * Stable compile metadata artifact kind emitted by the compiler.
 */
export declare const COMPILE_METADATA_KIND = "eve-compile-metadata";
/**
 * Current compile metadata schema version.
 */
export declare const COMPILE_METADATA_VERSION = 5;
/**
 * Structured paths for compiler-owned artifacts under `.eve/`.
 */
export interface CompilerArtifactPaths {
    appRoot: string;
    compiledManifestPath: string;
    compileDirectoryPath: string;
    compileMetadataPath: string;
    diagnosticsPath: string;
    discoveryManifestPath: string;
    discoveryDirectoryPath: string;
    moduleMapPath: string;
}
/**
 * Machine-readable discovery diagnostics artifact written by the compiler.
 */
interface DiscoveryDiagnosticsArtifact {
    diagnostics: DiscoverDiagnostic[];
    kind: typeof DISCOVERY_DIAGNOSTICS_ARTIFACT_KIND;
    summary: DiscoverDiagnosticsSummary;
    version: typeof DISCOVERY_DIAGNOSTICS_ARTIFACT_VERSION;
}
/**
 * One artifact digest recorded in compile metadata.
 */
interface CompileArtifactDigest {
    path: string;
    sha256: string;
}
/**
 * Minimal compiler metadata artifact with versioning and hashes.
 */
export interface CompileMetadata {
    compile: {
        moduleMap: CompileArtifactDigest;
    };
    discovery: {
        diagnostics: CompileArtifactDigest;
        manifest: CompileArtifactDigest;
        sourceGraphHash: string;
        summary: DiscoverDiagnosticsSummary;
    };
    generator: {
        name: string;
        version: string;
    };
    kind: typeof COMPILE_METADATA_KIND;
    status: "failed" | "ready";
    version: typeof COMPILE_METADATA_VERSION;
}
export interface CompilerArtifactLocations {
    readonly publishedRoot: string;
    readonly writeRoot: string;
}
/**
 * Input for writing compiler-owned discovery artifacts.
 */
interface WriteCompilerArtifactsInput {
    appRoot: string;
    artifactLocations: CompilerArtifactLocations;
    diagnostics: readonly DiscoverDiagnostic[];
    manifest: AgentSourceManifest;
}
/**
 * Result of writing compiler-owned artifacts.
 */
interface WriteCompilerArtifactsResult {
    compiledManifest: CompiledAgentManifest;
    diagnosticsArtifact: DiscoveryDiagnosticsArtifact;
    metadata: CompileMetadata;
    moduleMapSource: string;
    paths: CompilerArtifactPaths;
}
/** Resolves stable compiler-owned artifact paths for one application root. */
export declare function resolveCompilerArtifactPaths(appRoot: string): CompilerArtifactPaths;
/**
 * Creates deterministic compile metadata from already-serialized artifact
 * payloads.
 */
export declare function createCompileMetadata(input: {
    appRoot: string;
    diagnosticsArtifactJson: string;
    diagnosticsSummary: DiscoverDiagnosticsSummary;
    discoveryManifestJson: string;
    moduleMapSource: string;
    paths: CompilerArtifactPaths;
}): CompileMetadata;
/** Writes compiler-owned artifacts and records their stable published locations. */
export declare function writeCompilerArtifacts(input: WriteCompilerArtifactsInput): Promise<WriteCompilerArtifactsResult>;
export {};
