import type { SlackThread, SlackThreadMessage } from "#public/channels/slack/api.js";
/**
 * Boundary for {@link loadThreadContextMessages}. `"thread-root"` returns all
 * prior thread messages; `"last-agent-reply"` returns only messages after the
 * last agent-authored reply; a predicate returns only messages after the last
 * one it matches.
 */
export type ThreadContextSince = "thread-root" | "last-agent-reply" | ((message: SlackThreadMessage) => boolean);
/** Options for {@link loadThreadContextMessages}. */
export interface LoadThreadContextMessagesOptions {
    /**
     * Boundary for returned context messages. Defaults to `"thread-root"`.
     *
     * Use `"last-agent-reply"` to include only user/thread messages
     * since the last agent-authored Slack reply. Pass a predicate
     * function for custom boundaries, such as "since the last message
     * that mentioned a particular user".
     */
    readonly since?: ThreadContextSince;
}
/**
 * Loads messages that are useful as background context for the current
 * Slack thread turn.
 *
 * Returns an empty array when `message` is the thread root. For thread
 * replies, reuses already loaded thread messages or refreshes the bound
 * Slack thread, then returns messages before the triggering message,
 * filtered by {@link options}. Formatting and model-message role choice
 * stay with the caller.
 */
export declare function loadThreadContextMessages(thread: Pick<SlackThread, "recentMessages" | "refresh">, message: {
    readonly threadTs: string;
    readonly ts: string;
}, options?: LoadThreadContextMessagesOptions): Promise<SlackThreadMessage[]>;
