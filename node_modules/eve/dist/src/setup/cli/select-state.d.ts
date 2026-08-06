import type { PromptOption } from "./prompt-ui.js";
/**
 * Snapshot of the select interaction, advanced by {@link reduceSelect}. `cursor`
 * indexes the visible (filtered) list; `selected` holds the marked values for a
 * multi-select (a single-select reads the cursor's option at submit instead).
 */
export interface SelectState {
    filter: string;
    cursor: number;
    selected: Set<string>;
}
/** A virtual row appended to local matches for a non-empty type-ahead query. */
export interface SearchActionOption {
    label(query: string): string;
}
/** Encodes the query behind a virtual search action for picker transport. */
export declare function searchActionValue(query: string): string;
/** Reads a query from a virtual search action value. */
export declare function searchActionQuery(value: string): string | undefined;
/** Keyboard intents the select reducer understands. */
export type SelectEvent = {
    type: "char";
    char: string;
} | {
    type: "backspace";
} | {
    type: "clear";
} | {
    type: "up";
} | {
    type: "down";
} | {
    type: "toggle";
};
/** Inputs that stay fixed across a single select session. */
export interface SelectContext {
    /** Selectable entries, including any disabled ones (the cursor skips them). */
    options: readonly PromptOption<string>[];
    /** Optional virtual row appended to local matches for a non-empty query. */
    searchAction?: SearchActionOption;
    /**
     * Appends a virtual Submit row after the visible options. The cursor can
     * land on it (index `visible.length`, see {@link submitRowIndex}) but it
     * carries no value: `toggle` ignores it and {@link selectValueAtCursor}
     * reads `undefined`. Multi-selects use it as the explicit confirm target.
     */
    submitRow?: boolean;
}
/** Cursor index of the virtual Submit row: one past the visible options. */
export declare function submitRowIndex(visible: readonly PromptOption<string>[]): number;
/**
 * Case-insensitive substring match across an option's label, value, and hints.
 * An empty query returns every option, so the cursor can always scroll the
 * full list; `featured` only shapes the searchable picker's default viewport,
 * not which rows exist.
 */
export declare function filterOptions(options: readonly PromptOption<string>[], filter: string, searchAction?: SearchActionOption): PromptOption<string>[];
/**
 * Advances the interaction state for a single keypress.
 *
 * Editing the query (`char`/`backspace`) re-homes the cursor onto the first
 * selectable match but leaves marked values intact, so a multi-select keeps its
 * picks while the list is filtered. `toggle` (space) marks or unmarks the
 * highlighted entry; navigation skips disabled rows.
 */
export declare function reduceSelect(state: SelectState, event: SelectEvent, context: SelectContext): SelectState;
/**
 * Computes the starting state. The cursor lands on `defaultValue` when it
 * matches a focusable entry, otherwise on the first focusable entry.
 * `initialValues` seed a multi-select's marked set, as do any `locked` options:
 * locked rows are mandatory, so they start selected and the reducer refuses to
 * unmark them.
 */
export declare function initialSelectState(input: {
    options: readonly PromptOption<string>[];
    filter?: string;
    defaultValue?: string;
    initialValues?: readonly string[];
    searchAction?: SearchActionOption;
    submitRow?: boolean;
}): SelectState;
/** Value of the highlighted actionable entry, or `undefined` otherwise. */
export declare function selectValueAtCursor(visible: readonly PromptOption<string>[], cursor: number): string | undefined;
/** Marked values, ordered to match the option list rather than toggle order. */
export declare function orderedSelection(options: readonly PromptOption<string>[], selected: ReadonlySet<string>): string[];
