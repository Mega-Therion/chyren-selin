/**
 * Teams Adaptive Card rendering and decode helpers for eve HITL prompts.
 */
import type { InputRequest, InputResponse } from "#runtime/input/types.js";
import type { TeamsActivity } from "#public/channels/teams/inbound.js";
import type { TeamsAttachment, TeamsMessageBody } from "#public/channels/teams/api.js";
/** Adaptive Card attachment content type used by Teams. */
export declare const TEAMS_ADAPTIVE_CARD_CONTENT_TYPE = "application/vnd.microsoft.card.adaptive";
/** Hidden data property used by eve HITL Adaptive Card actions. */
export declare const TEAMS_HITL_DATA_KEY = "eve_input";
/** ChoiceSet input id used for select-style HITL requests. */
export declare const TEAMS_HITL_CHOICE_INPUT_ID = "eve_option";
/** Text input id used for freeform HITL requests. */
export declare const TEAMS_HITL_FREEFORM_INPUT_ID = "eve_freeform_text";
/** Renders one input request as a Teams message body containing an Adaptive Card. */
export declare function renderInputRequestMessage(request: InputRequest, options?: {
    readonly adaptiveCardVersion?: string;
    readonly replyToActivityId?: string;
}): TeamsMessageBody;
/**
 * Renders one input request as a Teams Adaptive Card attachment.
 * `options.adaptiveCardVersion` sets the card schema version (default "1.5").
 * Long prompt, choice, and action text is truncated to Teams card limits.
 */
export declare function renderInputRequestAttachment(request: InputRequest, options?: {
    readonly adaptiveCardVersion?: string;
    readonly replyToActivityId?: string;
}): TeamsAttachment;
/** Renders an answered Teams card that replaces a pending HITL prompt. */
export declare function renderAnsweredInputRequestMessage(input: {
    readonly label?: string;
    readonly prompt: string;
}): TeamsMessageBody;
/** Returns true when a Teams activity carries an eve HITL submit payload. */
export declare function isTeamsInputResponseActivity(activity: TeamsActivity): boolean;
/**
 * Decodes the eve HITL submit payload from a Teams activity. Returns a single
 * `InputResponse` (option selection, freeform text, or a bare requestId
 * acknowledgement), or an empty array when the activity has no recognizable
 * HITL payload or requestId.
 */
export declare function deriveTeamsInputResponses(activity: TeamsActivity): readonly InputResponse[];
/**
 * Builds the HTTP body Teams expects after an Adaptive Card invoke action.
 * Defaults to statusCode 200 and message "Answer received."; `type` is always
 * the Teams activity-message content type.
 */
/** Reads the recorded thread root carried by an eve HITL card submission. */
export declare function readTeamsInputReplyToActivityId(activity: TeamsActivity): string | null;
export declare function teamsInvokeResponse(input?: {
    readonly message?: string;
    readonly statusCode?: number;
}): Record<string, unknown>;
