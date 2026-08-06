/**
 * Pure helpers shared by the terminal renderer: key parsing and status-text
 * formatting. Kept apart from the renderer so the presentation class stays
 * focused on painting.
 */
import type { AssistantResponseStatsMode } from "./types.js";
export type TerminalKey = {
    type: "text";
    value: string;
    /** Terminal framing, not proof that the text came from a physical keypress. */
    framing: "unframed" | "bracketed-paste";
} | {
    type: "newline";
} | {
    type: "backspace";
} | {
    type: "delete";
} | {
    type: "enter";
} | {
    type: "up";
} | {
    type: "down";
} | {
    type: "left";
} | {
    type: "right";
} | {
    type: "home";
} | {
    type: "end";
} | {
    type: "tab";
} | {
    type: "escape";
} | {
    type: "mouse";
    action: "press" | "release";
    /** SGR button code (0 = left). */
    button: number;
    /** 1-based terminal cell coordinates. */
    x: number;
    y: number;
} | {
    type: "ctrl-a";
} | {
    type: "ctrl-e";
} | {
    type: "ctrl-d";
} | {
    type: "ctrl-k";
} | {
    type: "ctrl-n";
} | {
    type: "ctrl-p";
} | {
    type: "ctrl-u";
} | {
    type: "ctrl-w";
} | {
    type: "ctrl-l";
} | {
    type: "ctrl-r";
} | {
    type: "ctrl-c";
} | {
    /**
     * An OSC sequence from the terminal (`ESC ] … BEL`/`ST`) — a reply to a
     * query such as the OSC 11 background-color probe, never a keypress.
     * `value` is the payload between the opener and the terminator.
     */
    type: "osc";
    value: string;
} | {
    type: "ignore";
};
/** One decoded key plus the UTF-16 code units it consumed from the input buffer. */
export interface KeyToken {
    key?: TerminalKey;
    consumed: number;
    /** The buffer ends mid-sequence; wait for more bytes before decoding. */
    incomplete?: boolean;
}
/**
 * Preserves newlines and tabs, normalizes CR to LF, and drops C0, DEL, and C1
 * controls. The first end marker closes the frame. This prevents escape
 * injection, not display spoofing by bidi or zero-width characters.
 */
export declare function sanitizePastedText(text: string): string;
/**
 * True when `buffer` is a bracketed paste whose closing marker hasn't arrived.
 * {@link nextKey} reports such a buffer as `incomplete` indefinitely, so the
 * caller needs this to recover if the end marker never comes (a process that
 * emits a bare start marker and dies, a malformed terminal).
 */
export declare function isIncompletePaste(buffer: string): boolean;
/** Drops a leading bracketed-paste start marker, leaving the buffered payload. */
export declare function stripPasteStart(buffer: string): string;
/**
 * True when `buffer` opens an OSC sequence whose terminator hasn't arrived.
 * {@link nextKey} reports such a buffer as `incomplete` indefinitely, so the
 * caller needs this to recover if the terminator never comes.
 */
export declare function isIncompleteOsc(buffer: string): boolean;
/** Removes C0 control characters and DEL from text intended for the prompt. */
export declare function stripPromptControlCharacters(text: string): string;
/**
 * Decodes the next key from a raw input buffer, returning how many characters
 * it consumed so a caller can reassemble escape sequences that arrive split
 * across reads (common with PTYs and under load). Returns `incomplete` when the
 * buffer holds only a prefix of a longer sequence (a lone `ESC`, or a CSI/SS3
 * without its final byte) so the caller can wait for the rest.
 */
export declare function nextKey(buffer: string): KeyToken;
export declare function parseKey(chunk: Buffer): TerminalKey;
export interface AssistantResponseStats {
    totalTokens: number | undefined;
    outputTokens: number | undefined;
    tokensPerSecond: number | undefined;
}
export declare function takeUntil<T>(source: AsyncIterable<T>, stop: Promise<void>): AsyncIterable<T>;
/** `394.4K`-style compact count: plain below 1000, then K/M with one trimmed decimal. */
export declare function formatCompactTokenCount(count: number): string;
/**
 * Reveals `text` one character per `stepMs` of elapsed time, typewriter
 * style: the first character shows immediately, the full text after
 * `(length - 1) * stepMs`. Painted on the shared ticker beat, so no timer
 * of its own.
 */
export declare function typewriterText(text: string, elapsedMs: number, stepMs: number): string;
/**
 * Formats a turn's wall-clock duration for the end-of-turn stats line:
 * `42s`, `3min 24s`, `1h 12min`. Sub-second turns round up to `1s` — a
 * `0s` coda would read as a measurement error.
 */
export declare function formatTurnDuration(elapsedMs: number): string;
/**
 * The turn bar and coda's token-flow segment: `↑ 394.4K ↓ 4.3K`, input
 * (prompt) tokens up, output tokens down. A known `--context-size` appends
 * the context-fill percentage of the input side.
 */
export declare function formatTokenFlow(flow: {
    inputTokens: number;
    outputTokens: number;
    contextSize?: number;
}, glyph: {
    arrowUp: string;
    arrowDown: string;
}): string;
export declare function formatAssistantResponseStats(stats: AssistantResponseStats, mode: AssistantResponseStatsMode): string | undefined;
