import type { MessageStreamEvent } from "#protocol/message.js";
import type { StreamEventHook } from "../../public/definitions/hook.js";
import type { ResolvedHookDefinition } from "../types.js";
/**
 * One ordered stream-event subscriber paired with its source slug.
 *
 * `eventType` is `"*"` for wildcard subscribers, otherwise the typed
 * event name.
 */
interface RuntimeStreamEventHookEntry {
    readonly slug: string;
    readonly handler: StreamEventHook<MessageStreamEvent>;
    readonly eventType: string;
}
/**
 * Per-node runtime hook registry. Stream-event subscribers are split
 * into typed buckets (keyed by event type) and a flat wildcard bucket
 * so dispatch can iterate one typed bucket plus the wildcard bucket
 * without scanning every entry.
 */
export interface RuntimeHookRegistry {
    readonly streamEventsByType: ReadonlyMap<string, readonly RuntimeStreamEventHookEntry[]>;
    readonly streamEventsWildcard: readonly RuntimeStreamEventHookEntry[];
}
/**
 * Returns an empty registry. Used by tests that build a runtime bundle
 * stub without authored hooks — production registries are constructed
 * via {@link createRuntimeHookRegistry} from the resolved authored
 * graph.
 */
export declare function createEmptyHookRegistry(): RuntimeHookRegistry;
/**
 * Builds the per-node runtime hook registry from an ordered list of
 * resolved hook definitions.
 *
 * The caller is responsible for sorting the input — discover-time
 * lexicographic ordering on full slug is preserved by the discovery
 * helper, so callers usually pass `resolvedHooks` directly.
 */
export declare function createRuntimeHookRegistry(resolvedHooks: readonly ResolvedHookDefinition[]): RuntimeHookRegistry;
export {};
