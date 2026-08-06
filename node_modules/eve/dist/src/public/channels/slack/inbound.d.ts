/**
 * Inbound Slack event → harness shaping.
 *
 * The channel calls these helpers on inbound Slack message events before
 * handing them to the runtime:
 *
 * 1. {@link slackMessageFromWebhookPayload} converts the shared Chat SDK
 *    webhook payload into a channel-owned {@link SlackMessage}. The legacy
 *    {@link parseAppMentionEvent} and {@link parseDirectMessageEvent}
 *    helpers keep their raw-envelope behavior for direct unit coverage.
 * 2. The channel renders the actor, message, channel, and thread as one
 *    attributed model message so speaker identity cannot drift away from
 *    the content it describes.
 */
import type { SlackAppMentionPayload, SlackDirectMessagePayload } from "#compiled/@chat-adapter/slack/webhook.js";
/**
 * Author metadata for an inbound Slack message. Channel-owned shape;
 * does not depend on the chat SDK's `Author` interface.
 */
export interface SlackAuthor {
    readonly userId: string;
    readonly userName: string | undefined;
    readonly fullName: string | undefined;
    readonly isBot: boolean;
    readonly isMe: boolean;
}
/**
 * Inbound Slack file attachment. The channel reads only `type`, `url`,
 * `name`, `mimeType`, and `size`. The full Slack file object stays
 * available on {@link SlackMessage.raw}.
 */
export interface SlackAttachment {
    readonly id: string;
    readonly type: "image" | "file" | "video" | "audio";
    readonly url: string | undefined;
    readonly name: string | undefined;
    readonly mimeType: string | undefined;
    readonly size: number | undefined;
}
/**
 * Channel-owned representation of one inbound Slack message.
 *
 * Returned for the triggering Slack event. Replaces the chat SDK
 * `Message` type in the public callback surface (e.g.
 * `onAppMention(ctx, message)`).
 */
export interface SlackMessage {
    /** The original Slack text (mrkdwn). */
    readonly text: string;
    /** {@link text} re-rendered as GFM markdown for the agent. */
    readonly markdown: string;
    /** Slack message ts. */
    readonly ts: string;
    /** Thread parent ts (root). Equals {@link ts} for non-thread events. */
    readonly threadTs: string;
    /** Slack channel id. */
    readonly channelId: string;
    /** Slack team id, when the envelope carried one. */
    readonly teamId: string | undefined;
    /** Author of the message. May be `undefined` for system events. */
    readonly author: SlackAuthor | undefined;
    /** File / image attachments on the inbound message. */
    readonly attachments: readonly SlackAttachment[];
    /** Raw inbound event payload from Slack. */
    readonly raw: Record<string, unknown>;
}
/**
 * Open-ended Slack Events API payload handed to `slackChannel({ onEvent })`.
 * `type` is the Slack event discriminator; all event-specific fields pass
 * through unchanged from the signed webhook body.
 */
export interface SlackEvent {
    readonly type: string;
    readonly [key: string]: unknown;
}
/**
 * Slack webhook envelope for an `event_callback`. The channel cares
 * only about `team_id` (for ergonomic auth derivation) and the inner
 * `event` payload.
 */
export interface SlackEventCallback {
    readonly type: "event_callback";
    readonly team_id?: string;
    readonly authorizations?: readonly {
        readonly is_bot?: boolean;
        readonly user_id?: string;
    }[];
    readonly event?: {
        readonly type?: string;
    } & Record<string, unknown>;
    readonly event_id?: string;
    readonly event_time?: number;
    readonly [key: string]: unknown;
}
/**
 * Validated Slack Events API callback envelope handed to `onEvent` through
 * {@link SlackInboundEventContext}. Unlike the permissive parser input type,
 * this shape always carries an event with a non-empty `type` discriminator.
 */
export interface SlackEventEnvelope extends SlackEventCallback {
    readonly event: SlackEvent;
}
/**
 * Parses a raw JSON webhook body into an open-ended Slack Events API envelope.
 * Returns `null` for URL verification, interactivity, and malformed callback
 * payloads. Invalid JSON is allowed to throw so the route can log it once.
 */
export declare function parseSlackEventEnvelope(body: string): SlackEventEnvelope | null;
/**
 * Parses a Slack `app_mention` event into a {@link SlackMessage}.
 *
 * Returns `null` when the envelope is not an `app_mention` event or
 * when required fields (channel id, ts) are missing.
 */
export declare function parseAppMentionEvent(envelope: SlackEventCallback): SlackMessage | null;
/**
 * Parses a Slack `message` event with `channel_type: "im"` into a
 * {@link SlackMessage}.
 *
 * Returns `null` when:
 * - the envelope is not an IM `message` event,
 * - required fields (channel id, ts) are missing,
 * - the message carries a system `subtype` (edits, deletes, joins, etc.)
 *   other than `file_share` — file uploads are real user messages and
 *   must reach the handler with their attachments intact, or
 * - the message was posted by a bot (`bot_id` set) — this prevents the
 *   bot's own DM replies from re-triggering the handler.
 */
/** Returns the bot user id attached to a Slack event authorization. */
export declare function slackEventBotUserId(envelope: SlackEventCallback): string | undefined;
/** Parses a Slack message event without applying bot or subtype policy. */
export declare function parseMessageEvent(envelope: SlackEventCallback): SlackMessage | null;
export declare function parseDirectMessageEvent(envelope: SlackEventCallback): SlackMessage | null;
export declare function slackMessageFromWebhookPayload(payload: SlackAppMentionPayload | SlackDirectMessagePayload): SlackMessage | null;
/**
 * Verified inbound identity used to attribute a model-visible Slack message.
 *
 * Channel-owned shape so the helper does not depend on the inbound
 * `SlackMessage` and is therefore trivially testable in isolation.
 */
export interface SlackInboundContext {
    readonly userId: string;
    readonly userName?: string;
    readonly fullName?: string;
    readonly channelId: string;
    readonly threadTs: string;
    readonly teamId?: string;
}
