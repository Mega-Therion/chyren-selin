/**
 * Best-effort clipboard writes for the dev TUI: an OSC 52 escape sequence
 * (which reaches the user's terminal even over SSH, with tmux/screen
 * passthrough) plus the platform's native clipboard command as a fallback
 * for terminals that reject OSC 52. Both paths fail silently — copying is
 * a convenience, never a hard dependency.
 */
/** The OSC 52 sequence for `text`, wrapped for tmux/screen when present. */
export declare function clipboardSequence(text: string, env?: Readonly<Record<string, string | undefined>>): string;
/** The native clipboard command for a platform, or `undefined` when unknown. */
export declare function clipboardCommand(platform: NodeJS.Platform, env?: Readonly<Record<string, string | undefined>>): readonly string[] | undefined;
/**
 * Copies `text` to the clipboard: emits OSC 52 through `writeTerminal`
 * (the same raw write the alt screen paints with) and pipes the text into
 * the platform clipboard command in the background.
 */
export declare function copyTextToClipboard(text: string, writeTerminal: (chunk: string) => void): void;
