import type { Prompter } from "./prompter.js";
/** Runs asynchronous work behind an optional spinner that always stops. */
export declare function withSpinner<T>(prompter: Prompter, message: string, task: () => Promise<T>): Promise<T>;
