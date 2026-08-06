import { type ReasoningLevel } from "#setup/boxes/model-capabilities.js";
import type { GatewayModelCapabilities } from "#setup/boxes/model-capabilities.js";
import { type SelectState } from "#setup/cli/select-state.js";
import type { ModelSettingsRequest, ModelSettingsResult } from "#setup/flows/model.js";
import type { SelectOption } from "#setup/prompter.js";
/** The Change-model menu's rows, in visual order. */
export type ModelEditorRowId = "model" | "reasoning" | "tier" | "done";
/**
 * The screen stack, depth two: the value menu, or the model list it opens.
 * Reasoning and tier adjust inline on their menu rows — only the catalog pick
 * warrants its own screen. The list carries scratch select state seeded when
 * opened; Esc drops it, so "returns unchanged" is structural.
 */
export type ModelEditorScreen = {
    kind: "menu";
    cursor: ModelEditorRowId;
} | {
    kind: "model";
    select: SelectState;
};
/** The in-progress values; nothing lands in source until the menu's Done. */
export interface ModelEditorDraft {
    modelId: string | null;
    reasoning: "default" | ReasoningLevel;
    tier: "standard" | "priority";
}
/** One Change-model interaction, advanced by {@link transitionModelEditor}. */
export interface ModelEditorState {
    screen: ModelEditorScreen;
    draft: ModelEditorDraft;
    /** Catalog capabilities for `draft.modelId`; recomputed on every pick. */
    capabilities: GatewayModelCapabilities | undefined;
}
/** Semantic input after terminal-key decoding. */
export type ModelEditorEvent = {
    type: "move";
    direction: "up" | "down";
} | {
    type: "adjust";
    direction: "left" | "right";
} | {
    type: "char";
    char: string;
} | {
    type: "backspace";
} | {
    type: "cancel";
} | {
    type: "submit";
};
export type ModelEditorTransition = {
    kind: "ignore";
    state: ModelEditorState;
} | {
    kind: "render";
    state: ModelEditorState;
} | {
    kind: "cancel";
} | {
    kind: "settle";
    result: ModelSettingsResult;
};
/**
 * How a value row presents: an adjustable control, a dim explanatory line the
 * cursor skips, or nothing at all — a control that cannot apply to the
 * drafted model (no priority tier) is noise, while an authored-but-unowned
 * state (custom tier, external provider) still explains itself.
 */
export type ModelEditorSectionView = {
    kind: "interactive";
} | {
    kind: "static";
    text: string;
} | {
    kind: "hidden";
};
/**
 * The reasoning row stays interactive while a level is drafted even when the
 * catalog disowns reasoning, so the authored value at least stays visible.
 */
export declare function reasoningSectionView(request: ModelSettingsRequest, draft: ModelEditorDraft, capabilities: GatewayModelCapabilities | undefined): ModelEditorSectionView;
/** The tier row's presentation; static or hidden for every state it cannot own. */
export declare function tierSectionView(request: ModelSettingsRequest, capabilities: GatewayModelCapabilities | undefined): ModelEditorSectionView;
/**
 * The track's notch positions: the levels the catalog supports (every level
 * when capabilities are unknown). The provider default is not a notch — an
 * unset draft renders an empty track and the first right-adjust enters the
 * scale at the lowest level. A drafted level the catalog does not list is
 * inserted in canonical level order, so the track never hides the value it
 * is about to replace.
 */
export declare function reasoningPositions(capabilities: GatewayModelCapabilities | undefined, drafted: "default" | ReasoningLevel): readonly ReasoningLevel[];
/**
 * The value menu's rows, derived fresh from the draft on every transition and
 * paint: interactive sections are pickable rows, static sections are disabled
 * rows carrying their explanation, and a hidden tier is omitted entirely.
 * Value hints are the painter's job — it styles them with theme glyphs.
 */
export declare function modelEditorMenuRows(request: ModelSettingsRequest, draft: ModelEditorDraft, capabilities: GatewayModelCapabilities | undefined): SelectOption<ModelEditorRowId>[];
/** Creates the screen's state; the cursor opens on the first pickable row. */
export declare function initialModelEditorState(request: ModelSettingsRequest): ModelEditorState;
/** Applies one keypress worth of semantics; terminal resources stay in the renderer. */
export declare function transitionModelEditor(state: ModelEditorState, event: ModelEditorEvent, request: ModelSettingsRequest): ModelEditorTransition;
