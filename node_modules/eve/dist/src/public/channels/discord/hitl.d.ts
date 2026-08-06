/**
 * Discord HITL component rendering + decode helpers.
 *
 * Discord components carry a `custom_id` with a 100-character cap. eve
 * encodes only the request id and, for buttons, the selected option id.
 */
import { type DiscordComponentInteraction, type DiscordModalSubmitInteraction } from "#public/channels/discord/inbound.js";
import type { InputRequest, InputResponse } from "#runtime/input/types.js";
/** Maps Discord component kinds (ACTION_ROW, BUTTON, STRING_SELECT, TEXT_INPUT) to their wire `type` integers used in component payloads. */
export declare const DISCORD_COMPONENT_TYPE: {
    readonly ACTION_ROW: 1;
    readonly BUTTON: 2;
    readonly STRING_SELECT: 3;
    readonly TEXT_INPUT: 4;
};
/** Custom id prefix for selectable HITL controls. */
export declare const DISCORD_HITL_CUSTOM_ID_PREFIX = "eve_input:";
/** Custom id prefix for the button/modal freeform flow. */
export declare const DISCORD_HITL_FREEFORM_CUSTOM_ID_PREFIX = "eve_input_freeform:";
/** Text-input id inside the freeform modal. */
export declare const DISCORD_HITL_FREEFORM_TEXT_INPUT_ID = "eve_freeform_text";
/**
 * Renders an input request into Discord action-row components: a string-select
 * for `display: "select"` with options, else option buttons chunked into rows,
 * else a freeform-answer button when freeform is accepted. Empty array when no
 * control applies.
 */
export declare function renderInputRequestComponents(request: InputRequest): readonly Readonly<Record<string, unknown>>[];
/** Builds a Discord modal response for one freeform HITL request. */
export declare function buildFreeformModalResponse(input: {
    readonly customId: string;
    readonly prompt: string | undefined;
}): Record<string, unknown>;
/** Returns true when a component custom id starts the freeform modal flow. */
export declare function isDiscordFreeformComponent(customId: string): boolean;
/**
 * Decodes an eve HITL component interaction into input responses. Empty array
 * if the custom id is not an eve HITL id; otherwise one response from the
 * encoded option id (buttons) or the first selected value (selects).
 */
export declare function deriveComponentInputResponses(interaction: DiscordComponentInteraction): readonly InputResponse[];
/**
 * Decodes an eve freeform modal submission into a single text input response.
 * Empty array unless the custom id matches the freeform prefix and the freeform
 * text field is present.
 */
export declare function deriveModalInputResponses(interaction: DiscordModalSubmitInteraction): readonly InputResponse[];
