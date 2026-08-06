import type { DevelopmentServer, DevelopmentServerOptions, StartedDevelopmentServer } from "#internal/nitro/host/types.js";
import { normalizeDevelopmentServerClientUrl } from "#internal/nitro/host/dev-server-url.js";
export { normalizeDevelopmentServerClientUrl };
/**
 * Returns whether a supplied URL identifies this app's healthy local development
 * server. Only that server receives the local TUI credential path.
 */
export declare function isActiveDevelopmentServerForApp(input: {
    readonly appRoot: string;
    readonly serverUrl: string;
}): Promise<boolean>;
/**
 * Creates a development server for an eve application. Call `start()` to boot an
 * owned Nitro server or attach to a running owner, and `close()` to tear down a
 * server this instance started. `close()` waits for an in-progress `start()`,
 * resolves after failed-start cleanup, and is a no-op when it attached to an
 * existing owner or was never started.
 *
 * Authored schedules are never registered with Nitro's cron scheduler in dev
 * mode. To fire one authored schedule on demand, `POST` the dev-only
 * `/eve/v1/dev/schedules/:scheduleId` route — the handler returns
 * `{ scheduleId, sessionIds }` so callers can subscribe to the existing
 * per-session stream route.
 */
export declare function createDevelopmentServer(rootDir: string, options?: DevelopmentServerOptions & {
    existing?: "reject";
}): DevelopmentServer<StartedDevelopmentServer>;
export declare function createDevelopmentServer(rootDir: string, options?: DevelopmentServerOptions): DevelopmentServer;
