import { type OutputSink, type SetupBox } from "./step.js";
/** Outcome of an interactive run over a set of boxes. */
export type RunResult<State> = {
    kind: "done";
    state: State;
} | {
    kind: "cancelled";
};
/**
 * Thrown by a box's `perform` when the failure is recoverable by re-gathering
 * and retrying the same box (e.g. a transient `vercel` command failure). Any
 * other error propagates and aborts the run.
 */
export declare class RetryableSetupError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
/**
 * The boxes a runner composes are heterogeneous in their `Input`/`Payload`.
 * Erasing both to `unknown` keeps composition type-safe: method parameters are
 * checked bivariantly, so a fully-typed box is assignable here, while input
 * flows gather -> perform and payload flows perform -> apply within one box.
 */
export type AnySetupBox<State> = SetupBox<State, unknown, unknown>;
/** Options shared by both runners. */
export interface RunnerOptions<State> {
    /**
     * Builds the read-only view handed to `shouldRun`, the gather faces, and
     * `perform`. Pass a deep-freezing snapshot (e.g. `snapshotSetupState`) so a
     * box mutating anything but `apply`'s return value fails loudly at runtime.
     * Defaults to the raw state.
     */
    snapshot?: (state: State) => State;
    /** Cancels the active gather/perform operation and prevents later boxes from starting. */
    signal?: AbortSignal;
}
/**
 * Linear interactive runner: walk the boxes in order, prompting for each. A box
 * whose `perform` throws a {@link RetryableSetupError} is re-gathered with the
 * prior input as the default; a cancel (a {@link WizardCancelledError} thrown
 * by a prompter) ends the whole run. There is no back navigation: side effects
 * are not undone by restoring in-memory state.
 */
export declare function runInteractive<State>(boxes: readonly AnySetupBox<State>[], initialState: State, sink: OutputSink, options?: RunnerOptions<State>): Promise<RunResult<State>>;
/**
 * Non-interactive runner: derive each box's input from its options and apply
 * it. No retry loop and no prompts; a box that cannot proceed without a human
 * is expected to throw from its gather (a unified box's headless-based asker
 * refuses required questions with `InteractionRequired`) or from `perform`.
 */
export declare function runHeadless<State>(boxes: readonly AnySetupBox<State>[], initialState: State, sink: OutputSink, options?: RunnerOptions<State>): Promise<State>;
