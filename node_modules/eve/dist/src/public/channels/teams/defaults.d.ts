import type { SessionAuthContext } from "#channel/types.js";
import type { ConnectionAuthorizationOutcome } from "#protocol/message.js";
import { type TeamsMention } from "#public/channels/teams/api.js";
import type { TeamsInvokeActivity, TeamsMessageActivity } from "#public/channels/teams/inbound.js";
import type { TeamsChannelEvents, TeamsContext, TeamsInboundResult } from "#public/channels/teams/teamsChannel.js";
/** Default auth projection for Teams message actors. */
export declare function defaultTeamsAuth(message: TeamsMessageActivity | TeamsInvokeActivity): SessionAuthContext;
/** Default message hook: mention-gated dispatch with Teams user auth. */
export declare function defaultOnMessage(ctx: TeamsContext, message: TeamsMessageActivity): Promise<TeamsInboundResult>;
/** Built-in Teams event handlers for typing, replies, HITL, auth cards, and terminal errors. */
export declare const defaultEvents: TeamsChannelEvents;
/** Capitalizes the first character of a connection name for Teams auth card display (e.g. "linear" -> "Linear"). */
export declare function formatConnectionDisplayName(connectionName: string): string;
/** Builds final-state text for a completed connection authorization attempt. */
export declare function buildAuthCompletedText(input: {
    readonly displayName: string;
    readonly outcome: ConnectionAuthorizationOutcome;
    readonly reason?: string;
}): string;
/** Builds a Teams mention entity and matching text for one channel account. */
export declare function teamsMentionUser(user: {
    readonly id: string;
    readonly name?: string;
}): TeamsMention;
