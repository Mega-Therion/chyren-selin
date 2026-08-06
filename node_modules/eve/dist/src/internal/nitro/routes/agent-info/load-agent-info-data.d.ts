import type { CompiledAgentManifest, CompiledSubagentNode } from "#compiler/manifest.js";
import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
import { type NitroArtifactsConfig } from "#internal/nitro/routes/runtime-artifacts.js";
import type { ResolvedAgent, ResolvedSandboxDefinition, ResolvedScheduleDefinition, ResolvedSkillDefinition, ResolvedInstructionsDefinition } from "#runtime/types.js";
/**
 * Runtime data needed to build the package-owned `GET /eve/v1/info`
 * inspection JSON.
 */
export interface AgentInfoData {
    readonly agent: ResolvedAgent;
    readonly manifest: CompiledAgentManifest;
    readonly schedules: readonly ResolvedScheduleDefinition[];
}
export interface AgentInfoManifestData {
    readonly manifest: CompiledAgentManifest;
    readonly schedules: readonly ResolvedScheduleDefinition[];
}
/**
 * Loads the resolved runtime data projected by `GET /eve/v1/info`.
 */
export declare function loadAgentInfoData(input: {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
}): Promise<AgentInfoData>;
/**
 * Loads manifest-only runtime data for inspection surfaces that must not
 * execute or import authored modules.
 */
export declare function loadAgentInfoManifestData(input: {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
}): Promise<AgentInfoManifestData>;
/**
 * Resolves the explicit runtime artifact source used by the package-owned
 * `GET /eve/v1/info` handler.
 */
export declare function resolveAgentInfoCompiledArtifactsSource(input: NitroArtifactsConfig): RuntimeCompiledArtifactsSource;
export type { CompiledAgentManifest, CompiledSubagentNode, ResolvedSandboxDefinition, ResolvedScheduleDefinition, ResolvedSkillDefinition, ResolvedInstructionsDefinition, };
