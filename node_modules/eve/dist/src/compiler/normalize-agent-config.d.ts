import type { AgentSourceManifest } from "#discover/manifest.js";
import type { CompiledAgentDefinition } from "#compiler/manifest.js";
import { type ManifestCompileContext } from "#compiler/normalize-helpers.js";
/**
 * Compiles the agent-level configuration (model, compaction, build,
 * workspace) for one authored agent node.
 */
export declare function compileAgentConfig(manifest: AgentSourceManifest, context: ManifestCompileContext, options?: {
    readonly definition?: unknown;
}): Promise<CompiledAgentDefinition>;
