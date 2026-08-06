import { type CardElement } from "#compiled/chat/index.js";
/** A Slack Block Kit block emitted by {@link cardToBlocks}. */
export type BlockKitBlock = Record<string, unknown>;
/** Converts a Chat SDK card into Slack Block Kit blocks. */
export declare function cardToBlocks(card: CardElement): BlockKitBlock[];
/** Creates the plain-text fallback used for notifications and accessibility. */
export declare function cardToFallbackText(card: CardElement): string;
