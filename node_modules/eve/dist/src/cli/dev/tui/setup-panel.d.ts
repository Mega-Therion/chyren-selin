/**
 * Pure rendering for the bordered setup flow panel — the input-region variant
 * a setup command runs inside for its whole duration (the Claude Code
 * `/model`-panel grammar): a full-width rule, the command as a blue title,
 * the flow's recent progress lines, and the active question (numbered option
 * rows or a text field) or the ephemeral status spinner. Behavior state comes
 * from the shared select reducer (`#setup/cli/select-state.js`); this module
 * only paints rows, so the renderer hosts lifecycle and keys while tests
 * assert on strings.
 *
 * Column grammar: the panel adds a one-space left margin to every row under
 * the rule, while each section contributes two more spaces. Titles, spinners,
 * notices, filter prompts, and option-state glyphs therefore all begin at
 * column 3.
 */
import type { ChannelSetupAction, PromptOption } from "#setup/cli/index.js";
import { type SearchActionOption, type SelectState } from "#setup/cli/select-state.js";
import type { SelectMetadata, SelectNotice } from "#setup/prompter.js";
import type { ModelSettingsRequest } from "#setup/flows/model.js";
import { type ModelEditorState } from "./model-editor.js";
import type { ProviderPickerPhase } from "./provider-picker.js";
import { type LineState } from "./line-editor.js";
import type { Theme } from "./theme.js";
/** One row of a setup select panel; the shared prompt-option shape. */
export type SetupPanelOption = PromptOption<string>;
interface SetupQuestionPanelBase {
    message: string;
    /** Inert context rendered beneath the heading and above the controls. */
    description?: string;
    /** Labeled facts rendered beneath the description and above the controls. */
    metadata?: readonly SelectMetadata[];
    error?: string;
    /** Outcome lines from earlier menu laps, shown beneath the options. */
    notices?: readonly SelectNotice[];
}
interface SetupSelectPanelBase extends SetupQuestionPanelBase {
    options: readonly SetupPanelOption[];
    searchAction?: SearchActionOption;
    select: SelectState;
    /** Live frame rendered beside a searchable input while it loads replacement rows. */
    loadingFrame?: string;
    /** A dim-inverse affordance appended to the cursor row, e.g. ` ↵ change `. */
    cursorBadge?: string;
}
/**
 * A menu row that turns into an inline editor while the cursor rests on it.
 * `optionValue` names the row; the `editor` discriminant chooses the widget —
 * an in-place rename field, or a masked provider-key field with its own
 * validation phases. Rename defaults stay placeholders until typing begins;
 * provider keys edit in place. Layout and inline editing are orthogonal, so
 * the editor travels as a payload rather than as its own panel `kind`.
 */
interface SetupInlineEditRow {
    optionValue: string;
    caretVisible: boolean;
    editor: {
        kind: "rename";
        editor: LineState;
        defaultValue: string;
        formatHint: (value: string) => string;
    } | {
        kind: "key";
        phase: ProviderPickerPhase;
    };
}
/**
 * Select presentation variants. The discriminant owns the interaction grammar
 * so feature combinations are deliberate rather than resolved by conditional
 * precedence inside the renderer. Inline editing is the exception: it composes
 * with a layout instead of defining one, so `inline-edit` carries both.
 */
