import type { FilePart, UserContent } from "ai";
import type { FetchFileResult } from "#channel/adapter.js";
import { type TelegramApiOptions } from "#public/channels/telegram/api.js";
import type { TelegramAttachment, TelegramMessage } from "#public/channels/telegram/inbound.js";
import { type UploadPolicy } from "#public/channels/upload-policy.js";
/** URL protocol used by the channel to defer Telegram file downloads to `fetchFile`. */
export declare const TELEGRAM_FILE_URL_PROTOCOL = "telegram-file:";
/** Emits one {@link FilePart} per supported Telegram attachment. */
export declare function collectTelegramFileParts(attachments: readonly TelegramAttachment[], policy: UploadPolicy): FilePart[];
/** Combines text/caption + file parts into the {@link UserContent} shape the harness expects. */
export declare function buildTelegramTurnMessage(message: Pick<TelegramMessage, "caption" | "text">, fileParts: readonly FilePart[]): string | UserContent;
/**
 * Creates a `fetchFile` function for `telegram-file:` URLs. The returned
 * function resolves to `null` for unrecognized URLs and throws on HTTP errors
 * or upload-policy violations.
 */
export declare function createTelegramFetchFile(input: {
    readonly api?: Omit<TelegramApiOptions, "credentials">;
    readonly credentials?: TelegramApiOptions["credentials"];
    readonly policy: UploadPolicy;
}): (url: string) => Promise<FetchFileResult | null>;
/**
 * Builds a `telegram-file:` URL (fileId in the path, optional `filename` and
 * `mediaType` query params) that defers the download to the channel's
 * `fetchFile`. {@link createTelegramFetchFile} parses it back.
 */
export declare function createTelegramFileUrl(input: {
    readonly fileId: string;
    readonly filename?: string;
    readonly mediaType?: string;
}): URL;
