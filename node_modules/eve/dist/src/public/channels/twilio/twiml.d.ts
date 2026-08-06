import { emptyTwilioResponse, escapeXml, gatherSpeechTwilioResponse, sayTwilioResponse, type TwilioGatherSpeechResponseOptions } from "#compiled/@chat-adapter/twilio/voice.js";
/** Options for rendering a Twilio `<Gather input="speech">` TwiML response. */
export type TwilioGatherTwimlOptions = TwilioGatherSpeechResponseOptions;
export { emptyTwilioResponse, escapeXml, gatherSpeechTwilioResponse, sayTwilioResponse };
/** Wraps a TwiML string in an XML `Response`. */
export declare function twimlResponse(twiml: string): Response;
