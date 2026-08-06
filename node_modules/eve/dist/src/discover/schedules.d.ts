import type { DiscoverDiagnostic } from "#discover/diagnostics.js";
import type { ScheduleSourceRef } from "#discover/manifest.js";
import type { ProjectSource, ProjectSourceEntry } from "#discover/project-source.js";
/**
 * Diagnostic emitted when the authored `schedules/` root exists but is not
 * a directory.
 */
export declare const DISCOVER_SCHEDULES_DIRECTORY_INVALID = "discover/schedules-directory-invalid";
/**
 * Diagnostic emitted when discovery finds a file under `schedules/` that
 * is neither an authored module nor a markdown schedule.
 */
export declare const DISCOVER_SCHEDULE_FILE_UNSUPPORTED = "discover/schedule-file-unsupported";
/**
 * Input for discovering authored schedules under `schedules/`.
 */
interface DiscoverScheduleSourcesInput {
    agentRoot: string;
    rootEntries: readonly ProjectSourceEntry[];
    source: ProjectSource;
}
/**
 * Result of discovering authored schedules under `schedules/`.
 */
interface DiscoverScheduleSourcesResult {
    diagnostics: DiscoverDiagnostic[];
    schedules: ScheduleSourceRef[];
}
/**
 * Discovers authored schedule sources under `schedules/`. Schedules are
 * single files: either `<name>.{ts,...}` (with `defineSchedule({...})` as
 * the default export) or `<name>.md` (with frontmatter declaring `cron`).
 * Recursive nesting is supported; the schedule name is derived from the
 * relative path under `schedules/` minus the file extension
 * (`schedules/billing/invoice-sweep.ts` → `billing/invoice-sweep`).
 */
export declare function discoverScheduleSources(input: DiscoverScheduleSourcesInput): Promise<DiscoverScheduleSourcesResult>;
export {};
