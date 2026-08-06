import type { SlackThreadMessage } from "#public/channels/slack/api.js";
import type { SlackInboundContext } from "#public/channels/slack/inbound.js";
interface SlackModelMessageInput {
    readonly channelId?: string;
    readonly content: string;
    readonly senderId?: string;
    readonly senderType: "agent" | "bot" | "unknown" | "user";
    readonly teamId?: string;
    readonly threadTs: string;
    readonly ts: string;
}
/**
 * Renders one Slack message with its sender identity attached to the same
 * model-visible message. Slack user ids are stable and require no profile
 * lookup, so they remain the canonical speaker identity.
 */
export declare function formatSlackModelMessage(input: SlackModelMessageInput): string;
/** Renders the triggering inbound Slack message as one attributed block. */
export declare function formatSlackInboundMessage(context: SlackInboundContext, message: {
    readonly markdown: string;
    readonly ts: string;
}): string;
/**
 * Renders fetched Slack replies as explicitly attributed background context.
 * Returns `undefined` when there are no messages to add to the turn.
 */
export declare function formatSlackThreadContext(messages: readonly SlackThreadMessage[]): string | undefined;
export {};
