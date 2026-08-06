import type { CompiledAgentManifest } from "#compiler/manifest.js";
import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
import type { ResolvedScheduleDefinition } from "#runtime/types.js";
/**
 * Input for resolving authored schedules from the compiled manifest.
 */
interface ResolveSchedulesInput {
    manifest: CompiledAgentManifest;
}
/**
 * Explicit compiled-artifact source used to resolve schedules from runtime
 * artifacts.
 */
interface LoadResolvedCompiledSchedulesInput {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
}
/**
 * Resolves runtime-owned schedules from the compiled manifest.
 */
export declare function resolveSchedules(input: ResolveSchedulesInput): Promise<ResolvedScheduleDefinition[]>;
/**
 * Loads the compiled manifest, then resolves authored schedules into
 * runtime-owned schedule models.
 */
export declare function loadResolvedCompiledSchedules(input: LoadResolvedCompiledSchedulesInput): Promise<ResolvedScheduleDefinition[]>;
/**
 * Loads and resolves one compiled authored schedule from its registered Nitro
 * task name.
 */
export declare function loadResolvedCompiledScheduleByTaskName(taskName: string, input: LoadResolvedCompiledSchedulesInput): Promise<ResolvedScheduleDefinition>;
export {};
