import { type SlackWebhookVerifier } from "#compiled/@chat-adapter/slack/webhook.js";
export type { SlackWebhookVerifier };
/** Verification inputs for Eve's Slack webhook route. */
export interface SlackVerifyOptions {
    readonly signingSecret: string | undefined;
    readonly webhookVerifier: SlackWebhookVerifier | undefined;
    readonly maxSkewSeconds?: number;
}
/** Verifies a Slack request with the Chat SDK webhook primitive. */
export declare function verifySlackRequest(request: Request, options: SlackVerifyOptions): Promise<string>;
