import type { SessionAuthContext } from "#channel/types.js";
import type { SlackMessage } from "#public/channels/slack/inbound.js";
import type { SlackChannelEvents, SlackChannelInternalEvents, SlackContext, SlackMentionResult } from "#public/channels/slack/slackChannel.js";
/**
 * Workspace-scoped projection of the Slack actor that produced
 * `message`, derived into a {@link SessionAuthContext}. Used by both
 * {@link defaultOnAppMention} and {@link defaultOnDirectMessage} when
 * the customer hasn't supplied their own `onAppMention` /
 * `onDirectMessage`. Returns `null` when the message has no author.
 */
export declare function defaultSlackAuth(message: SlackMessage, ctx: SlackContext): SessionAuthContext | null;
/**
 * Default `onAppMention` — derives auth from the Slack actor and posts
 * a `"Thinking…"` typing indicator before the workflow runtime starts.
 */
export declare function defaultOnAppMention(ctx: SlackContext, message: SlackMessage): Promise<SlackMentionResult>;
/**
 * Default `onDirectMessage` — derives auth from the Slack actor and
 * posts a `"Thinking…"` typing indicator before the workflow runtime
 * starts. Matches the default mention behavior; replace the option to
 * customize gating, auth derivation, or pre-dispatch side effects.
 */
export declare function defaultOnDirectMessage(ctx: SlackContext, message: SlackMessage): Promise<SlackMentionResult>;
/**
 * Default `input.requested` handler — renders each pending HITL
 * request as Slack `block_actions`. Buttons by default; radio for
 * ≤6-option select requests; static_select for >6-option select
 * requests. Batches split into multiple posts when they would exceed
 * Slack's 50-block message cap. Override by declaring
 * `events["input.requested"]`.
 */
export declare function defaultInputRequestedHandler(): NonNullable<SlackChannelEvents["input.requested"]>;
/**
 * Built-in Slack event handlers — typing indicators, error replies,
 * and the connection-authorization status flow. Each is overridable
 * per-event by passing the same key under `slackChannel({ events })`.
 * Typed as the internal full-context map because the default
 * `authorization.required` handler owns the public link-free status,
 * which user overrides cannot express.
 */
export declare const defaultEvents: SlackChannelInternalEvents;
