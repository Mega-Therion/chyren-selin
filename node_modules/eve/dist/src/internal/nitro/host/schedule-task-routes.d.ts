import type { Nitro } from "nitro/types";
import { type ScheduleRegistration } from "#runtime/schedules/register.js";
import type { NitroArtifactsConfig } from "#internal/nitro/routes/runtime-artifacts.js";
interface ScheduleTaskNitro {
    options: Pick<Nitro["options"], "experimental" | "scheduledTasks" | "tasks" | "virtual">;
}
/**
 * Inputs needed to wire one set of compiled authored schedules into Nitro's
 * task and cron surfaces.
 *
 * `dispatchModulePath` is the absolute path of `dispatchScheduleTask`'s
 * module — the synthetic task module imports it and forwards `event.name`
 * along with the baked-in artifacts config.
 */
export interface RegisterScheduleTaskHandlersInput {
    readonly artifactsConfig: NitroArtifactsConfig;
    readonly dispatchModulePath: string;
    readonly registrations: readonly ScheduleRegistration[];
}
/**
 * Inputs needed to reconcile schedule task handlers when authored sources
 * change in dev mode.
 */
export interface SyncScheduleTaskHandlersInput {
    readonly artifactsConfig: NitroArtifactsConfig;
    readonly dispatchModulePath: string;
    readonly next: readonly ScheduleRegistration[];
    readonly previous: readonly ScheduleRegistration[];
}
/**
 * Registers compiled authored schedules as virtual Nitro task handlers.
 *
 * Each registration becomes:
 *   - one entry in `nitro.options.tasks` whose `handler` points at a virtual
 *     module that wraps `dispatchScheduleTask` in `defineTask({...})`,
 *   - one entry in `nitro.options.scheduledTasks[cron]` so Nitro's cron
 *     scheduler dispatches the task on schedule.
 *
 * The synthetic module is needed because Nitro requires task modules to
 * default-export an object with a `run` method. The dispatch implementation
 * (`dispatchScheduleTask`) is a plain async function — the virtual module
 * adapts it to Nitro's task contract while baking in the artifacts config so
 * the handler does not depend on a global runtime configuration store.
 */
export declare function registerScheduleTaskHandlers(nitro: ScheduleTaskNitro, input: RegisterScheduleTaskHandlersInput): void;
/**
 * Replaces the currently-registered eve schedule task handlers when the
 * compiled authored schedule set changes.
 *
 * Returns `true` when the registration set changed (and the caller should
 * trigger a Nitro rebuild reload), `false` when it was a structural no-op.
 */
export declare function syncScheduleTaskHandlers(nitro: ScheduleTaskNitro, input: SyncScheduleTaskHandlersInput): boolean;
/**
 * Removes every eve-owned schedule task entry, virtual handler module, and
 * cron entry from the Nitro options. Used by the dev watcher before
 * re-registering the latest compiled set.
 */
export declare function removeScheduleTaskHandlers(nitro: ScheduleTaskNitro): void;
export {};
