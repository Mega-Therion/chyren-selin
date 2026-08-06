import { type DiscoverDiagnostic } from "#discover/diagnostics.js";
import { type AgentSourceManifest, type ExtensionSourceRef, type ResolvedExtensionMount } from "#discover/manifest.js";
import { type ProjectSource } from "#discover/project-source.js";
/**
 * Input for discovering the authored agent source graph from resolved roots.
 */
interface DiscoverAgentInput {
    agentRoot: string;
    appRoot: string;
    /**
     * Optional {@link ProjectSource} used for all filesystem reads. Defaults
     * to a disk-backed source so disk callers keep their current behaviour.
     * Tests that want to run discovery against an in-memory tree pass a
     * memory-backed source.
     */
    source?: ProjectSource;
    /**
     * Discovery role. `"agent"` (default) resolves mounted extensions and
     * accepts agent-level config. `"extension"` discovers an extension's own
     * source tree: it rejects `agent.ts`/`sandbox` (consumer-owned) and does
     * not resolve further extensions (transitive mounting is a non-goal).
     */
    role?: "agent" | "extension";
}
/**
 * Result of discovering one authored agent source graph.
 */
interface DiscoverAgentResult {
    diagnostics: DiscoverDiagnostic[];
    manifest: AgentSourceManifest;
}
/**
 * Discovers the current agent's authored source graph without importing authored
 * modules.
 */
export declare function discoverAgent(input: DiscoverAgentInput): Promise<DiscoverAgentResult>;
/**
 * One extension mount discovered under `agent/extensions/`, in either the flat
 * file form (`extensions/crm.ts`) or the directory form
 * (`extensions/crm/extension.ts` with optional override slots).
 */
/** Resolves extension declarations into their discovered source manifests. */
export declare function resolveExtensionMounts(input: {
    readonly agentRoot: string;
    readonly appRoot: string;
    readonly mounts: readonly ExtensionMountDescriptor[];
    readonly source: ProjectSource;
}): Promise<{
    readonly diagnostics: readonly DiscoverDiagnostic[];
    readonly mounts: readonly ResolvedExtensionMount[];
}>;
export interface ExtensionMountDescriptor {
    /** Mount namespace prefixed onto every composed contribution. */
    readonly namespace: string;
    /** Module ref for the mount declaration the package specifier is read from. */
    readonly mountRef: ExtensionSourceRef;
    /**
     * Absolute path to the mount directory when this is the directory form.
     * Its override slots are discovered as an agent-shaped source. Absent for
     * the flat file form.
     */
    readonly overridesRoot?: string;
}
/**
 * Discovers extension mount declarations without resolving or inspecting their
 * package distributions. Development uses this before building local mounts.
 */
export declare function discoverExtensionMountDeclarations(input: {
    readonly agentRoot: string;
    readonly source?: ProjectSource;
}): Promise<{
    diagnostics: DiscoverDiagnostic[];
    mounts: ExtensionMountDescriptor[];
}>;
/**
 * Flags agent-root contributions whose composed name uses a mounted extension's
 * `<ns>__` prefix. That prefix is reserved for the extension and its co-located
 * overrides, so a root-level `<ns>__…` file would override the extension from
 * outside its mount directory — rejected here.
 */
export declare function detectRootNamespaceCollisions(input: {
    readonly agentRoot: string;
    readonly namespaces: readonly string[];
    readonly sources: ReadonlyArray<{
        readonly logicalPath: string;
    }>;
}): DiscoverDiagnostic[];
export {};
