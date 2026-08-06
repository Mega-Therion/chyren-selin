import type { FilePart, UserContent } from "ai";
import type { FetchFileResult } from "#channel/adapter.js";
import { type SlackBotToken, type SlackThread } from "#public/channels/slack/api.js";
import type { SlackAttachment, SlackMessage } from "#public/channels/slack/inbound.js";
import type { UploadPolicy } from "#public/channels/upload-policy.js";
/**
 * Emits one {@link FilePart} per supported attachment in the inbound
 * message, with `data` set to a `URL` object pointing at the Slack
 * file. Audio, video, URL-less, and policy-violating attachments are
 * dropped so a single bad upload never blocks the text portion.
 *
 * The `URL` object in `data` is resolved by the channel's `fetchFile`
 * function at staging time inside the workflow step.
 */
export declare function collectSlackFileParts(attachments: readonly SlackAttachment[] | undefined, policy: UploadPolicy): FilePart[];
/**
 * Collects file parts for an inbound mention.
 *
 * Prefers attachments on the triggering mention (the common case: user
 * uploads a file and mentions the bot in the same message). When the
 * mention has none, refreshes the thread via {@link SlackThread.refresh}
 * and picks the attachments of the latest message this app did not
 * author (the thread message `isMe` classification) — covering the case
 * where a user or another bot dropped a file in the thread first, then a
 * user mentioned the bot in a follow-up. Any error during refresh is logged
 * and treated as "no attachments" so the text portion of the mention
 * still gets delivered.
 *
 * Skips the thread-history lookback when the policy disables uploads,
 * since the refresh can't surface anything we'd deliver.
 */
export declare function collectInboundFileParts(input: {
    readonly mention: Pick<SlackMessage, "attachments">;
    readonly thread: SlackThread;
    readonly policy: UploadPolicy;
}): Promise<FilePart[]>;
/**
 * Combines text + file parts into the {@link UserContent} shape the
 * harness expects. Returns the raw text string when there are no
 * parts (the common path).
 */
export declare function buildSlackTurnMessage(text: string, fileParts: readonly FilePart[]): string | UserContent;
/**
 * Creates a `fetchFile` function for the Slack channel.
 *
 * Returns `null` for URLs that don't belong to Slack so they pass
 * through to the model provider unchanged. Fetches Slack file URLs
 * with the bot token.
 */
export declare function createSlackFetchFile(input: {
    readonly botToken?: SlackBotToken;
}): (url: string) => Promise<FetchFileResult | null>;
