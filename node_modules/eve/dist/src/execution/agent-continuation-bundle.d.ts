import type { RuntimeAgentHandleAction } from "#execution/agent-handle-dispatch.js";
import type { CompiledBundle } from "#runtime/sessions/runtime-context-keys.js";
import type { getDynamicSubagentSelection } from "#context/dynamic-subagent-lifecycle.js";
type DynamicRemoteAgentConfig = NonNullable<Extract<ReturnType<typeof getDynamicSubagentSelection>, {
    readonly kind: "remote";
}>["remoteAgent"]>;
/** Overlays current dynamic credentials without replacing stored delivery coordinates. */
export declare function createAgentContinuationBundle(input: {
    readonly action: RuntimeAgentHandleAction;
    readonly bundle: CompiledBundle;
    readonly dynamicRemoteAgent?: DynamicRemoteAgentConfig;
}): CompiledBundle;
export {};
