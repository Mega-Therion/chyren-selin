/**
 * Linear channel credential resolvers.
 *
 * eve keeps Linear access tokens out of model-visible context. Channel helpers
 * resolve them only when verifying inbound webhooks or calling Linear's
 * GraphQL API to emit Agent Activities.
 */
export type LinearAccessToken = string | (() => string | Promise<string>);
export type LinearWebhookSecret = string | (() => string | Promise<string>);
export interface LinearChannelCredentials {
    /**
     * OAuth app-token or API key used for Linear GraphQL calls. For the Agent
     * surface this should usually be an OAuth token installed with `actor=app`.
     */
    readonly accessToken?: LinearAccessToken;
    /** Signing secret from the Linear webhook configuration. */
    readonly webhookSecret?: LinearWebhookSecret;
    /** Optional custom verifier for trusted webhook forwarders. */
    readonly webhookVerifier?: import("#public/channels/linear/verify.js").LinearWebhookVerifier;
}
export declare function resolveLinearAccessToken(token: LinearAccessToken | undefined): Promise<string>;
export declare function resolveLinearWebhookSecret(secret: LinearWebhookSecret | undefined): Promise<string>;
