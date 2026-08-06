import type { UserContent } from "ai";
import type { Message } from "#compiled/chat/index.js";
/** Returns model-visible Photon content, or `undefined` for non-message events. */
export declare function photonInboundContent(message: Message): string | UserContent | undefined;
