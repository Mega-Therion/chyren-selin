import type { RunInput } from "#channel/types.js";
import { ContextContainer } from "#context/container.js";
import { type CompiledBundle } from "#runtime/sessions/runtime-context-keys.js";
import type { DynamicSubagentAgentConfig } from "#runtime/subagents/dynamic-agent-config.js";
/**
 * Builds the bootstrap {@link ContextContainer} for one run.
 */
export declare function buildRunContext(input: {
    readonly bundle: CompiledBundle;
    readonly dynamicSubagentAgentConfig?: DynamicSubagentAgentConfig;
    readonly run: RunInput;
}): ContextContainer;
