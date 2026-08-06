import type { Writable } from "node:stream";
/** Terminal lifecycle state accepted by the shared prompt renderer. */
export type PromptState = "initial" | "active" | "submit" | "cancel" | "error";
/** Scalar values supported by shared prompt options. */
export type PromptValue = string | number | boolean;
/** Coloring operations used by prompt rendering without coupling to a color library. */
export interface PromptColors {
    blue(text: string): string;
    bold(text: string): string;
    cyan(text: string): string;
    dim(text: string): string;
    gray(text: string): string;
    green(text: string): string;
    inverse(text: string): string;
    red(text: string): string;
    strikethrough(text: string): string;
    white(text: string): string;
    yellow(text: string): string;
}
/** A selectable item rendered by the shared multi-select prompt. */
export interface PromptOption<T extends PromptValue> {
    value: T;
    label: string;
    /** Completion action kept after searchable results instead of being filtered. */
    trailingAction?: boolean;
    /** Supporting copy; stacked prompts render newline-separated text on separate rows. */
    hint?: string;
    /** Short inline annotation shown dimmed only while the cursor is on this row. */
    focusHint?: string;
    /**
     * Longer, display-only explanation for the highlighted option. Its prompt
     * chooses the placement; it is hidden once a choice is submitted.
     */
    description?: string;
    /** Row accent; "warning" stays yellow both at rest and under the cursor. */
    accent?: "warning";
    disabled?: boolean;
    disabledReason?: string;
    /**
     * "warning" renders the disabled reason in yellow with a dimmed (not struck)
     * label — unavailable here but actionable elsewhere, unlike the default
     * disabled styling, which marks a hard conflict.
     */
    disabledReasonTone?: "warning";
    /**
     * Completed work: renders with a check and remains cursor-addressable for
     * contextual feedback, but cannot be selected or toggled.
     */
    completed?: boolean;
    /**
     * Marks a mandatory row that is always selected and cannot be toggled off: the
     * cursor skips it and it renders a dimmed check. Mutually exclusive with
     * `disabled`, which marks an unavailable row.
     */
    locked?: boolean;
    /** Parenthetical shown after a locked row's label, e.g. "always available". */
    lockedReason?: string;
    /**
     * A leading run of featured options forms a searchable picker's default
     * viewport: with no filter typed, only they are in view, and scrolling or
     * filtering reaches the rest of the list. Featured options must be sorted
     * to the front. Meaningless without `search`.
     */
    featured?: boolean;
    /** Marks the currently-active value: renders a green check beside the row. */
    checked?: boolean;
}
/** Vertical rail glyph used by the onboarding-style terminal UI. */
export declare const RAIL = "\u2502";
/** Closing corner glyph used by the onboarding-style terminal UI. */
export declare const CORNER = "\u2514";
/** Renders the lifecycle marker shown at the prompt header. */
export declare function bulletFor(state: PromptState, colors: PromptColors): string;
/** Renders a rail with color determined by the prompt lifecycle state. */
export declare function railFor(state: PromptState, colors: PromptColors): string;
/** Renders a closing corner with color determined by the prompt lifecycle state. */
export declare function cornerFor(state: PromptState, colors: PromptColors): string;
/** Formats the rail-and-title header common to onboarding prompts. */
export declare function formatPromptHeader(state: PromptState, message: string, options: {
    colors: PromptColors;
    leadingRail?: "white" | "green";
}): string;
/**
 * Renders a resolved prompt as one line: the question dimmed and moved to the
 * front as a label, followed by the chosen answer. Replaces the two-line
 * "bullet + question" then "rail + answer" submit layout so completed steps
 * read compactly while keeping the bullet and leading rail that anchor the
 * step in the vertical chain. `answer` is expected to already carry its own
 * styling; the empty case drops the trailing space.
 */
export declare function formatPromptSubmission(state: PromptState, message: string, answer: string, options: {
    colors: PromptColors;
    leadingRail?: "white" | "green";
}): string;
/** Formats the banner that opens an onboarding-style interaction. */
export declare function formatPromptOpener(title: string, subtitle: string, colors: PromptColors): string;
/** Formats the successful closing message for an onboarding-style interaction. */
export declare function formatPromptOutro(message: string, colors: PromptColors): string;
/** Formats the cancellation closing message for an onboarding-style interaction. */
export declare function formatPromptCancellation(message: string, colors: PromptColors): string;
/** Formats receipt text under the successful rail and wraps it to the active terminal width. */
export declare function formatRailLine(text: string, colors: PromptColors, output: Writable | undefined): string;
/** Renders the shared multi-select interaction used when adding channels. */
export declare function renderMultiselectPrompt<T extends PromptValue>(input: {
    colors: PromptColors;
    cursor: number;
    error?: string;
    /** Status note tucked onto the corner line while active (e.g. a quit hint). */
    footerNote?: string;
    leadingRail?: "white" | "green";
    message: string;
    options: readonly PromptOption<T>[];
    selectedValues: readonly T[];
    state: PromptState;
    /** Submit-row label, e.g. "Skip" while an optional checklist is empty. */
    submitLabel?: string;
}): string;
/** Renders the shared single-select interaction used by channel setup. */
export declare function renderSelectPrompt<T extends PromptValue>(input: {
    colors: PromptColors;
    cursor: number;
    /** Status note tucked onto the corner line while active (e.g. a quit hint). */
    footerNote?: string;
    leadingRail?: "white" | "green";
    message: string;
    options: readonly PromptOption<T>[];
    state: PromptState;
}): string;
/**
 * Renders the virtual Submit row that closes every multi-select list. It has
 * no checkbox — its bold label sits in the checkbox column, trails a green
 * check, and uses the shared cursor highlight; enter confirms the checklist only
 * from here. The label reads "Skip" while an optional checklist has nothing
 * picked (the caller computes that), so an empty confirm is honest about what
 * it does. Callers put a blank rail line above it to set it apart from the
 * options.
 */
export declare function renderSubmitRow(isCursor: boolean, colors: PromptColors, label?: string): string;
/**
 * Renders the type-ahead select interaction: a filter line, a scrolling window
 * of options, and a mode-aware help line. Single-select marks the highlighted
 * row with the cursor arrow and submits it on enter; multi-select adds the
 * checkbox column, toggles rows with space or enter, and confirms from the
 * pinned Submit row (cursor index `options.length`). `options` is the
 * already-filtered visible list (with `cursor` indexing it); `submitDisplay`
 * is the precomputed answer shown once a choice is made.
 */
export declare function renderSearchableSelect<T extends PromptValue>(input: {
    colors: PromptColors;
    state: PromptState;
    leadingRail?: "white" | "green";
    message: string;
    multiple: boolean;
    filter: string;
    placeholder?: string;
    options: readonly PromptOption<T>[];
    cursor: number;
    selectedValues: readonly T[];
    submitDisplay: string;
    footerNote?: string;
    error?: string;
    viewSize?: number;
    /** Submit-row label, e.g. "Skip" while an optional checklist is empty. */
    submitLabel?: string;
}): string;
