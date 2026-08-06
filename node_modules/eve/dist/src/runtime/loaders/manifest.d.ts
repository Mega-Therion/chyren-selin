import { type CompiledAgentManifest } from "#compiler/manifest.js";
import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Input for loading the compiled source manifest from disk or the bundled
 * runtime alias.
 */
interface LoadCompiledManifestInput {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
}
/**
 * Error raised when the compiled manifest cannot be loaded or validated.
 */
export declare class LoadCompiledManifestError extends Error {
    readonly manifestPath?: string;
    constructor(message: string, manifestPath?: string);
}
/**
 * Loads and validates the compiler-owned source manifest.
 */
export declare function loadCompiledManifest(input: LoadCompiledManifestInput): Promise<CompiledAgentManifest>;
export {};
