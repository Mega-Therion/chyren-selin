declare const TWILIO_MESSAGE_LIMIT = 1600;
interface TwilioTextOptions {
    limit?: number;
}
interface TwilioTextResult {
    text: string;
    truncated: boolean;
}
declare function truncateTwilioText(text: string, options?: TwilioTextOptions): TwilioTextResult;
declare function twilioTextOrPlaceholder(text: string): string;

export { TWILIO_MESSAGE_LIMIT, type TwilioTextOptions, type TwilioTextResult, truncateTwilioText, twilioTextOrPlaceholder };
