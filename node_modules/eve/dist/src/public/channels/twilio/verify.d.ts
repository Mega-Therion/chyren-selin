import { type TwilioCredential } from "#compiled/@chat-adapter/twilio/api.js";
import { type TwilioVerifiedRequest, type TwilioWebhookUrl } from "#compiled/@chat-adapter/twilio/webhook.js";
/** Twilio auth token, materialized directly or from an async secret provider. */
export type TwilioAuthToken = TwilioCredential;
export type { TwilioVerifiedRequest, TwilioWebhookUrl };
/** Options for verifying Twilio inbound webhooks. */
export interface TwilioVerifyOptions {
    /** Auth token used to verify the signature. Defaults to `TWILIO_AUTH_TOKEN`. */
    readonly authToken: TwilioAuthToken | undefined;
    /** Public URL Twilio signed. Set this when a proxy or tunnel rewrites `request.url`. */
    readonly webhookUrl?: TwilioWebhookUrl;
}
/** Resolves a Twilio auth token, falling back to `TWILIO_AUTH_TOKEN`. */
export declare function resolveTwilioAuthToken(authToken?: TwilioAuthToken): Promise<string>;
/**
 * Verifies an inbound Twilio webhook and returns the raw body plus parsed params.
 *
 * This preserves Eve's existing error messages while delegating signature
 * semantics to the Chat SDK Twilio primitive.
 */
export declare function verifyTwilioRequest(request: Request, options: TwilioVerifyOptions): Promise<TwilioVerifiedRequest>;
/** Computes Twilio's HMAC-SHA1 request signature. */
export declare function signTwilioRequest(input: {
    readonly authToken: string;
    readonly url: string;
    readonly params: URLSearchParams;
}): string;
/** Builds the string Twilio signs for a webhook request. */
export declare function buildTwilioSignatureBase(url: string, params: URLSearchParams): string;
