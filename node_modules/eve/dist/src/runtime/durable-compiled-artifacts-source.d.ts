import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
interface DevelopmentCompiledArtifactsSelector {
    readonly kind: "development";
}
export type DurableCompiledArtifactsSource = RuntimeCompiledArtifactsSource | DevelopmentCompiledArtifactsSelector;
export declare function serializeDurableCompiledArtifactsSource(source: RuntimeCompiledArtifactsSource): DurableCompiledArtifactsSource;
export declare function resolveDurableCompiledArtifactsSource(source: DurableCompiledArtifactsSource): RuntimeCompiledArtifactsSource;
export {};
