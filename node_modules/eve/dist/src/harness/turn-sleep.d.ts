import { type AlsContext } from "#context/container.js";
/**
 * Requests a durable pause before the turn's next action.
 *
 * The request is step-local: tool execution records it in virtual context,
 * then `turnStep` projects it onto its result for `turnWorkflow` to fulfill.
 * Concurrent sleep calls share the wait, so the longest requested duration
 * wins.
 */
export declare function requestTurnSleep(durationMs: number): void;
/** Returns the longest sleep requested during the current turn step. */
export declare function readTurnSleepDurationMs(ctx: AlsContext): number | undefined;
