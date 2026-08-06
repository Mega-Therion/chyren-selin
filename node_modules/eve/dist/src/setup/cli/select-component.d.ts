import { Prompt } from "@clack/core";
import { type PromptOption, type PromptValue } from "./prompt-ui.js";
import { type SearchActionOption, type SelectState } from "./select-state.js";
/**
 * A prompt's live status note (e.g. a two-stage quit guard), read on each
 * render. Returns `undefined` when there is nothing to show. Wired in by
 * {@link runSelectComponent} via its `attachGuard` hook.
 */
export interface SelectGuard {
    note(): string | undefined;
}
/**
 * Custom `@clack/core` `Prompt` backing every select picker. It adapts key
 * events to {@link reduceSelect} transitions and tracks the resolved value: the
 * highlighted option for single-select, the marked set for multi-select.
 * Filtering, multi-selection, and the cursor arrow are all driven by the
 * `search` and `multiple` flags, so one component covers every picker.
 */
export declare class SelectComponent extends Prompt<string | string[]> {
    readonly options: PromptOption<string>[];
    readonly multiple: boolean;
    readonly search: boolean;
    readonly searchAction: SearchActionOption | undefined;
    readonly required: boolean;
    filter: string;
    optionCursor: number;
    selectedSet: Set<string>;
    constructor(input: {
        options: PromptOption<string>[];
        multiple: boolean;
        search: boolean;
        searchAction?: SearchActionOption;
        required: boolean;
        initial: SelectState;
        render: (this: Omit<SelectComponent, "prompt">) => string | undefined;
    });
    visibleOptions(): PromptOption<string>[];
    /** True when the multi-select cursor sits on the trailing Submit row. */
    onSubmitRow(): boolean;
    /**
     * Submit-row label: "Skip" while an optional checklist has nothing picked,
     * "Submit" as soon as one row is marked. Locked rows are mandatory rather
     * than chosen, so they do not count as a pick; a required checklist always
     * says "Submit" since an empty confirm cannot resolve it.
     */
    submitLabel(): "Submit" | "Skip";
    /**
     * Enter resolves an actionable single-select row; completed rows are
     * focus-only. A multi-select resolves only from its Submit row — on any
     * option row it toggles instead, so enter can never accidentally skip the
     * checklist.
     */
    protected _shouldSubmit(): boolean;
    /** Values that should render as chosen: the marked set, or the cursor for single. */
    selectedValues(): string[];
    /** The folded answer shown once the prompt resolves. */
    submitDisplay(): string;
    labelForValue(value: string): string;
    submitError(): string | undefined;
    private apply;
    private refreshValue;
}
/**
 * Runs one select picker and resolves to the chosen value(s), or a clack cancel
 * symbol when the prompt is cancelled (the caller maps that to its own error).
 * Single-select returns the highlighted value, multi-select the marked set.
 *
 * Option values round-trip through opaque string keys so values of different
 * primitive types cannot collide. `attachGuard` wires
 * extra key handling (e.g. a two-stage quit guard) and supplies the live footer
 * note; `leadingRail` colors the leader rail white for the first prompt in a
 * sequence and green thereafter.
 */
export declare function runSelectComponent<T extends PromptValue>(input: {
    message: string;
    options: readonly PromptOption<T>[];
    multiple: boolean;
    search: boolean;
    searchAction?: {
        label(query: string): string;
        value(query: string): T;
    };
    required: boolean;
    placeholder?: string;
    defaultValue?: T;
    initialValues?: readonly T[];
    leadingRail: "white" | "green";
    attachGuard?: (prompt: SelectComponent) => SelectGuard;
}): Promise<T | T[] | symbol>;
