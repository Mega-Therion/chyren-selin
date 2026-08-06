/**
 * Inbound Microsoft Teams activity parsing and prompt shaping.
 *
 * The channel owns small, documented data shapes instead of exposing the
 * full Bot Framework SDK Activity model as the primary public API.
 */
import type { TeamsAttachment, TeamsChannelAccount, TeamsMention } from "#public/channels/teams/api.js";
/**
 * Normalized Teams conversation scope inferred from the inbound activity's
 * `conversationType`, falling back to `isGroup`. `unknown` is used when neither
 * field identifies the scope, so callers switching over this union must handle it.
 */
export type TeamsConversationScope = "channel" | "groupChat" | "personal" | "unknown";
/** Bot Framework conversation account fields used by the Teams channel. */
export interface TeamsConversationAccount {
    readonly conversationType?: string;
    readonly id: string;
    readonly isGroup?: boolean;
    readonly name?: string;
    readonly tenantId?: string;
}
/** Common fields shared by parsed Teams activities. */
export interface TeamsActivityBase {
    readonly channelData: Record<string, unknown>;
    readonly conversation: TeamsConversationAccount;
    readonly conversationType?: string;
    readonly from: TeamsChannelAccount;
    readonly id: string;
    readonly raw: Record<string, unknown>;
    readonly recipient: TeamsChannelAccount;
    readonly serviceUrl: string;
    readonly tenantId?: string;
    readonly teamId?: string;
    readonly teamsChannelId?: string;
}
/** Parsed Teams message activity. */
export interface TeamsMessageActivity extends TeamsActivityBase {
    readonly attachments: readonly TeamsAttachment[];
    readonly isBotMentioned: boolean;
    readonly mentions: readonly TeamsMention[];
    readonly replyToId?: string;
    readonly scope: TeamsConversationScope;
    readonly text: string;
    readonly textFormat?: string;
    readonly type: "message";
    readonly value?: Record<string, unknown>;
}
/** Parsed Teams invoke activity. */
export interface TeamsInvokeActivity extends TeamsActivityBase {
    readonly name: string;
    readonly replyToId?: string;
    readonly scope: TeamsConversationScope;
    readonly type: "invoke";
    readonly value?: Record<string, unknown>;
}
/** Parsed Teams conversation-update activity. */
export interface TeamsConversationUpdateActivity extends TeamsActivityBase {
    readonly type: "conversationUpdate";
}
/** Parsed Teams activity variants handled by the native channel. */
export type TeamsActivity = TeamsConversationUpdateActivity | TeamsInvokeActivity | TeamsMessageActivity;
/** Inbound context rendered into the model-visible `<teams_context>` block. */
export interface TeamsInboundContext {
    readonly activityId: string;
    readonly channelId?: string;
    readonly conversationId: string;
    readonly conversationType?: string;
    readonly scope: TeamsConversationScope;
    readonly teamId?: string;
    readonly tenantId?: string;
    readonly userId: string;
    readonly userName?: string;
}
/** Parses one JSON-decoded Teams activity payload. */
export declare function parseTeamsActivity(value: unknown): TeamsActivity | null;
/** Returns true when the message's inferred scope is `personal` (a one-on-one chat with the bot). */
export declare function isTeamsPersonalMessage(activity: TeamsMessageActivity): boolean;
/** Returns the root activity id that should anchor a Teams thread, when any. */
export declare function teamsThreadRootActivityId(activity: TeamsMessageActivity | TeamsInvokeActivity): string | null;
/**
 * Renders one {@link TeamsInboundContext} as a `<teams_context>` block of
 * `key: value` lines for the model. Optional fields (user name, conversation
 * type, tenant, team, channel) are omitted when absent; field order is stable.
 */
export declare function formatTeamsContextBlock(context: TeamsInboundContext): string;
