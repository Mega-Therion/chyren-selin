import type { ContextReader } from "#context/key.js";
import type { RuntimeTurnAgent } from "#runtime/agent/bootstrap.js";
import type { CompiledBundle } from "#runtime/sessions/runtime-context-keys.js";
import type { AgentLimitsDefinition } from "#shared/agent-definition.js";
import type { DynamicSubagentAgentConfig } from "#runtime/subagents/dynamic-agent-config.js";
export interface EffectiveAgentRuntime {
    readonly limits?: AgentLimitsDefinition;
    readonly thresholdPercent?: number;
    readonly turnAgent: RuntimeTurnAgent;
}
export declare function resolveEffectiveAgentRuntime(bundle: Pick<CompiledBundle, "resolvedAgent" | "turnAgent">, context: ContextReader): EffectiveAgentRuntime;
export declare function resolveEffectiveAgentRuntimeFromConfig(bundle: Pick<CompiledBundle, "resolvedAgent" | "turnAgent">, config: DynamicSubagentAgentConfig | undefined): EffectiveAgentRuntime;
