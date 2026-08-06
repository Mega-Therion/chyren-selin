import type { ResolvedScheduleDefinition } from "#runtime/types.js";
/**
 * Stable Nitro task-name prefix for framework-owned authored schedules.
 */
export declare const EVE_SCHEDULE_TASK_NAME_PREFIX = "eve.schedule.";
/**
 * One compiled schedule registration consumed by the Nitro host wiring.
 */
export interface ScheduleRegistration {
    readonly cron: string;
    readonly description: string;
    readonly logicalPath: string;
    readonly scheduleId: string;
    readonly sourceId: string;
    readonly taskName: string;
}
/**
 * Error raised when authored schedules cannot be converted into stable runtime
 * registrations.
 */
export declare class ScheduleRegistrationError extends Error {
    readonly scheduleId?: string;
    readonly sourceId?: string;
    readonly taskName?: string;
    constructor(message: string, input?: {
        scheduleId?: string;
        sourceId?: string;
        taskName?: string;
    });
}
/**
 * Creates stable registration inputs for Nitro's task and cron surfaces from
 * resolved authored schedules.
 */
export declare function createScheduleRegistrations(schedules: readonly ResolvedScheduleDefinition[]): ScheduleRegistration[];
