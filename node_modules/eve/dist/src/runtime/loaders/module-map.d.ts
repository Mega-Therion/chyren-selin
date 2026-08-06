import { type CompiledModuleMap } from "#compiler/module-map.js";
import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Input for loading the compiled module map from disk or the bundled runtime
 * alias.
 */
interface LoadCompiledModuleMapInput {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
}
/**
 * Error raised when the compiled module map cannot be loaded or validated.
 */
export declare class LoadCompiledModuleMapError extends Error {
    readonly moduleMapPath?: string;
    constructor(message: string, moduleMapPath?: string);
}
/**
 * Loads and validates the compiler-owned module map.
 */
export declare function loadCompiledModuleMap(input: LoadCompiledModuleMapInput): Promise<CompiledModuleMap>;
export {};
