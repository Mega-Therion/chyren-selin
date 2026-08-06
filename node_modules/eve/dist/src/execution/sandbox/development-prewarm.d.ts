import { type RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
export declare function startDevelopmentSandboxPrewarmInBackground(input: {
    readonly appRoot: string;
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly log?: (message: string) => void;
}): void;
export declare function subscribeDevelopmentSandboxPrewarmLogs(input: {
    readonly appRoot: string;
    readonly log: (message: string) => void;
}): () => void;
export declare function waitForDevelopmentSandboxPrewarm(input: {
    readonly appRoot: string;
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly log?: (message: string) => void;
}): Promise<void>;
