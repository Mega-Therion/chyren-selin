import type { NitroArtifactsConfig } from "#internal/nitro/routes/runtime-artifacts.js";
/**
 * Builds the package-owned JSON inspection response for the current agent.
 */
export declare function handleAgentInfoRequest(input: NitroArtifactsConfig): Promise<Response>;
