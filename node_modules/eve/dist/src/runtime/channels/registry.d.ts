import type { ChannelAdapter } from "#channel/adapter.js";
import type { ResolvedChannelDefinition } from "#runtime/types.js";
/**
 * Runtime-owned registry of adapter configs keyed by adapter kind.
 * Used to rebuild adapter instances (with behavior functions) after
 * workflow step boundaries.
 */
export interface RuntimeAdapterRegistry {
    readonly adaptersByKind: ReadonlyMap<string, ChannelAdapter>;
}
/**
 * Builds the runtime-owned adapter registry from framework adapters plus any
 * custom adapters declared on resolved route definitions.
 *
 * Route-declared adapters may share framework kinds only as pass-throughs.
 */
export declare function createRuntimeAdapterRegistry(input: {
    readonly channels: readonly ResolvedChannelDefinition[];
}): RuntimeAdapterRegistry;
/**
 * Rehydrates one serialized adapter from the runtime-owned registry.
 *
 * Looks up the adapter config by `kind`, then merges the serialized state
 * onto it. The result is a full adapter with behavior functions and
 * restored state.
 */
export declare function deserializeRuntimeAdapter(registry: RuntimeAdapterRegistry, data: unknown): ChannelAdapter;
