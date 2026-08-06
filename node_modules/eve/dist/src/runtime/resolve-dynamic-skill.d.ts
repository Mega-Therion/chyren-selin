import type { CompiledDynamicSkillDefinition } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
import type { ResolvedDynamicSkillResolver } from "#runtime/types.js";
/**
 * Resolves one compiled dynamic skill entry into a runtime-owned resolver
 * with live event handler functions reattached from the authored module.
 */
export declare function resolveDynamicSkillDefinition(definition: CompiledDynamicSkillDefinition, moduleMap: CompiledModuleMap, nodeId: string | undefined): Promise<ResolvedDynamicSkillResolver>;
