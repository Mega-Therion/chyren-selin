import { type ToolDefinition } from "#public/definitions/tool.js";
import { type SleepToolInput, type SleepToolOutput } from "#runtime/framework-tools/sleep.js";
export type { SleepToolInput, SleepToolOutput };
/**
 * Defines eve's opt-in durable `sleep` tool.
 *
 * Export it from `agent/tools/sleep.ts`:
 *
 * ```ts
 * import { sleep } from "eve/tools/sleep";
 *
 * export default sleep();
 * ```
 *
 * Calls pause the durable turn workflow rather than holding an application
 * runtime open with an in-process timer.
 */
export declare function sleep(): ToolDefinition<SleepToolInput, SleepToolOutput>;
