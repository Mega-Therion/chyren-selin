/**
 * Inbound Telegram update parsing and prompt shaping.
 *
 * The channel defines small, documented data shapes and does not return
 * Telegram's raw webhook payloads as the public API.
 */
/**
 * Telegram chat types the channel recognizes. Note: the channel parses
 * `channel` updates but never dispatches them to the agent.
 */
export type TelegramChatType = "channel" | "group" | "private" | "supergroup";
/** Telegram user metadata that inbound messages and callbacks carry. */
export interface TelegramUser {
    readonly firstName?: string;
    readonly id: string;
    readonly isBot: boolean;
    readonly languageCode?: string;
    readonly lastName?: string;
    readonly username?: string;
}
/** Telegram chat metadata that inbound messages carry. */
export interface TelegramChat {
    readonly id: string;
    readonly title?: string;
    readonly type: TelegramChatType;
    readonly username?: string;
}
/** Inbound Telegram file attachment. */
export interface TelegramAttachment {
    readonly fileId: string;
    readonly fileName?: string;
    readonly fileUniqueId?: string;
    readonly height?: number;
    readonly kind: "document" | "photo";
    readonly mediaType?: string;
    readonly size?: number;
    readonly width?: number;
}
/** Minimal Telegram message representation nested on replies/callbacks. */
export interface TelegramMessageReference {
    readonly chat: TelegramChat;
    readonly from?: TelegramUser;
    readonly messageId: string;
    readonly messageThreadId?: number;
}
/**
 * Channel-owned representation of one inbound Telegram message. `text` and
 * `caption` default to `""` (never undefined), and `attachments` is always an
 * array (possibly empty).
 */
export interface TelegramMessage {
    readonly attachments: readonly TelegramAttachment[];
    readonly caption: string;
    readonly chat: TelegramChat;
    readonly from?: TelegramUser;
    readonly messageId: string;
    readonly messageThreadId?: number;
    readonly raw: Record<string, unknown>;
    readonly replyToMessage?: TelegramMessageReference;
    readonly text: string;
}
/** Channel-owned representation of one inbound Telegram callback query. */
export interface TelegramCallbackQuery {
    readonly data?: string;
    readonly from: TelegramUser;
    readonly id: string;
    readonly message?: TelegramMessageReference;
    readonly raw: Record<string, unknown>;
}
/**
 * Discriminated union of inbound updates the channel handles. Switch on `kind`:
 * `"message"` carries `message`, `"callback_query"` carries `callbackQuery`.
 */
export type TelegramUpdate = {
    readonly kind: "callback_query";
    readonly callbackQuery: TelegramCallbackQuery;
} | {
    readonly kind: "message";
    readonly message: TelegramMessage;
};
/**
 * Inbound identity and response guidance that {@link formatTelegramContextBlock}
 * renders into the model-visible context block.
 */
export interface TelegramInboundContext {
    readonly botUsername?: string;
    readonly chatId: string;
    readonly chatTitle?: string;
    readonly chatType: TelegramChatType;
    readonly messageId: string;
    readonly messageThreadId?: number;
    readonly userId?: string;
    readonly username?: string;
}
/** Parses one JSON-decoded Telegram update payload. */
export declare function parseTelegramUpdate(value: unknown): TelegramUpdate | null;
/**
 * Renders one {@link TelegramInboundContext} as a deterministic
 * `<telegram_context>` block with fixed response instructions and the chat and
 * user identity fields.
 */
export declare function formatTelegramContextBlock(context: TelegramInboundContext): string;
/** Parses the Telegram chat types eve recognizes from inbound and send responses. */
export declare function parseTelegramChatType(value: unknown): TelegramChatType | null;
