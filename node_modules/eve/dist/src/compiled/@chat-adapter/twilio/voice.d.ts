interface TwilioVoiceCallPayload {
    accountSid?: string;
    callSid?: string;
    from: string;
    raw: URLSearchParams;
    to?: string;
}
interface TwilioVoiceTranscriptionPayload {
    accountSid?: string;
    callSid?: string;
    confidence?: number;
    final?: boolean;
    from?: string;
    raw: URLSearchParams;
    sequenceId?: string;
    text: string;
    timestamp?: string;
    to?: string;
    track?: string;
    transcriptionEvent?: string;
    transcriptionSid?: string;
}
interface TwilioGatherSpeechResponseOptions {
    actionOnEmptyResult?: boolean;
    actionUrl: string;
    hints?: readonly string[] | string;
    language?: string;
    method?: "GET" | "POST";
    profanityFilter?: boolean;
    prompt: string;
    speechModel?: string;
    speechTimeout?: "auto" | string;
    timeoutSeconds?: number;
    voice?: string;
}
declare function parseTwilioVoiceCall(params: URLSearchParams): TwilioVoiceCallPayload | null;
declare function parseTwilioVoiceTranscription(params: URLSearchParams): TwilioVoiceTranscriptionPayload | null;
declare function emptyTwilioResponse(): Response;
declare function sayTwilioResponse(message: string): Response;
declare function gatherSpeechTwilioResponse(options: TwilioGatherSpeechResponseOptions): Response;
declare function twilioResponse(twiml: string): Response;
declare function escapeXml(value: string): string;

export { type TwilioGatherSpeechResponseOptions, type TwilioVoiceCallPayload, type TwilioVoiceTranscriptionPayload, emptyTwilioResponse, escapeXml, gatherSpeechTwilioResponse, parseTwilioVoiceCall, parseTwilioVoiceTranscription, sayTwilioResponse, twilioResponse };
