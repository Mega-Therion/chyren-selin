import type { CompiledHookDefinition } from "../compiler/manifest.js";
import type { CompiledModuleMap } from "../compiler/module-map.js";
import type { ResolvedHookDefinition } from "./types.js";
/**
 * Resolves one compiled authored hook into a runtime-owned definition
 * with live handlers reattached from the authored module.
 *
 * The authored shape is `{ events?: { ... } }`.
 * Each declared handler must be a function. Any other shape raises a
 * {@link ResolveAgentError} so typos surface at resolve time instead of
 * at first dispatch call.
 */
export declare function resolveHookDefinition(definition: CompiledHookDefinition, moduleMap: CompiledModuleMap, nodeId: string | undefined): Promise<ResolvedHookDefinition>;
