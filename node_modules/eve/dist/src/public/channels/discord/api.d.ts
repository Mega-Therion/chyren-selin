/**
 * Minimal Discord REST API wrapper. The channel talks directly to Discord's
 * JSON HTTP API rather than exposing a third-party SDK through eve.
 */
import { type JsonObject } from "#shared/json.js";
import { resolveDiscordPublicKey, type DiscordPublicKey } from "#public/channels/discord/verify.js";
/** Discord application id, materialized directly or from an async secret provider. */
export type DiscordApplicationId = string | (() => string | Promise<string>);
/** Discord bot token, materialized directly or from an async secret provider. */
export type DiscordBotToken = string | (() => string | Promise<string>);
/** Fetch implementation override used by tests or non-standard runtimes. */
export type DiscordFetch = typeof fetch;
/**
 * Credentials used by the native Discord channel. Each field falls back to the
 * matching `DISCORD_*` env var when omitted.
 */
export interface DiscordCredentials {
    /** Required to edit or follow up on interaction responses. Falls back to `DISCORD_APPLICATION_ID`. */
    readonly applicationId?: DiscordApplicationId;
    /** Required for channel messages and typing indicators. Falls back to `DISCORD_BOT_TOKEN`. */
    readonly botToken?: DiscordBotToken;
    /** Required for inbound Ed25519 interaction verification. Falls back to `DISCORD_PUBLIC_KEY`. */
    readonly publicKey?: DiscordPublicKey;
}
/** Shared Discord API options. */
export interface DiscordApiOptions {
    readonly apiBaseUrl?: string;
    readonly credentials?: DiscordCredentials;
    readonly fetch?: DiscordFetch;
}
/** Raw Discord API call result. `body` is parsed JSON, or text/null when not JSON. */
export interface DiscordApiResponse {
    readonly status: number;
    readonly ok: boolean;
    readonly body: unknown;
}
/** Minimal Discord message object returned by channel write operations. */
export interface DiscordPostedMessage {
    /** Discord message id, when Discord returned one. */
    readonly id: string;
    /** Channel id associated with the message, when Discord returned one. */
    readonly channelId?: string;
    /** Discord's raw JSON response. */
    readonly raw: unknown;
}
/** Allowed mentions payload that suppresses all generated pings. */
export declare const DISCORD_NO_MENTIONS: JsonObject;
/** Discord's documented message-content cap. */
export declare const DISCORD_MESSAGE_CONTENT_MAX_LENGTH = 2000;
/** Builds the channel-local continuation token (`<channelId>:<conversationId>`). */
export declare function discordContinuationToken(channelId: string, conversationId: string | undefined): string;
/** Resolves a Discord application id, falling back to `DISCORD_APPLICATION_ID`. */
export declare function resolveDiscordApplicationId(applicationId?: DiscordApplicationId): Promise<string>;
/** Resolves a Discord bot token, falling back to `DISCORD_BOT_TOKEN`. */
export declare function resolveDiscordBotToken(botToken?: DiscordBotToken): Promise<string>;
export { resolveDiscordPublicKey };
/**
 * Low-level Discord JSON API call. Defaults to POST against
 * `https://discord.com/api/v10`. Bot-token auth is added only when a token is
 * supplied (interaction webhook endpoints run unauthenticated). Does not throw
 * on non-2xx, so callers must inspect `ok`/`status`.
 */
export declare function callDiscordApi(input: {
    readonly apiBaseUrl?: string;
    readonly body?: JsonObject;
    readonly botToken?: DiscordBotToken;
    readonly fetch?: DiscordFetch;
    readonly method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
    readonly path: string;
}): Promise<DiscordApiResponse>;
/** Sends a bot-authenticated message to one Discord channel. */
export declare function sendDiscordChannelMessage(input: DiscordApiOptions & {
    readonly body: DiscordMessageBody;
    readonly channelId: string;
}): Promise<DiscordPostedMessage>;
/** Triggers Discord's short-lived channel typing indicator with bot auth. */
export declare function triggerDiscordTypingIndicator(input: DiscordApiOptions & {
    readonly channelId: string;
}): Promise<void>;
/** Edits the original response for a deferred Discord interaction. */
export declare function editDiscordOriginalResponse(input: DiscordApiOptions & {
    readonly body: DiscordMessageBody;
    readonly interactionToken: string;
}): Promise<DiscordPostedMessage>;
/** Creates a Discord interaction followup message. */
export declare function createDiscordFollowupMessage(input: DiscordApiOptions & {
    readonly body: DiscordMessageBody;
    readonly interactionToken: string;
}): Promise<DiscordPostedMessage>;
/**
 * JSON body for the Discord message endpoints eve calls. When
 * `allowed_mentions` is omitted, channel write helpers default it to
 * {@link DISCORD_NO_MENTIONS} (no pings); set it explicitly to allow mentions.
 */
export interface DiscordMessageBody {
    readonly allowed_mentions?: Readonly<Record<string, unknown>>;
    readonly components?: readonly Readonly<Record<string, unknown>>[];
    readonly content?: string;
    readonly flags?: number;
    readonly tts?: boolean;
}
/**
 * Splits text into chunks Discord accepts as individual message contents. An
 * empty string yields one empty chunk so callers can handle no-content messages.
 */
export declare function splitDiscordMessageContent(content: string): readonly string[];
