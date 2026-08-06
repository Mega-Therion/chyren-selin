import { type CompileMetadata } from "#compiler/artifacts.js";
import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Input for loading compile metadata from disk or bundled artifacts.
 */
interface LoadCompileMetadataInput {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
}
/**
 * Loads and validates compile metadata when it is available for the current
 * artifact source.
 */
export declare function loadCompileMetadata(input: LoadCompileMetadataInput): Promise<CompileMetadata | null>;
export {};
