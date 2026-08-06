/** The one-cell pulse used while `eve dev` builds an agent. */
export declare const PROGRESS_PULSE_GLYPH = "\u25AA";
/** Single-cell fallback for terminals without Unicode glyph support. */
export declare const PROGRESS_PULSE_ASCII_GLYPH = "*";
/** Lit and unlit steps in the build indicator's one-second loop. */
export declare const PROGRESS_PULSE_SEQUENCE = "1111110000111111";
/** Duration of one complete build-indicator pulse. */
export declare const PROGRESS_PULSE_DURATION_MS = 1000;
/** Whether the shared build pulse is lit at an elapsed time. */
export declare function isProgressPulseVisible(elapsedMs: number): boolean;
