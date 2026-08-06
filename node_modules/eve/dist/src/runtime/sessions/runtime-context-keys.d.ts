/**
 * Runtime-tier context keys whose codecs call back into the runtime to
 * materialize their values. Leaf keys (no codec) live in `#context/keys.ts`.
 */
import type { ChannelAdapter } from "#channel/adapter.js";
import { ContextKey } from "#context/key.js";
import { type CompiledRuntimeAgentBundle } from "#runtime/sessions/compiled-agent-cache.js";
/** Compiled bundle on the durable context — re-exported under a stable name. */
export type CompiledBundle = CompiledRuntimeAgentBundle;
export declare const ChannelKey: ContextKey<ChannelAdapter>;
export declare const BundleKey: ContextKey<CompiledRuntimeAgentBundle>;
