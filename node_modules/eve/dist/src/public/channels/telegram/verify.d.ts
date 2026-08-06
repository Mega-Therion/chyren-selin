/**
 * Telegram inbound-webhook verification.
 *
 * When you configure a webhook with `secret_token`, Telegram includes
 * that exact value in `X-Telegram-Bot-Api-Secret-Token` on every
 * webhook request. The native channel verifies the header directly or
 * delegates to a caller-supplied verifier for forwarded webhooks.
 */
/** Secret token you set on Telegram's `setWebhook` call. */
export type TelegramWebhookSecretToken = string | (() => string | Promise<string>);
/**
 * Caller-supplied inbound webhook verifier. Use it instead of
 * Telegram's secret-token header when an integration authenticates
 * forwarded webhooks before they reach eve.
 *
 * The return value selects how the channel handles the request: return a
 * falsy value to reject the request, a string to accept it and use that
 * string as the verified body, or any other truthy value to accept it and
 * keep the original body.
 */
export type TelegramWebhookVerifier = (request: Request, body: string) => unknown | Promise<unknown>;
/** Options for {@link verifyTelegramRequest}. */
export interface TelegramVerifyOptions {
    readonly secretToken: TelegramWebhookSecretToken | undefined;
    readonly webhookVerifier?: TelegramWebhookVerifier;
}
/** Resolves a Telegram webhook secret, falling back to `TELEGRAM_WEBHOOK_SECRET_TOKEN`. */
export declare function resolveTelegramWebhookSecretToken(secretToken?: TelegramWebhookSecretToken): Promise<string>;
/**
 * Verifies an inbound Telegram webhook and returns its raw body.
 *
 * Throws when no secret/verifier is configured, the secret header is
 * missing, or the supplied verifier/header rejects.
 */
export declare function verifyTelegramRequest(request: Request, options: TelegramVerifyOptions): Promise<string>;
