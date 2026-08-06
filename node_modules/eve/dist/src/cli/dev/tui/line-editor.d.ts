/**
 * A tiny, dependency-free line-editing model for the prompt input.
 *
 * The renderer owns the terminal; this module owns the *text* — buffer plus
 * caret position, where the buffer may carry embedded newlines — and exposes
 * pure transforms for the common readline-style edits (insert, delete,
 * word/line kill, cursor moves), a {@link visibleLine} helper that windows a
 * long line around the caret, and {@link layoutPromptInput} which splits a
 * multi-line buffer into logical rows. Keeping it pure makes the editing rules
 * trivial to unit test without a TTY.
 */
import type { TerminalKey } from "./stream-format.js";
/**
 * Editor text and a caret at a grapheme boundary, represented as a UTF-16
 * offset so it can be passed directly to `String.slice`.
 */
export interface LineState {
    readonly text: string;
    readonly cursor: number;
}
/** The empty editor buffer with the caret at offset 0. */
export declare const EMPTY_LINE: LineState;
/** Builds a line from `text` with the caret placed at the end. */
export declare function lineOf(text: string): LineState;
/** Masks each grapheme with one bullet while preserving the caret's grapheme position. */
export declare function maskLine(state: LineState): LineState;
/** Inserts `value` at the caret and advances the caret past it. */
export declare function insert(state: LineState, value: string): LineState;
/** Deletes the grapheme before the caret (Backspace). */
export declare function backspace(state: LineState): LineState;
/** Deletes the grapheme at the caret (Delete / Ctrl+D mid-line). */
export declare function deleteForward(state: LineState): LineState;
/** Moves the caret one grapheme left. */
export declare function moveLeft(state: LineState): LineState;
/** Moves the caret one grapheme right. */
export declare function moveRight(state: LineState): LineState;
/** Moves the caret to the start of the line (Home / Ctrl+A). */
export declare function moveHome(state: LineState): LineState;
/** Moves the caret to the end of the line (End / Ctrl+E). */
export declare function moveEnd(state: LineState): LineState;
/** Deletes from the caret to the end of the line (Ctrl+K). */
export declare function killToEnd(state: LineState): LineState;
/** Deletes from the start of the line to the caret (Ctrl+U). */
export declare function killToStart(state: LineState): LineState;
/** Deletes the whitespace-delimited word before the caret (Ctrl+W). */
export declare function deleteWord(state: LineState): LineState;
/** Options for {@link applyLineEditorKey}. */
interface LineEditorOptions {
    /** Single-line inputs flatten pasted newlines and ignore Shift+Enter. */
    readonly multiline?: boolean;
}
/**
 * Applies a key owned by the line editor. Returns `undefined` when the key
 * belongs to the surrounding controller (submit, cancel, history, menus), which
 * on a single-line input includes Shift+Enter.
 */
export declare function applyLineEditorKey(state: LineState, key: TerminalKey, options?: LineEditorOptions): LineState | undefined;
/**
 * The portion of `state.text` to draw within `budget` columns, split at the
 * caret so the renderer can highlight `under` without slicing a grapheme.
 * When the line is wider than `budget` it is windowed around the caret,
 * marking truncated ends with `…` so the caret is always visible.
 */
interface VisibleLine {
    readonly before: string;
    readonly under: string;
    readonly after: string;
}
export declare function visibleLine(state: LineState, budget: number, ellipsis?: string): VisibleLine;
/** One logical prompt row and the UTF-16 offset where it starts in the buffer. */
interface PromptLogicalRow {
    readonly text: string;
    readonly start: number;
}
/**
 * A multi-line prompt split into logical rows. `caretRow` indexes {@link rows};
 * `caretOffset` is a UTF-16 offset within that row.
 */
interface PromptLayout {
    readonly rows: PromptLogicalRow[];
    readonly caretRow: number;
    readonly caretOffset: number;
}
/**
 * Splits a prompt buffer on newlines and locates the caret. This function does
 * not measure terminal columns or wrap rows; the renderer windows each logical
 * row to the available width.
 */
export declare function layoutPromptInput(state: LineState): PromptLayout;
/** Moves to the adjacent logical line while preserving the terminal column where possible. */
export declare function movePromptLine(state: LineState, direction: "up" | "down"): LineState | undefined;
/**
 * In-memory, append-only prompt history with shell-style up/down navigation.
 *
 * Navigation is non-destructive: stepping back from the live line stashes the
 * in-progress draft and restores it when the user steps forward past the
 * newest entry. Consecutive duplicate submissions are collapsed.
 */
export declare class PromptHistory {
    #private;
    /** Records a submitted prompt (skips blanks and consecutive duplicates). */
    add(entry: string): void;
    /** Resets navigation to the live line, stashing `draft` as the in-progress text. */
    begin(draft: string): void;
    /** The previous (older) entry, or `undefined` at the oldest entry. */
    previous(currentDraft: string): string | undefined;
    /** The next (newer) entry, or the stashed draft once past the newest entry. */
    next(): string | undefined;
}
export {};
