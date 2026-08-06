import type { UserContent } from "ai";
import type { Message } from "#compiled/chat/index.js";
/**
 * Converts a Chat SDK `Message` into the input shape `chatSdkChannel().send`
 * accepts.
 *
 * Returns `message.text` when the message has no attachments. When attachments
 * are present, returns an AI SDK `UserContent` array: the text (when non-empty)
 * followed by one `file` part per attachment that exposes a URL. Attachments
 * without a URL are skipped, and a message whose only attachments lack URLs
 * falls back to `message.text`.
 */
export declare function messageToUserContent(message: Message): string | UserContent;
