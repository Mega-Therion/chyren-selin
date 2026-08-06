import type { CompiledSandboxDefinition } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
import type { ResolvedSandboxDefinition } from "#runtime/types.js";
/**
 * Resolves one compiled sandbox entry into a runtime-owned definition
 * with live `backend`, `bootstrap`, and `onSession` lifecycle handlers
 * (when present) attached from the authored module.
 *
 * If the authored module omits `backend`, the resolver substitutes
 * {@link defaultSandbox} so the rest of the runtime can rely on a
 * non-null backend value.
 */
export declare function resolveSandboxDefinition(definition: CompiledSandboxDefinition, moduleMap: CompiledModuleMap, nodeId: string | undefined): Promise<ResolvedSandboxDefinition>;
