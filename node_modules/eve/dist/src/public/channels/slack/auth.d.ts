import type { SessionAuthContext } from "#channel/types.js";
interface SlackAuthContextInput {
    readonly channelId: string;
    readonly fullName?: string;
    readonly isBot?: boolean;
    readonly teamId?: string | null;
    readonly threadTs: string;
    readonly userId: string;
    readonly userName?: string;
}
/** Returns the Slack user id carried by a Slack-derived auth context. */
export declare function slackUserIdFromAuthContext(auth: SessionAuthContext | null): string | undefined;
/**
 * Builds the Slack-derived session auth context used by inbound
 * messages and signed interactivity callbacks.
 */
export declare function buildSlackAuthContext(input: SlackAuthContextInput): SessionAuthContext;
export {};
