import { z } from "#compiled/zod/index.js";
export declare const SLEEP_TOOL_DESCRIPTION = "Wait for a specified amount of time before continuing. Use this when a process or condition needs time to change before it is useful to check its progress or status again.";
export declare const SLEEP_INPUT_SCHEMA: z.ZodObject<{
    seconds: z.ZodNumber;
}, z.core.$strict>;
export declare const SLEEP_OUTPUT_SCHEMA: z.ZodObject<{
    waitedSeconds: z.ZodNumber;
}, z.core.$strict>;
export type SleepToolInput = z.infer<typeof SLEEP_INPUT_SCHEMA>;
export type SleepToolOutput = z.infer<typeof SLEEP_OUTPUT_SCHEMA>;
/**
 * Records a durable wait for the owning turn workflow to fulfill after the
 * current atomic step finishes.
 */
export declare function executeSleepTool(input: SleepToolInput): SleepToolOutput;
