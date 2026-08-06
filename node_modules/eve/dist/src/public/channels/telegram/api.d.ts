/**
 * Minimal Telegram Bot API wrapper for the Telegram channel.
 *
 * The channel talks directly to Telegram's JSON HTTP API instead of
 * exposing a third-party SDK through eve public surfaces.
 */
import { type JsonObject } from "#shared/json.js";
import { type TelegramChatType } from "#public/channels/telegram/inbound.js";
/** Telegram bot token, materialized directly or from an async secret provider. */
export type TelegramBotToken = string | (() => string | Promise<string>);
/** Fetch implementation override for tests or non-standard runtimes. */
export type TelegramFetch = typeof fetch;
/** Credentials for the native Telegram channel. */
export interface TelegramCredentials {
    readonly botToken?: TelegramBotToken;
}
/**
 * Common options for the Telegram API helpers. `apiBaseUrl` defaults to
 * `https://api.telegram.org`; `fileBaseUrl` falls back to `apiBaseUrl` for file
 * downloads. `fetch` overrides the global fetch; `credentials` carries the bot token.
 */
export interface TelegramApiOptions {
    readonly apiBaseUrl?: string;
    readonly credentials?: TelegramCredentials;
    readonly fetch?: TelegramFetch;
    readonly fileBaseUrl?: string;
}
/**
 * Decoded result of a Telegram JSON API call: `body` is the parsed response
 * (JSON object, string, or null); `ok` and `status` mirror the HTTP response.
 */
export interface TelegramApiResponse {
    readonly body: unknown;
    readonly ok: boolean;
    readonly status: number;
}
/** Minimal Telegram message object returned by channel write operations. */
export interface TelegramMessageResult {
    /** Telegram message id, or `""` when Telegram returned no message id. */
    readonly id: string;
    /** Telegram chat id associated with the message, when Telegram returned one. */
    readonly chatId?: string;
    /** Recognized Telegram chat type associated with the message, when returned. */
    readonly chatType?: TelegramChatType;
    /** Telegram's raw JSON response. */
    readonly raw: unknown;
}
/**
 * Body for Telegram's `sendMessage`. Only `text` is required; the remaining
 * snake_case fields are forwarded to Telegram unchanged.
 */
export interface TelegramMessageBody {
    readonly disable_notification?: boolean;
    readonly link_preview_options?: Readonly<Record<string, unknown>>;
    readonly message_thread_id?: number;
    readonly protect_content?: boolean;
    readonly reply_markup?: Readonly<Record<string, unknown>>;
    readonly reply_parameters?: Readonly<Record<string, unknown>>;
    readonly text: string;
}
/** Telegram's documented text-message cap. */
export declare const TELEGRAM_MESSAGE_TEXT_MAX_LENGTH = 4096;
/**
 * Builds the channel-local continuation token.
 *
 * Private chats use only `chatId`; group and forum-topic sessions add
 * `messageThreadId` and `conversationId` so multiple bot conversations in the
 * same chat do not collapse into one session.
 */
export declare function telegramContinuationToken(input: {
    readonly chatId: number | string;
    readonly conversationId?: number | string;
    readonly messageThreadId?: number;
}): string;
/** Resolves a Telegram bot token, falling back to `TELEGRAM_BOT_TOKEN`. */
export declare function resolveTelegramBotToken(token?: TelegramBotToken): Promise<string>;
/** Low-level Telegram JSON API call. */
export declare function callTelegramApi(input: {
    readonly apiBaseUrl?: string;
    readonly body?: JsonObject;
    readonly botToken?: TelegramBotToken;
    readonly fetch?: TelegramFetch;
    readonly method: string;
}): Promise<TelegramApiResponse>;
/** Sends a text message through Telegram's `sendMessage` method. */
export declare function sendTelegramMessage(input: TelegramApiOptions & {
    readonly body: TelegramMessageBody;
    readonly chatId: number | string;
}): Promise<TelegramMessageResult>;
/**
 * Sends a Telegram chat action (e.g. `typing`) for the given chat. Pass
 * `messageThreadId` to scope the indicator to a forum topic.
 */
export declare function sendTelegramChatAction(input: TelegramApiOptions & {
    readonly action: string;
    readonly chatId: number | string;
    readonly messageThreadId?: number;
}): Promise<TelegramApiResponse>;
/** Answers a Telegram callback query so the user's client clears the spinner. */
export declare function answerTelegramCallbackQuery(input: TelegramApiOptions & {
    readonly callbackQueryId: string;
    readonly showAlert?: boolean;
    readonly text?: string;
}): Promise<TelegramApiResponse>;
/** Edits only the reply markup for one Telegram message. */
export declare function editTelegramMessageReplyMarkup(input: TelegramApiOptions & {
    readonly chatId: number | string;
    readonly messageId: number | string;
    readonly replyMarkup?: Readonly<Record<string, unknown>>;
}): Promise<TelegramApiResponse>;
/** Resolves Telegram file metadata through `getFile`. */
export declare function getTelegramFile(input: TelegramApiOptions & {
    readonly fileId: string;
}): Promise<{
    readonly filePath: string;
    readonly raw: unknown;
}>;
/** Downloads file bytes from Telegram's file endpoint. */
export declare function downloadTelegramFile(input: TelegramApiOptions & {
    readonly filePath: string;
}): Promise<Response>;
/** Splits text into chunks Telegram will accept as individual sendMessage calls. */
export declare function splitTelegramMessageText(text: string): readonly string[];
