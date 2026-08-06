/**
 * Slack API string-length guards.
 *
 * Slack rejects payloads where a string exceeds its surface-specific
 * limit (typing indicator, Block Kit `plain_text` fields, modal titles,
 * etc.). The chat SDK does not enforce these for us — anything that
 * overruns surfaces as a `chat.postMessage` / `assistant.threads.setStatus`
 * / `views.open` HTTP error. These helpers cap strings before they cross
 * the wire so a single long tool name or option label cannot fail the
 * whole event handler.
 */
/**
 * Typing indicator (`assistant.threads.setStatus`) caps at roughly 100
 * characters; we use 50 to match the pre-existing UX (statuses longer
 * than a glance are hard to read in the chat UI anyway).
 */
export declare const SLACK_TYPING_STATUS_MAX_LENGTH = 50;
/**
 * Block Kit `plain_text` fields used in `static_select` / `radio_buttons`
 * options and button labels are capped at 75 characters by Slack.
 */
export declare const SLACK_BLOCK_KIT_PLAIN_TEXT_MAX_LENGTH = 75;
/**
 * Block Kit `section` blocks cap `text.text` at 3000 chars. Anything
 * longer fails the whole post with `invalid_blocks`.
 */
export declare const SLACK_SECTION_TEXT_MAX_LENGTH = 3000;
/**
 * Block Kit `card` blocks cap `body.text` at 200 chars.
 */
export declare const SLACK_CARD_BODY_TEXT_MAX_LENGTH = 200;
/**
 * Block Kit `card` blocks cap `subtext.text` at 200 chars.
 */
export declare const SLACK_CARD_SUBTEXT_MAX_LENGTH = 200;
/**
 * Top-level `text` field on `chat.postMessage` is capped at 40000 chars.
 */
export declare const SLACK_MESSAGE_TEXT_MAX_LENGTH = 40000;
/**
 * `chat.postMessage` rejects payloads with more than 50 blocks
 * (`invalid_blocks`).
 */
export declare const SLACK_MAX_BLOCKS_PER_MESSAGE = 50;
/**
 * `views.open` modal title is capped at 24 characters.
 */
export declare const SLACK_MODAL_TITLE_MAX_LENGTH = 24;
/**
 * Normalizes a typing status: strips lightweight Markdown that Slack
 * assistant-thread status does not render, trims, collapses runs of
 * whitespace into a single space, then truncates to
 * {@link SLACK_TYPING_STATUS_MAX_LENGTH} with a trailing ellipsis when
 * needed.
 */
export declare function truncateTypingStatus(status: string): string;
/**
 * Caps a Block Kit `plain_text` label/description at the Slack limit
 * with a trailing ellipsis. Pass `undefined` to short-circuit (option
 * descriptions are optional).
 */
export declare function truncatePlainText(value: string): string;
export declare function truncatePlainText(value: string | undefined): string | undefined;
/**
 * Caps a section block's `text.text` at the Slack limit with a
 * trailing ellipsis.
 */
export declare function truncateSectionText(value: string): string;
/**
 * Caps a card block's `body.text` at the Slack limit with a trailing
 * ellipsis.
 */
export declare function truncateCardBodyText(value: string): string;
/**
 * Caps a card block's `subtext.text` at the Slack limit with a trailing
 * ellipsis.
 */
export declare function truncateCardSubtext(value: string): string;
/**
 * Caps a `chat.postMessage` `text` field at the Slack limit with a
 * trailing ellipsis.
 */
export declare function truncateMessageText(value: string): string;
/**
 * Caps a modal title at the Slack limit with a trailing ellipsis.
 */
export declare function truncateModalTitle(value: string): string;
