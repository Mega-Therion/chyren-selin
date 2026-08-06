import type { ChannelSourceRef } from "#discover/manifest.js";
import type { CompiledChannelEntry } from "#compiler/manifest.js";
import { type ModuleBackedDefinitionLoadOptions } from "#compiler/normalize-helpers.js";
/**
 * Compiles one authored channel module into the normalized channel
 * entries stored on the compiled agent manifest.
 *
 * Recognizes the `disableRoute()` sentinel and emits a `disabled`
 * entry so the runtime can short-circuit channel registration without
 * losing the source path for diagnostics.
 *
 * Authored channels are always `CompiledChannel` values (from
 * `defineChannel`). Each route in the channel's `routes` array becomes
 * a separate compiled channel entry. The channel name is derived from
 * the filesystem path; the URL path comes from the route's `path` field.
 */
export declare function compileChannelDefinition(agentRoot: string, source: ChannelSourceRef, options?: ModuleBackedDefinitionLoadOptions): Promise<CompiledChannelEntry | readonly CompiledChannelEntry[]>;
