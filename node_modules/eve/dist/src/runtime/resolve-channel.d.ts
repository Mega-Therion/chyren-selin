import type { CompiledChannelDefinition } from "#compiler/manifest.js";
import type { CompiledModuleMap } from "#compiler/module-map.js";
import type { ResolvedChannelDefinition } from "#runtime/types.js";
/**
 * Resolves one compiled channel entry into a runtime-owned definition
 * with a live `handler` (the per-route handler authored via `POST` /
 * `GET` / etc. inside `defineChannel`) and the channel's `receive` hook
 * if the author declared one.
 *
 * Every authored channel is a `CompiledChannel` from `defineChannel` —
 * the bare `{ fetch, receive? }` Route shape is rejected by
 * {@link normalizeChannelDefinition}. Framework-internal channels
 * (the connection callback route, the `eve` session channel) build
 * `ResolvedChannelDefinition` values directly and do not flow through
 * this resolver.
 */
export declare function resolveChannelDefinition(definition: CompiledChannelDefinition, moduleMap: CompiledModuleMap, nodeId: string | undefined): Promise<ResolvedChannelDefinition>;
