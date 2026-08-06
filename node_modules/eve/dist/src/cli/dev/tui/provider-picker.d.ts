import type { PromptOption } from "#setup/cli/index.js";
import { type SelectState } from "#setup/cli/select-state.js";
import type { ProviderConnection, ProviderPickerChoice } from "#setup/flows/provider.js";
import type { GatewayKeyValidation } from "#setup/validate-gateway-key.js";
import { type LineState } from "./line-editor.js";
/** The provider key row is either inert, editable, checking, or rejected. */
export type ProviderPickerPhase = {
    kind: "inactive";
} | {
    kind: "editing";
    editor: LineState;
} | {
    kind: "validating";
    editor: LineState;
    key: string;
} | {
    kind: "invalid";
    editor: LineState;
    message: string;
};
/** One provider picker interaction: ordinary select state plus its key field. */
export interface ProviderPickerState {
    select: SelectState;
    phase: ProviderPickerPhase;
}
/** Semantic input after terminal-key and line-editor decoding. */
export type ProviderPickerEvent = {
    type: "move";
    direction: "up" | "down";
} | {
    type: "edit";
    editor: LineState;
} | {
    type: "cancel";
} | {
    type: "submit";
} | {
    type: "validated";
    validation: GatewayKeyValidation;
};
/** One state transition; abort controllers remain in the terminal renderer. */
export type ProviderPickerTransition = {
    kind: "ignore";
    state: ProviderPickerState;
} | {
    kind: "render";
    state: ProviderPickerState;
} | {
    kind: "clear";
    state: ProviderPickerState;
} | {
    kind: "cancel";
} | {
    kind: "validate";
    state: ProviderPickerState;
    key: string;
} | {
    kind: "settle";
    result: ProviderPickerChoice;
};
/** Creates the select and blank inline key field for one provider menu. */
export declare function initialProviderPickerState(options: readonly PromptOption<ProviderConnection>[], initialValue: ProviderConnection): ProviderPickerState;
/** Applies one provider-menu event without creating terminal resources. */
export declare function transitionProviderPicker(state: ProviderPickerState, event: ProviderPickerEvent, options: readonly PromptOption<ProviderConnection>[]): ProviderPickerTransition;
