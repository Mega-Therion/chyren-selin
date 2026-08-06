import type { SessionAuthContext } from "#channel/types.js";
/**
 * Framework-owned principal used when a schedule runs on behalf of the agent.
 */
export declare const SCHEDULE_APP_AUTH: SessionAuthContext;
/** Returns whether the current request is authenticated as eve's schedule principal. */
export declare function isScheduleAppAuth(auth: SessionAuthContext | null | undefined): auth is SessionAuthContext;
