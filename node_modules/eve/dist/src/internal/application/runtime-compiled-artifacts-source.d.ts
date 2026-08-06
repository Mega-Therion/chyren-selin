import { type RuntimeDiskCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Creates a disk-backed artifact source for dev/build flows that may need to
 * hydrate authored modules directly from source files.
 */
export declare function createAuthoredSourceRuntimeCompiledArtifactsSource(appRoot: string): RuntimeDiskCompiledArtifactsSource;
