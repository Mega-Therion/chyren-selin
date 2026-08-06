import type { RuntimeDiskCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
interface DevelopmentGenerationContext {
    readonly generationId: string;
    readonly source: RuntimeDiskCompiledArtifactsSource;
}
export declare function getDevelopmentWorkflowGeneration(): DevelopmentGenerationContext | undefined;
export declare function withDevelopmentWorkflowGeneration<T>(context: DevelopmentGenerationContext, operation: () => Promise<T>): Promise<T>;
export {};
