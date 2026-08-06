import { type RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Resolves a cache key for one compiled-artifact source that also fingerprints
 * the current compiled source graph when metadata is available.
 *
 * This lets long-lived processes keep cache hits across turns while still
 * invalidating naturally after recompilation under the same app root.
 */
export declare function resolveRuntimeCompiledArtifactsVersionedCacheKey(source: RuntimeCompiledArtifactsSource): Promise<string>;
