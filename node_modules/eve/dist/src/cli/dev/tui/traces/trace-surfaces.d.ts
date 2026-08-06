/**
 * Card surfaces for the `/traces` viewer, derived from the terminal's own
 * background color (the OSC 11 probe) so they look native in any theme: a
 * dark background gets slightly lighter bands, a light background slightly
 * darker ones, and error bands blend toward red from either side. When the
 * terminal never answers the probe, the viewer falls back to gutter rails.
 */
import type { RgbColor } from "../terminal-background.js";
/** Truecolor background opens (`ESC[48;2;…m`) for the viewer's card bands. */
export interface TraceViewerSurfaces {
    /** Card title band. */
    readonly header: string;
    /** Card body band, slightly more elevated than the header. */
    readonly body: string;
    readonly errorHeader: string;
    readonly errorBody: string;
    /**
     * Style for primary text over the surfaces (card titles, selection bar,
     * toast): truecolor white on dark backgrounds, truecolor black on light
     * ones. The theme's fixed bright-white primary assumes a dark terminal
     * and washes out on light backgrounds.
     */
    readonly primaryText: (text: string) => string;
    /**
     * Style for secondary text (control hints, header metadata, drawer
     * labels): a truecolor grey blended from the probed background toward the
     * primary, so muted text keeps guaranteed contrast on any background.
     */
    readonly mutedText: (text: string) => string;
}
/** Closes a surface, restoring the terminal's default background. */
export declare const SURFACE_CLOSE = "\u001B[49m";
/**
 * Derives the viewer's card surfaces from the terminal's background color.
 * Everything — bands and text styles alike — is truecolor: palette colors
 * (SGR 30/97) and SGR dim are theme-remappable, so a terminal like ghostty
 * can render them without contrast against the very background it reported.
 * Truecolor is exempt from palette remapping and always lands as derived.
 */
export declare function deriveTraceViewerSurfaces(background: RgbColor): TraceViewerSurfaces;
