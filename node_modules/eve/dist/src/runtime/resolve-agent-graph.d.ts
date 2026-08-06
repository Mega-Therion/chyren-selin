import type { CompiledAgentManifest } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
import { type ResolvedAgentGraphBundle } from "#runtime/graph.js";
/**
 * Input for resolving the compiled authored manifest and flattened module graph
 * into a runtime-owned recursive agent graph.
 */
interface ResolveRuntimeAgentGraphInput {
    manifest: CompiledAgentManifest;
    moduleMap: CompiledModuleMap;
}
/**
 * Resolves the compiled authored manifest and flattened module graph into one
 * runtime-owned bundle of agent nodes.
 */
export declare function resolveRuntimeAgentGraph(input: ResolveRuntimeAgentGraphInput): Promise<ResolvedAgentGraphBundle>;
export {};
