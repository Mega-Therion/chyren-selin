import type { DevelopmentNitroArtifactsConfig } from "#internal/nitro/routes/runtime-artifacts.js";
/**
 * Builds the dev-only dispatch response for one authored schedule.
 *
 * Only mounted by `configure-nitro-routes.ts` when Nitro is running in
 * dev mode — production builds never see this handler. The handler reads
 * the schedule id straight off the request URL, hands off to
 * `dispatchScheduleInDev` for the production-equivalent dispatch path,
 * and returns `{ scheduleId, sessionIds }` so callers can subscribe to
 * the existing per-session stream route for each id.
 *
 * Auth: none. The dev server is local-only and the route is dev-only.
 */
export declare function handleDevScheduleDispatchRequest(input: DevelopmentNitroArtifactsConfig, request: Request): Promise<Response>;
