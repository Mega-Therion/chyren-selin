import type { CompileAgentResult } from "#compiler/compile-agent.js";
import { type DevelopmentRuntimeArtifactsActivation, type DevelopmentRuntimeArtifactsSnapshot } from "#internal/nitro/dev-runtime-artifacts.js";
export interface DevelopmentGeneration extends DevelopmentRuntimeArtifactsSnapshot {
    readonly fingerprint: string;
}
export declare function stageDevelopmentGeneration(compileResult: CompileAgentResult): Promise<DevelopmentGeneration>;
export declare function publishDevelopmentGeneration(compileResult: CompileAgentResult): Promise<DevelopmentGeneration>;
export declare function activateDevelopmentGeneration(input: {
    readonly appRoot: string;
    readonly generation: DevelopmentGeneration;
}): Promise<void>;
export declare function activateDevelopmentGenerationTransaction(input: {
    readonly appRoot: string;
    readonly generation: DevelopmentGeneration;
}): Promise<DevelopmentRuntimeArtifactsActivation>;
export declare function discardDevelopmentGeneration(generation: DevelopmentGeneration): Promise<void>;
