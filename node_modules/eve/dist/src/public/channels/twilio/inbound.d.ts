import { type TwilioMediaPayload } from "#compiled/@chat-adapter/twilio/webhook.js";
/** Channel-owned representation of one inbound Twilio text or media message. */
export interface TwilioTextMessage {
    readonly from: string;
    readonly to: string | undefined;
    readonly body: string;
    readonly messageSid: string | undefined;
    readonly accountSid: string | undefined;
    /** MMS media metadata parsed from Twilio's `MediaUrl*` webhook fields. */
    readonly media?: readonly TwilioMediaPayload[];
    readonly raw: URLSearchParams;
}
/** Channel-owned representation of one inbound Twilio voice call. */
export interface TwilioVoiceCall {
    readonly from: string;
    readonly to: string | undefined;
    readonly callSid: string | undefined;
    readonly accountSid: string | undefined;
    readonly raw: URLSearchParams;
}
/** Channel-owned representation of one inbound Twilio voice transcription. */
export interface TwilioVoiceTranscription {
    readonly from: string;
    readonly to: string | undefined;
    readonly callSid: string | undefined;
    readonly text: string;
    readonly confidence: number | undefined;
    readonly transcriptionSid: string | undefined;
    readonly raw: URLSearchParams;
}
/** Inbound identity fields for the model-visible `<twilio_context>` block. */
export interface TwilioInboundContext {
    readonly from: string;
    readonly to?: string;
    readonly messageSid?: string;
    readonly callSid?: string;
    readonly channel: "text" | "voice";
}
/** Parses Twilio's incoming-message webhook fields into Eve's text payload. */
export declare function parseTwilioTextMessage(params: URLSearchParams): TwilioTextMessage | null;
/** Parses Twilio's incoming-call webhook fields into Eve's voice payload. */
export declare function parseTwilioVoiceCall(params: URLSearchParams): TwilioVoiceCall | null;
/**
 * Parses Twilio speech callbacks.
 *
 * Supports `<Gather input="speech">`, recording transcription callbacks, and
 * real-time transcription callbacks. Real-time partial results are ignored.
 */
export declare function parseTwilioVoiceTranscription(params: URLSearchParams): TwilioVoiceTranscription | null;
/** Renders a deterministic `<twilio_context>` block for the model. */
export declare function formatTwilioContextBlock(context: TwilioInboundContext): string;
