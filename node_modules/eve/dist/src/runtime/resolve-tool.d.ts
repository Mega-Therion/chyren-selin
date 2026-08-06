import type { CompiledToolDefinition } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Resolves one compiled authored tool into a runtime-owned definition
 * with live callbacks reattached from the authored module.
 *
 * Schema-bearing module exports are retained when they implement the validated
 * runtime contract; serialized schemas from the compiled manifest are
 * otherwise rehydrated into live validators. Optional hooks are reattached
 * from the live module export.
 */
export declare function resolveToolDefinition(definition: CompiledToolDefinition, moduleMap: CompiledModuleMap, nodeId: string | undefined): Promise<ResolvedToolDefinition>;
