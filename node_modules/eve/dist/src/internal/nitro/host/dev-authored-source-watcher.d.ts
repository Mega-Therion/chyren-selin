import type { PreparedDevelopmentApplicationHost } from "#internal/nitro/host/types.js";
import type { DevelopmentAuthoredRebuildCoordinator } from "#internal/nitro/host/dev-authored-rebuild-coordinator.js";
/**
 * Handle for the authored-source development watcher.
 */
export interface AuthoredSourceWatcherHandle {
    close(): Promise<void>;
    flush(): Promise<void>;
    rebuild(): Promise<void>;
    suspend(): Promise<void>;
    resume(options?: {
        silent?: boolean;
    }): Promise<void>;
}
/**
 * Starts the authored-source watcher used by `eve dev`.
 *
 * The watcher recompiles authored artifacts, refreshes runtime caches, and
 * triggers Nitro rebuild reloads only when structural runtime wiring changes.
 */
export declare function startAuthoredSourceWatcher(input: {
    coordinator: DevelopmentAuthoredRebuildCoordinator;
    preparedHost: PreparedDevelopmentApplicationHost;
}): Promise<AuthoredSourceWatcherHandle>;
