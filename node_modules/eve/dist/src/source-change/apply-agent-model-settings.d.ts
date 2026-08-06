import type { AgentReasoningDefinition } from "#shared/agent-definition.js";
export type FieldPatch<T> = {
    readonly kind: "keep";
} | {
    readonly kind: "set";
    readonly value: T;
} | {
    readonly kind: "remove";
};
export interface AgentModelSettingsPatch {
    readonly model: FieldPatch<string>;
    readonly reasoning: FieldPatch<AgentReasoningDefinition>;
    readonly gatewayServiceTier: FieldPatch<"priority">;
}
export type AgentModelSetting = "model" | "reasoning" | "fast-mode";
export type AgentModelSettingsEdit = {
    readonly kind: "applied";
    readonly changed: readonly AgentModelSetting[];
    readonly nextSource: string;
} | {
    readonly kind: "bail";
    readonly reason: string;
    readonly line: number;
};
/** Applies every model-setting change in memory; callers own the atomic write. */
export declare function applyAgentModelSettingsToSource(sourceText: string, patch: AgentModelSettingsPatch): Promise<AgentModelSettingsEdit>;
