import type { DevelopmentNitroArtifactsConfig, ProductionNitroArtifactsConfig } from "#internal/nitro/routes/runtime-artifacts.js";
import type { AgentWorkflowWorldDefinition } from "#shared/agent-definition.js";
/**
 * Runtime-artifacts wiring for the dev server: routes read compiled
 * artifacts from the authored app root via the snapshot pointer so hot
 * reload can swap them.
 */
export declare function createDevelopmentNitroArtifactsConfig(input: {
    readonly appRoot: string;
    readonly configuredWorld?: AgentWorkflowWorldDefinition;
}): DevelopmentNitroArtifactsConfig;
/**
 * Runtime-artifacts wiring for built output: routes require the artifacts
 * bundled into the server at build time and never touch the filesystem.
 */
export declare function createProductionNitroArtifactsConfig(): ProductionNitroArtifactsConfig;
