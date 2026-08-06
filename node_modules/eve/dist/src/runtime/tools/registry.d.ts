import type { PreparedRuntimeAuthoredTool } from "#runtime/sessions/turn.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * One executable authored tool tracked by the runtime-owned registry.
 */
interface RuntimeRegisteredTool {
    readonly definition: ResolvedToolDefinition;
    readonly prepared: PreparedRuntimeAuthoredTool;
}
/**
 * Runtime-owned tool registry used to expose authored tools to the harness and
 * execute them later inside framework-owned steps.
 */
export interface RuntimeToolRegistry {
    readonly preparedTools: readonly PreparedRuntimeAuthoredTool[];
    readonly toolsByName: ReadonlyMap<string, RuntimeRegisteredTool>;
}
/**
 * Builds the runtime-owned registry for one resolved authored agent.
 */
export declare function createRuntimeToolRegistry(definitions: {
    readonly tools: readonly ResolvedToolDefinition[];
}, input?: {
    readonly reservedToolNames?: readonly string[];
}): Promise<RuntimeToolRegistry>;
/**
 * Looks up one authored tool by name from the runtime-owned registry.
 */
export declare function findRegisteredRuntimeTool(registry: RuntimeToolRegistry, toolName: string): RuntimeRegisteredTool | null;
export {};
