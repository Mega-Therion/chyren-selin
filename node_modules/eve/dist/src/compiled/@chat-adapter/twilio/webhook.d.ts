import { T as TwilioWebhookPayload, a as TwilioWebhookUrl, d as TwilioVerifyOptions, e as TwilioVerifiedRequest, f as TwilioReadOptions } from './types-WYjTBVDi.js';
export { g as TwilioHeaderValue, h as TwilioHeaders, c as TwilioMediaPayload, i as TwilioStatusPayload, j as TwilioTextPayload, k as TwilioUnsupportedPayload, l as TwilioWebhookError, m as TwilioWebhookParseError, n as TwilioWebhookVerificationError, b as TwilioWebhookVerifier } from './types-WYjTBVDi.js';
import './api.js';

declare function parseTwilioWebhookBody(params: URLSearchParams): TwilioWebhookPayload;

declare function verifyTwilioRequest(request: Request, options?: TwilioVerifyOptions): Promise<TwilioVerifiedRequest>;
declare function signTwilioRequest(input: {
    authToken: string;
    params?: URLSearchParams | null;
    url: string;
}): Promise<string>;
declare function twilioSignatureBase(url: string, params?: URLSearchParams | null): string;
declare function resolveTwilioWebhookUrl(request: Request, webhookUrl: TwilioWebhookUrl | undefined): Promise<string>;

declare function readTwilioWebhook(request: Request, options?: TwilioReadOptions): Promise<TwilioWebhookPayload>;

export { TwilioReadOptions, TwilioVerifiedRequest, TwilioVerifyOptions, TwilioWebhookPayload, TwilioWebhookUrl, parseTwilioWebhookBody, readTwilioWebhook, resolveTwilioWebhookUrl, signTwilioRequest, twilioSignatureBase, verifyTwilioRequest };
