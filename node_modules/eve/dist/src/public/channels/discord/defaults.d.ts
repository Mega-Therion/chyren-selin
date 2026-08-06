import type { SessionAuthContext } from "#channel/types.js";
import type { DiscordCommandInteraction } from "#public/channels/discord/inbound.js";
import type { DiscordChannelEvents, DiscordCommandResult, DiscordContext } from "#public/channels/discord/discordChannel.js";
/**
 * Builds the default {@link SessionAuthContext} for a Discord command
 * interaction: authenticator `discord-interaction`, guild-scoped
 * issuer/principalId when invoked in a guild (else user-scoped), and
 * `principalType` `service` for bot actors or `user` otherwise. Copies the
 * channel, interaction, user, guild, and member-nick attributes.
 */
export declare function defaultDiscordAuth(interaction: DiscordCommandInteraction): SessionAuthContext;
/** Default command hook: dispatch with Discord user auth. */
export declare function defaultOnCommand(_ctx: DiscordContext, interaction: DiscordCommandInteraction): DiscordCommandResult;
/** Built-in Discord event handlers for typing, replies, HITL, and terminal errors. */
export declare const defaultEvents: DiscordChannelEvents;
