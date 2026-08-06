/**
 * Playful spinner copy for the slow network waits in setup. Pools are keyed by
 * task on purpose: every message still names the step it belongs to, so when a
 * wait hangs (or a Connect timeout fires) the preceding line tells the user
 * which step is stuck. `{detail}` is replaced by the call site's specifics,
 * e.g. a team slug.
 */
export type WhimsyTask = "auth" | "teams" | "projects" | "project-name" | "project-detect";
/**
 * Picks one message from the task's pool, never the same one twice in a row.
 * `pick` is injectable so tests (or deterministic contexts) can pin the
 * choice; the default rolls per call.
 */
export declare function whimsyFor(task: WhimsyTask, detail?: string, pick?: () => number): string;
/** Exposed so tests can assert membership instead of pinning one phrasing. */
export declare const WHIMSY_POOLS: Record<WhimsyTask, readonly string[]>;
