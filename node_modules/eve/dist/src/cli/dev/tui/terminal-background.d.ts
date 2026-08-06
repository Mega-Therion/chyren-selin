/**
 * OSC 11 terminal-background probe: the query sequence and the reply parser.
 *
 * Terminals answer `ESC ] 11 ; ? BEL` with their default background color,
 * which lets full-screen views derive elevated surfaces from the user's own
 * palette instead of hardcoding one. The reply arrives on stdin as an OSC
 * sequence (tokenized by `nextKey`); terminals that don't support the query
 * simply never answer, so callers must treat the color as optional.
 */
/** An sRGB color with 8-bit channels. */
export interface RgbColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
}
/** Asks the terminal for its default background color (OSC 11 query). */
export declare const BACKGROUND_COLOR_QUERY = "\u001B]11;?\u0007";
/**
 * Parses an OSC 11 reply payload (`11;rgb:RRRR/GGGG/BBBB`) into 8-bit
 * channels. The X11 color spec allows 1–4 hex digits per channel; each is
 * scaled by its own width. Returns `undefined` for anything else.
 */
export declare function parseBackgroundColorReply(payload: string): RgbColor | undefined;
