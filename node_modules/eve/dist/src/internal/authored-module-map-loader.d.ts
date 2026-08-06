import { type CompiledModuleMap } from "#compiler/module-map.js";
import type { RuntimeDiskCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Loads a disk-backed module map by hydrating authored modules directly from
 * source. This is for dev/build flows that need tsconfig alias support and
 * source reloads without relying on Node's module cache for module-map.mjs.
 */
export declare function loadCompiledModuleMapFromAuthoredSource(input: {
    readonly compiledArtifactsSource: RuntimeDiskCompiledArtifactsSource;
}): Promise<CompiledModuleMap>;
