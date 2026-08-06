/**
 * Condensed display form of the dev server's rebuild lifecycle. The renderer
 * cycles these strings through one in-place status block instead of stacking
 * the watcher's full log lines: changed paths shrink to their last two
 * components and each lifecycle phase renders as one short clause.
 */
import type { WatcherChangeEvent } from "#internal/nitro/host/dev-watcher-log.js";
export type DevRebuildPhase = "rebuilding" | "rebuilt" | "reloading";
/**
 * Summarizes one batch of watcher change events as `<paths> <verb>` — e.g.
 * `tui/setup-panel.ts changed`. Paths shrink to their last two components,
 * duplicates collapse, and everything past {@link MAX_SUMMARY_PATHS} folds
 * into a `+N more` (combined with `more`, the count the watcher already
 * truncated from its own log line).
 */
export declare function summarizeChangedFiles(events: readonly WatcherChangeEvent[], more: number): string;
/**
 * Renders the status line body for one lifecycle phase, e.g.
 * `tui/setup-panel.ts changed · rebuilding…`.
 */
export declare function formatDevRebuildStatus(summary: string, phase: DevRebuildPhase): string;
