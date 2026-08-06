/**
 * Visual language for the `eve dev` terminal UI.
 *
 * The palette and iconography follow the Vercel / Next.js CLI: a monochrome
 * base (bold white primary, dim gray secondary) anchored by the `▲` brand
 * mark, with restrained accent colors reserved for status — green `✓`, red
 * `⨯`, yellow `⚠`/spinner — and cyan for interactive/link text. Everything
 * here is pure string composition so blocks, the live region, and the agent
 * header can share one source of truth for glyphs and color.
 */
type Style = (text: string) => string;
/**
 * Named color + emphasis formatters. Each wraps text in the matching SGR
 * sequence (or returns it untouched when color is disabled).
 */
export interface ThemeColors {
    reset: Style;
    bold: Style;
    dim: Style;
    /** Reverse video (SGR 7), used to draw the block caret over the character under it. */
    inverse: Style;
    italic: Style;
    white: Style;
    gray: Style;
    cyan: Style;
    green: Style;
    red: Style;
    yellow: Style;
    magenta: Style;
    blue: Style;
    /** Vercel-orange accent (xterm-256 208), used for nested subagent regions. */
    orange: Style;
}
/**
 * Resolved glyphs for the current terminal (Unicode by default, ASCII when
 * the terminal can't be trusted with wide/box-drawing characters).
 */
export interface ThemeGlyphs {
    /** `▲` — the Vercel/eve brand mark; prefixes the agent's own output. */
    brand: string;
    /** `│` — left gutter bar marking a user message. */
    user: string;
    /** `○` — reasoning / "thinking" marker (Next.js "wait" glyph). */
    reasoning: string;
    /** `▪` — static tool-activity mark (the settled form of the activity pulse). */
    square: string;
    /** `└` — closes a `│`-railed detail region under a tool header. */
    corner: string;
    /** `┌` — opens a region; pairs with `corner` at session boundaries. */
    cornerOpen: string;
    /** `⌝` — marks a provider endpoint authored in the agent's own code. */
    external: string;
    /** `⏺` — the in-progress todo item (pulses while the turn runs). */
    dotActive: string;
    /** `✓` — a completed tool or success state. */
    success: string;
    /** `⨯` — an error or failed tool. */
    error: string;
    /** `⚠` — a warning / attention state. */
    warning: string;
    /** `※` — a subagent region header. */
    subagent: string;
    /** `│` — vertical rule drawn in the gutter to nest subagent output. */
    rule: string;
    /** `?` — an interactive question awaiting an answer. */
    question: string;
    /** `●` — a connection awaiting authorization. */
    connection: string;
    /** `→` — separates a tool call from its summarized result. */
    arrow: string;
    /** `▷` — cursor marker for an inert option. */
    pointer: string;
    /** `▶` — cursor marker for an actionable option. */
    selectedPointer: string;
    /** `◦` — available, unselected option marker. */
    option: string;
    /** `❯` — the input prompt mark. */
    prompt: string;
    /** `›` — the prompt mark's quiet form while the buffer is empty. */
    promptIdle: string;
    /** `⎿` — hangs a command's result under its invocation. */
    elbow: string;
    /** `▔` — strong full-width rule opening the bottom question panel. */
    hrule: string;
    /** `─` — light rule segment framing the end-of-turn stats line. */
    dash: string;
    /** `▏` — the synthetic input caret. */
    caret: string;
    /** `·` — inline separator for header / status segments. */
    dot: string;
    /** `…` — truncation marker. */
    ellipsis: string;
    /** `↑` — input (prompt) tokens in the token-flow segment. */
    arrowUp: string;
    /** `↓` — output (response) tokens in the token-flow segment. */
    arrowDown: string;
    /** `↯` — Fast mode (Gateway priority tier) marker beside a model id. */
    fast: string;
    /** `●` — a track notch below the current position (already covered). */
    trackFilled: string;
    /** `◉` — the track notch at the current position. */
    trackCurrent: string;
    /** `○` — a track notch above the current position. */
    trackEmpty: string;
    /** `─` — the connector segment between track notches. */
    trackLine: string;
    /** `↵` — the Enter affordance inside a selection badge. */
    enter: string;
    /** `▪` — the marker beside an in-flight validation badge. */
    validating: string;
}
export interface Theme {
    readonly color: boolean;
    readonly unicode: boolean;
    readonly colors: ThemeColors;
    readonly glyph: ThemeGlyphs;
    readonly spinner: readonly string[];
}
export interface CreateThemeOptions {
    /** Whether to emit ANSI color. Defaults to `true`. */
    color?: boolean;
    /** Whether the terminal renders Unicode glyphs. Defaults to `true`. */
    unicode?: boolean;
}
/**
 * Builds the active {@link Theme}. Detection is intentionally left to the
 * caller (the renderer knows whether it owns a real TTY); this keeps the
 * theme a pure value that tests can construct deterministically.
 */
export declare function createTheme(options?: CreateThemeOptions): Theme;
/**
 * Detects whether the host terminal can be trusted with Unicode glyphs.
 * Conservative: Windows legacy consoles and dumb terminals fall back to
 * ASCII. Honors an explicit override via `EVE_TUI_UNICODE=0|1`.
 */
export declare function detectUnicode(env?: NodeJS.ProcessEnv): boolean;
export {};