type SetupOptionSelectPanelState = (SetupSelectPanelBase & {
    kind: "single";
}) | (SetupSelectPanelBase & {
    kind: "search";
    layout?: "task-list";
    placeholder?: string;
}) | (SetupSelectPanelBase & {
    kind: "multi";
}) | (SetupSelectPanelBase & {
    kind: "searchable-multi";
    placeholder?: string;
}) | (SetupSelectPanelBase & {
    kind: "stacked";
}) | (SetupSelectPanelBase & {
    kind: "task-list";
}) | (SetupSelectPanelBase & {
    kind: "inline-edit";
    layout: "stacked" | "task-list";
    edit: SetupInlineEditRow;
});
interface SetupActionsPanelState {
    kind: "actions";
    /** Inert explanation rendered above, and separately from, the action group. */
    context: string;
    actions: readonly ChannelSetupAction[];
    /** No action is focused until the user moves into the action group. */
    cursor: number | undefined;
}
export type SetupSelectPanelState = SetupOptionSelectPanelState | SetupActionsPanelState;
export interface SetupTextPanelState {
    message: string;
    editor: LineState;
    placeholder?: string;
    mask: boolean;
    error?: string;
    /** Context lines shown above the message; gone once the question settles. */
    notices?: readonly SelectNotice[];
}
export interface SetupAcknowledgePanelState {
    message: string;
    lines: readonly string[];
}
/** One progress line shown inside the flow panel while it runs. */
export interface FlowPanelLine {
    text: string;
    tone: "info" | "success" | "warning" | "error";
    /**
     * Subprocess output a warning/error settle pulled in as its evidence.
     * Renders like any info line in the panel, but survives the panel close
     * alongside the diagnostic it explains (a plain info line does not).
     */
    evidence?: boolean;
}
/** One already-resolved animation frame and its active color. */
export interface FlowPanelIndicator {
    glyph: string;
    color: "green" | "yellow";
}
/** One live flow status after its animation frame and visual intent are resolved. */
export type FlowPanelStatus = {
    kind: "progress";
    text: string;
    indicator: FlowPanelIndicator;
} | {
    kind: "external-action";
    text: string;
    emphasis: string;
    indicator: FlowPanelIndicator;
};
export type FlowPanelContent = {
    kind: "question";
    rows: readonly string[];
    /** The install wait keeps its indicator above the concurrent actions. */
    status?: FlowPanelStatus;
} | {
    kind: "status";
    status: FlowPanelStatus;
    /** Latest child-process output shown transiently beneath the status. */
    preview?: string;
} | {
    kind: "preview";
    text: string;
    indicator: FlowPanelIndicator;
} | {
    kind: "idle";
    indicator: FlowPanelIndicator;
};
/** The whole bordered section: title, recent progress, and one explicit mode. */
export interface FlowPanelState {
    /** The invoked command, e.g. "/deploy". Empty renders no title row. */
    title: string;
    lines: readonly FlowPanelLine[];
    content: FlowPanelContent;
}
/**
 * Paints the bordered flow panel. Everything a running command produces lives
 * here — progress, questions, the status indicator — and the panel vanishes
 * wholesale when the command resolves; only the command echo and the elbow
 * outcome persist in the transcript.
 */
export declare function renderFlowPanel(state: FlowPanelState, theme: Theme, width: number): string[];
/**
 * Paints a selection section for the flow panel. Ordinary selects use the
 * shared option reducer; concurrent actions render an explicit context row and
 * independent action group. A searchable select windows the option list around
 * the cursor and advertises the rest with a count footer.
 */
export declare function renderSelectQuestion(state: SetupSelectPanelState, theme: Theme, width: number): string[];
/** The composite Change-model screen's inputs: the resolved request plus live state. */
export interface ModelEditorPanelInput {
    request: ModelSettingsRequest;
    state: ModelEditorState;
}
/**
 * A dim, background-free selection badge carrying the Enter affordance, e.g.
 * `↵`, `↵ change`, `↵ validate`.
 */
export declare function enterBadge(theme: Theme, label?: string): string;
/**
 * A discrete reasoning track: `●` below the current notch, `◉` on it, `○`
 * above, joined by `─` connectors. `accent` paints the covered stretch —
 * notches and connectors up to the current position — blue. `index` -1 means
 * unset: an all-`○` track with no fill.
 */
export declare function reasoningTrack(input: {
    count: number;
    index: number;
    connectorWidth: number;
    accent: boolean;
    theme: Theme;
}): string;
/**
 * Paints the Change-model screen: a value menu whose reasoning and tier rows
 * adjust inline with left/right, and whose Model row opens the searchable
 * catalog.
 */
export declare function renderModelEditorQuestion(input: ModelEditorPanelInput, theme: Theme, width: number): string[];
/** Paints a text question section: message, a block-cursor input line, hints. */
export declare function renderTextQuestion(state: SetupTextPanelState, theme: Theme, width: number, caretVisible: boolean): string[];
/**
 * Paints a static acknowledgement section (for the flow panel): a heading and
 * dim body lines where option rows normally sit, held until the user
 * dismisses it. There is nothing to cancel — the text is the point — so the
 * footer advertises only enter.
 */
export declare function renderAcknowledgeQuestion(state: SetupAcknowledgePanelState, theme: Theme, width: number): string[];
export {};
