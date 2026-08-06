import type { CompiledModuleMap } from "#compiler/module-map.js";
import type { RuntimeTurnAgent } from "#runtime/agent/bootstrap.js";
import type { RuntimeAdapterRegistry } from "#runtime/channels/registry.js";
import { type RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
import { type ResolvedAgentGraphBundle } from "#runtime/graph.js";
import type { RuntimeHookRegistry } from "#runtime/hooks/registry.js";
import type { RuntimeSubagentRegistry } from "#runtime/subagents/registry.js";
import type { RuntimeToolRegistry } from "#runtime/tools/registry.js";
import type { ResolvedAgent } from "#runtime/types.js";
export interface CompiledRuntimeAgentBundle {
    readonly adapterRegistry: RuntimeAdapterRegistry;
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly graph: ResolvedAgentGraphBundle;
    readonly hookRegistry: RuntimeHookRegistry;
    readonly moduleMap: CompiledModuleMap;
    /**
     * Id of the active node in the graph. `undefined` for root bundles.
     * Persisted by the BundleKey codec so per-node bundles survive
     * serialization across workflow step boundaries.
     */
    readonly nodeId?: string;
    readonly resolvedAgent: ResolvedAgent;
    readonly subagentRegistry: RuntimeSubagentRegistry;
    readonly toolRegistry: RuntimeToolRegistry;
    readonly turnAgent: RuntimeTurnAgent;
}
/**
 * Returns a compiled runtime agent bundle for the given source and optional
 * node id.
 *
 * The full graph is loaded and cached once per `compiledArtifactsSource`.
 * When `nodeId` is provided, a cheap per-node bundle is derived from
 * the cached graph with the node-level fields (turn agent, registries, etc.)
 * pointing at the target node. When omitted the root bundle is returned.
 */
export declare function getCompiledRuntimeAgentBundle(input: {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly nodeId?: string;
}): Promise<CompiledRuntimeAgentBundle>;
/**
 * Clears all cached compiled runtime agent bundles on the active runtime
 * session. The dev-server file watcher uses this to invalidate cached
 * bundles when authored source changes; tests rely on per-session isolation
 * so the process default cache is untouched when called inside a scoped
 * session.
 */
export declare function clearCompiledRuntimeAgentBundleCache(): void;
