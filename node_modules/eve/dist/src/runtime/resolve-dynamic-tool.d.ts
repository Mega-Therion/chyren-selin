import type { CompiledDynamicToolDefinition } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
import type { ModuleSourceRef } from "#shared/source-ref.js";
import type { ResolvedDynamicToolResolver } from "#runtime/types.js";
type DynamicToolResolverSource = Readonly<ModuleSourceRef & {
    readonly extensionNamespace?: string;
    readonly slug: string;
}>;
/**
 * Resolves one compiled dynamic tool entry into a runtime-owned resolver
 * with live event handler functions reattached from the authored module.
 *
 * The resolver's `events` map is validated: each declared event name must
 * map to a function. The handlers are not called here — they run later at
 * the lifecycle point indicated by each event name.
 */
export declare function resolveDynamicToolDefinition(definition: CompiledDynamicToolDefinition, moduleMap: CompiledModuleMap, nodeId: string | undefined): Promise<ResolvedDynamicToolResolver>;
/**
 * Resolves a loaded public `defineDynamic()` value into the runtime shape used
 * by the dynamic-tool lifecycle.
 *
 * Authored definitions reach this boundary after module-map loading.
 * Framework-owned definitions are already loaded with eve itself. Both use
 * the same validation, source registration, and resolver construction here.
 */
export declare function resolveLoadedDynamicToolDefinition(value: unknown, source: DynamicToolResolverSource, eventNames?: readonly string[]): ResolvedDynamicToolResolver;
export {};
