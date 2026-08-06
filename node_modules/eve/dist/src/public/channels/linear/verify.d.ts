import { type LinearWebhookSecret } from "#public/channels/linear/auth.js";
/**
 * Caller-supplied inbound webhook verifier. Use it as an alternative to
 * Linear's HMAC secret, for example when a trusted proxy authenticates the
 * request before it reaches eve.
 *
 * - Throw / reject / return falsy: request rejected.
 * - Return a string: request accepted and that string replaces the raw body.
 * - Return any other truthy value: request accepted and the original body is
 *   used.
 */
export type LinearWebhookVerifier = (request: Request, body: string) => unknown | Promise<unknown>;
export interface LinearVerifyOptions {
    /** Max allowed webhook timestamp skew in milliseconds. Defaults to 60s. */
    readonly maxSkewMs?: number;
    readonly webhookSecret?: LinearWebhookSecret;
    readonly webhookVerifier?: LinearWebhookVerifier;
}
/** Verifies a Linear webhook request and returns its raw body. */
export declare function verifyLinearRequest(request: Request, options: LinearVerifyOptions): Promise<string>;
/** Signs a raw Linear webhook body for tests and local fixtures. */
export declare function signLinearWebhookBody(body: string, secret: string): string;
