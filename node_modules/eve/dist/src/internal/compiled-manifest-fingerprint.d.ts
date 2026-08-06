import type { CompiledAgentManifest } from "#compiler/manifest.js";
export declare function serializeCompiledManifestForFingerprint(input: {
    readonly manifest: CompiledAgentManifest;
    readonly runtimeAppRoot: string;
}): string;
