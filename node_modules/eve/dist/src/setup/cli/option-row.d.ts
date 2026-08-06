/**
 * The one option-row painter shared by every picker — the CLI prompts
 * (`prompt-ui.ts`) and the dev TUI flow panel (`setup-panel.ts`). Both surfaces
 * render the same `PromptOption` shape and drive the same `select-state`
 * reducer; this module is the single place the row itself is drawn, so glyphs,
 * state styling, and hint alignment never drift between surfaces again.
 *
 * One glyph column encodes the row's state and the icon changes on hover — the
 * cursor never occupies its own column. Callers supply their own color and
 * glyph primitives (the TUI from its theme, the CLI from picocolors), but the
 * layout and state logic live here.
 */
/** The color primitives the row painter needs; satisfied by both the TUI theme and the CLI palette. */
export interface RowColors {
    blue(text: string): string;
    dim(text: string): string;
    green(text: string): string;
    inverse(text: string): string;
    yellow(text: string): string;
}
/** The glyphs the row painter draws; the TUI passes theme-derived values, the CLI the unicode set. */
export interface RowGlyphs {
    /** Hollow cursor marker for an inert row. */
    pointer: string;
    /** Filled cursor marker for an actionable row. */
    selectedPointer: string;
    /** Completed / checked marker. */
    success: string;
    /** Available, un-hovered marker. */
    placeholder: string;
    /** Separator before an inline hint. */
    dot: string;
    /** Attention marker for an unavailable option with actionable guidance. */
    warning: string;
}
/** Canonical unicode glyphs; the CLI prompts render with these. */
export declare const UNICODE_ROW_GLYPHS: RowGlyphs;
export type OptionRowState = {
    kind: "available";
    checked: boolean;
} | {
    kind: "completed";
} | {
    kind: "disabled";
    reason?: string;
    reasonTone?: "warning";
} | {
    kind: "locked";
    reason?: string;
};
interface OptionRowInput {
    colors: RowColors;
    glyphs: RowGlyphs;
    label: string;
    /** Inline annotation shown whenever the row is in view. */
    hint?: string;
    /** Inline annotation shown only while the cursor is on this row. */
    focusHint?: string;
    isCursor: boolean;
    state: OptionRowState;
    /** Whether an un-hovered, selectable row draws the placeholder glyph. */
    placeholder: boolean;
    /** Spaces inserted before the hint's dot so hints tab-align to a shared column. */
    hintPadding?: number;
    /**
     * Accent for an available row. "warning" keeps an attention row yellow at
     * rest and under the cursor highlight.
     */
    accent?: "warning";
}
/**
 * Resolves legacy option flags into one render state. The public prompt shape
 * remains ergonomic for callers, while contradictory row semantics fail at
 * this boundary instead of producing a glyph from one flag and a label from
 * another.
 */
export declare function resolveOptionRowState(option: {
    disabled?: boolean;
    disabledReason?: string;
    disabledReasonTone?: "warning";
    completed?: boolean;
    locked?: boolean;
    lockedReason?: string;
}, checked: boolean): OptionRowState;
/** Paints a row with the shared leading cell and optional cursor highlight. */
export declare function renderCursorRow(text: string, selected: boolean, colors: Pick<RowColors, "blue" | "inverse" | "yellow">, accent?: "warning"): string;
/** Prefixes a continuation line so its text starts in the option label column. */
export declare function renderOptionRowContinuation(text: string): string;
/**
 * Paints one option row as `glyph label · hint`. The glyph reflects state with
 * hover taking precedence for focusable rows: available rows use the active
 * pointer, completed and disabled rows use an inert pointer, and locked rows
 * retain their mandatory-selection check. The hint rides the same dot-aligned
 * column for every row, whether it is persistent or cursor-only.
 */
export declare function renderOptionRow(input: OptionRowInput): string;
export {};
