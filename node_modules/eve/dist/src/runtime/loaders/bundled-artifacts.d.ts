import type { CompileMetadata } from "#compiler/artifacts.js";
import type { CompiledAgentManifest } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
/**
 * Bundled compiled artifacts installed by Nitro when authored runtime state is
 * embedded directly into the server bundle.
 */
export interface BundledCompiledArtifacts {
    manifest: CompiledAgentManifest;
    metadata?: CompileMetadata;
    moduleMap: CompiledModuleMap;
}
/**
 * Input for running code against one isolated bundled compiled-artifact
 * snapshot.
 */
export interface WithBundledCompiledArtifactsInput extends BundledCompiledArtifacts {
    readonly sessionId?: string;
}
/**
 * Installs one bundled compiled-artifact snapshot on the active runtime
 * session. In production this writes to the process-default session at
 * Nitro bootstrap time; inside a `withRuntimeSession` scope it targets the
 * scoped session so tests cannot leak installations across each other.
 */
export declare function installBundledCompiledArtifacts(input: BundledCompiledArtifacts): void;
/**
 * Runs `fn` with bundled compiled artifacts installed on a fresh scoped
 * runtime session, leaving the process-default runtime session untouched.
 */
export declare function withBundledCompiledArtifacts<T>(input: WithBundledCompiledArtifactsInput, fn: () => Promise<T> | T): Promise<T>;
/**
 * Reads the bundled compiled-artifact snapshot for the active runtime
 * session, or `null` if none has been installed.
 */
export declare function readBundledCompiledArtifacts(): BundledCompiledArtifacts | null;
