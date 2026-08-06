/**
 * Discord inbound-interaction verification.
 *
 * Discord signs interaction webhooks with Ed25519. The signed payload is
 * the `X-Signature-Timestamp` header concatenated with the exact raw
 * request body string.
 */
/** Discord application public key, materialized directly or from an async secret provider. */
export type DiscordPublicKey = string | (() => string | Promise<string>);
/**
 * Caller-supplied inbound webhook verifier. Replaces Ed25519 verification
 * when an integration authenticates forwarded webhooks before they reach
 * eve. Receives the request and raw body.
 *
 * Return a falsy value to reject the request. Return a string to accept it
 * and use that string as the (possibly rewritten) body. Return any other
 * truthy value to accept it and keep the original body.
 */
export type DiscordWebhookVerifier = (request: Request, body: string) => unknown | Promise<unknown>;
/** Options for {@link verifyDiscordRequest}. */
export interface DiscordVerifyOptions {
    readonly publicKey: DiscordPublicKey | undefined;
    readonly webhookVerifier?: DiscordWebhookVerifier;
    /** Max allowed clock skew, in seconds. Defaults to 5 minutes. */
    readonly maxSkewSeconds?: number;
}
/** Resolves a Discord public key, falling back to `DISCORD_PUBLIC_KEY`. */
export declare function resolveDiscordPublicKey(publicKey?: DiscordPublicKey): Promise<string>;
/**
 * Verifies an inbound Discord interaction request and returns the raw body.
 *
 * Throws when no public key/verifier is configured, required signature
 * headers are missing, timestamp checks fail, or the signature check fails.
 */
export declare function verifyDiscordRequest(request: Request, options: DiscordVerifyOptions): Promise<string>;
/**
 * Verifies one Discord Ed25519 interaction signature over `timestamp + body`.
 * `publicKey` and `signature` are hex-encoded. Returns false (never throws) on
 * malformed input or a length/signature mismatch.
 */
export declare function verifyDiscordSignature(input: {
    readonly body: string;
    readonly publicKey: string;
    readonly signature: string;
    readonly timestamp: string;
}): boolean;
