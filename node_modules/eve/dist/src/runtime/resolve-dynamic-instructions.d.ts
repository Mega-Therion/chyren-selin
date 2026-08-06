import type { CompiledDynamicInstructionsDefinition } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
import type { ResolvedDynamicInstructionsResolver } from "#runtime/types.js";
export declare function resolveDynamicInstructionsDefinition(definition: CompiledDynamicInstructionsDefinition, moduleMap: CompiledModuleMap, nodeId: string | undefined): Promise<ResolvedDynamicInstructionsResolver>;
