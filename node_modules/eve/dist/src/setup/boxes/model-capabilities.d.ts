import type { AgentReasoningDefinition } from "#shared/agent-definition.js";
import type { GatewayCatalogModel } from "./select-model.js";
/** A concrete reasoning effort level — every choice except the provider default. */
export type ReasoningLevel = Exclude<AgentReasoningDefinition, "provider-default">;
/**
 * What the AI Gateway catalog says a model supports, resolved before the
 * `/model` menu paints so unsupported controls never present as available.
 */
export interface GatewayModelCapabilities {
    /** Whether the model advertises adjustable reasoning (the `reasoning` catalog tag). */
    readonly reasoning: boolean;
    /** Effort levels worth offering for the model; empty when reasoning is unsupported. */
    readonly reasoningLevels: readonly ReasoningLevel[];
    /** Whether AI Gateway prices a `priority` service tier (Fast mode) for the model. */
    readonly fastMode: boolean;
}
/** Every effort level eve can author, offered when capabilities are unknown. */
export declare const ALL_REASONING_LEVELS: readonly ReasoningLevel[];
/**
 * Capabilities for `modelId` from a fetched catalog, or undefined when the
 * catalog is unavailable or does not list the model — the caller then treats
 * every control as potentially available.
 */
export declare function gatewayModelCapabilities(catalog: readonly GatewayCatalogModel[] | undefined, modelId: string | null): GatewayModelCapabilities | undefined;
