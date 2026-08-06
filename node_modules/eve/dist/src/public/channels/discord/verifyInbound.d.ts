import type { DiscordChannelCredentials } from "#public/channels/discord/discordChannel.js";
/**
 * Verifies an inbound Discord request and returns its raw body, or
 * `null` when verification fails.
 */
export declare function verifyDiscordInbound(req: Request, credentials: DiscordChannelCredentials | undefined): Promise<string | null>;
