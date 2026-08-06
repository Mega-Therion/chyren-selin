import { z } from "#compiled/zod/index.js";
import type { PreparedRuntimeDelegationTool } from "#runtime/sessions/turn.js";
import type { ResolvedDynamicSubagentDefinition, ResolvedRuntimeDelegationNode } from "#runtime/types.js";
import type { JsonObject } from "#shared/json.js";
/**
 * One runtime-owned subagent tracked by the prepared registry.
 */
interface RuntimeRegisteredSubagent {
    readonly definition: ResolvedRuntimeDelegationNode;
    readonly prepared?: PreparedRuntimeDelegationTool;
}
export interface ResolvedDynamicSubagentResolver extends ResolvedDynamicSubagentDefinition {
    readonly kind: "subagent";
    readonly name: string;
    readonly nodeId: string;
}
/**
 * Runtime-owned registry that exposes resolved subagents as model-visible tools.
 */
export interface RuntimeSubagentRegistry {
    readonly dynamicNodeIds: ReadonlySet<string>;
    readonly dynamicResolvers: readonly ResolvedDynamicSubagentResolver[];
    readonly preparedTools: readonly PreparedRuntimeDelegationTool[];
    readonly subagentsByName: ReadonlyMap<string, RuntimeRegisteredSubagent>;
    readonly subagentsByNodeId: ReadonlyMap<string, RuntimeRegisteredSubagent>;
}
/**
 * Stable input schema lowered onto every subagent tool. Subagents always
 * accept one free-form `message` string from the parent agent.
 */
export declare const SUBAGENT_TOOL_INPUT_SCHEMA: z.ZodObject<{
    message: z.ZodString;
    outputSchema: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
}, z.core.$strict>;
/**
 * Extended subagent tool input schema for agents that opt into
 * `experimental.subagentPersistentSessions`: adds the `agentId` field the
 * model uses to continue a previous delegation.
 */
export declare const PERSISTENT_SUBAGENT_TOOL_INPUT_SCHEMA: z.ZodObject<{
    message: z.ZodString;
    outputSchema: z.ZodOptional<z.ZodObject<{}, z.core.$loose>>;
    agentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
/** Selects the serialized subagent tool input schema for one agent's opt-in state. */
export declare function getSubagentToolInputJsonSchema(persistentSessions: boolean): JsonObject;
/**
 * Builds the runtime-owned registry for the resolved subagents visible from one
 * runtime agent node.
 */
export declare function createRuntimeSubagentRegistry(input: {
    /**
     * Whether the owning agent opted into
     * `experimental.subagentPersistentSessions`. Adds the model-visible
     * `agentId` continuation field to every lowered subagent tool schema.
     */
    readonly persistentSessions?: boolean;
    readonly reservedToolNames?: readonly string[];
    readonly subagents: readonly ResolvedRuntimeDelegationNode[];
}): RuntimeSubagentRegistry;
export declare function createPreparedRuntimeSubagentTool(definition: ResolvedRuntimeDelegationNode, inputSchema?: JsonObject): PreparedRuntimeDelegationTool;
export {};
