import type { NitroArtifactsConfig } from "#internal/nitro/routes/runtime-artifacts.js";
import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Dispatches one eve authored schedule via the execution engine.
 *
 * Fire-and-forget: the workflow runtime owns terminal completion and
 * its own failure observability. The task return value reports which
 * session ids the handler started so Nitro / dev tools can correlate.
 */
export declare function dispatchScheduleTask(taskName: string, config: NitroArtifactsConfig): Promise<{
    scheduleId: string;
    sessionIds: readonly string[];
}>;
/**
 * Variant of {@link dispatchScheduleTask} for callers that already resolved
 * an artifact source and need the dispatch to stay on that generation.
 */
export declare function dispatchScheduleTaskFromArtifacts(taskName: string, compiledArtifactsSource: RuntimeCompiledArtifactsSource): Promise<{
    scheduleId: string;
    sessionIds: readonly string[];
}>;
