/**
 * Pure state and rendering for the prompt's slash-command typeahead: the
 * filtered suggestion list shown above the input while the draft looks like
 * the start of a command. The renderer owns keys and lifecycle; this module
 * owns which commands match, which row is highlighted, and what the rows
 * look like — so the whole interaction is unit-testable without a TTY.
 */
import type { PromptCommandSpec } from "./prompt-commands.js";
import type { Theme } from "./theme.js";
export interface CommandTypeaheadState {
    /** The prompt text the matches were derived from. */
    readonly query: string;
    readonly matches: readonly PromptCommandSpec[];
    readonly selectedIndex: number;
    /** Esc pressed; the list stays hidden until the query text changes. */
    readonly dismissed: boolean;
}
/**
 * Derives the typeahead for `text`, carrying the highlight and dismissal
 * over from `previous`. Commands match while the draft is a lone `/`-token
 * (no whitespace yet) prefixing a name or alias; an exact match stays in the
 * list so the highlight confirms what Enter will run. The previous highlight
 * survives narrowing by identity, not index; dismissal survives only while
 * the text is unchanged, so caret moves keep it and any edit reopens.
 */
export declare function typeaheadFor(commands: readonly PromptCommandSpec[], text: string, previous?: CommandTypeaheadState): CommandTypeaheadState;
/** True when the list should render and own the up/down/tab/enter keys. */
export declare function isTypeaheadOpen(state: CommandTypeaheadState): boolean;
/** Moves the highlight one row, wrapping at both ends. */
export declare function moveTypeaheadSelection(state: CommandTypeaheadState, delta: 1 | -1): CommandTypeaheadState;
/** Hides the list until the input text changes. */
export declare function dismissTypeahead(state: CommandTypeaheadState): CommandTypeaheadState;
/** The highlighted command, when the list has one. */
export declare function selectedTypeaheadCommand(state: CommandTypeaheadState): PromptCommandSpec | undefined;
/**
 * The editor text accepting `spec` produces: the canonical invocation, plus
 * a trailing space when the command takes an argument so the caret lands
 * ready for typing it.
 */
export declare function typeaheadCompletion(spec: PromptCommandSpec): string;
/**
 * When the draft is a complete command name or alias with exactly one match,
 * the dropdown collapses into an inline hint trailing the prompt row. Returns
 * the command's argument shape to paint dim after the input — an empty string
 * for argument-less commands, which still collapse the list — or `undefined`
 * when the list should render normally (partial draft, multiple matches, or a
 * dismissed list).
 */
export declare function inlineCommandHint(state: CommandTypeaheadState): string | undefined;
/**
 * Paints the suggestion rows (the select-question grammar): the highlight
 * carries the cursor glyph and inverse-blue name, every row shows its aliases and
 * description dim, and overflow windows around the highlight. The argument
 * hint is held back for the inline exact-match view ({@link inlineCommandHint})
 * — it only earns space once a single command is committed to.
 */
export declare function renderCommandSuggestions(state: CommandTypeaheadState, theme: Theme, width: number): string[];
