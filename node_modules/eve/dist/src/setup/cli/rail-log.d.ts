import type { Writable } from "node:stream";
import type { ChannelSetupLog } from "./channel-setup-prompter.js";
import { type PromptColors } from "./prompt-ui.js";
interface PromptOutput extends Writable {
    readonly isTTY?: boolean;
    readonly columns?: number;
}
/**
 * A running spinner anchored to the rail. Call {@link RailSpinner.stop}
 * once the awaited work settles to remove it; the call is idempotent.
 */
export interface RailSpinner {
    /** Stops the animation and erases the spinner so the next output starts clean. */
    stop(): void;
}
/**
 * Spinner frames cycled by {@link RailLog.spinner}: a single braille cell that
 * "breathes". Each frame lights or clears exactly one dot, walking between a
 * sparse and a near-full cell and back. The walk never reaches the solid cell
 * and the sequence is a closed loop (every step, including the wrap from the
 * last frame to the first, changes by one dot), so it reads as continuous
 * motion instead of something that fills up and stops. Frozen as a static
 * sequence so the frames stay deterministic and testable; the invariant is
 * checked in the colocated test.
 */
export declare const SPINNER_FRAMES: readonly ["⠨", "⠸", "⢸", "⢺", "⢾", "⢿", "⢾", "⢼", "⢸", "⠸", "⠨", "⠪", "⠮", "⠯", "⢯", "⢿", "⠿", "⠾", "⠺", "⠪"];
/** Delay between spinner frames. ~8 fps reads as a calm pulse. */
export declare const SPINNER_FRAME_MS = 120;
/** A rail log whose current command detail can be cleared before the next prompt is drawn. */
export interface RailLog extends ChannelSetupLog {
    section?(title: string, lines: readonly string[]): void;
    /**
     * Shows a section-like spinner (leading rail + a breathing braille cell +
     * message) while a network or other async wait is in flight, then clears it
     * on {@link RailSpinner.stop} so it leaves no trace. Non-TTY output prints the
     * message once and the returned `stop` is a no-op.
     */
    spinner(message: string): RailSpinner;
    settle(): void;
}
/** Options for the shared live rail log used by both eve onboarding entry points. */
export interface RailLogOptions {
    colors: PromptColors;
    output: PromptOutput;
}
/**
 * Renders setup status rows above a single {@link LiveRegion}. Committed lines
 * scroll away; the spinner and the latest command-output line are the region's
 * live rows. Warnings and errors commit the captured command transcript first.
 * Non-TTY output is append-only because cursor redraws would corrupt captured logs.
 */
export declare function createRailLog(options: RailLogOptions): RailLog;
export {};
