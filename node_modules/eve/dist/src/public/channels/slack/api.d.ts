/**
 * Native Slack Web API surface used by the channel.
 *
 * Exposes two handles to author code via `ctx`:
 *
 * - {@link SlackThread}: operations scoped to the bound thread.
 *   `ctx.thread.post(...)` reads as "post a reply to this thread".
 * - {@link SlackHandle}: Slack identity + raw API escape hatch.
 *   `ctx.slack.request(...)` reads as "raw Slack API call, possibly
 *   not the bound thread".
 *
 * Kept in a thin module so the channel core (`slackChannel.ts`), the
 * interaction handler (`interactions.ts`), and the default event
 * handlers (`defaults.ts`) can all share the same low-level helpers
 * without depending on each other.
 */
import { type SlackApiResponse as SlackPrimitiveApiResponse, type SlackBotToken as SlackPrimitiveBotToken } from "#compiled/@chat-adapter/slack/api.js";
import { type CardElement, type FileUpload } from "#compiled/chat/index.js";
/**
 * Slack bot token, materialized either as a literal `xoxb-...` string or
 * as a (possibly async) function that returns one. The function form
 * supports secret-manager lookups and credential rotation.
 */
export type SlackBotToken = SlackPrimitiveBotToken;
/**
 * Builds the channel-local continuation token (`<channelId>:<threadTs>`).
 * The runtime's `send()` later namespaces it with the channel's
 * path-derived name (`<channelName>:<channelId>:<threadTs>`). `threadTs`
 * may be empty for threadless sessions; the channel auto-anchors on its
 * first post.
 */
export declare function slackContinuationToken(channelId: string, threadTs: string): string;
/**
 * Materializes a {@link SlackBotToken} to a string, falling back to
 * `process.env.SLACK_BOT_TOKEN`. Throws when neither is set.
 */
export declare function resolveSlackBotToken(token?: SlackBotToken): Promise<string>;
/**
 * Slack Web API JSON response envelope. `ok` signals success, `error`
 * carries Slack's error code on failure, and method-specific fields pass
 * through verbatim. Callers inspect `ok` themselves.
 */
export type SlackApiResponse = SlackPrimitiveApiResponse;
/**
 * Low-level POST to a Slack Web API method, signed with the bot token
 * and form-encoded. Form is the only safe default: Slack's JSON support
 * is partial (e.g. `conversations.replies` rejects JSON). Returns the
 * raw JSON response; callers inspect `response.ok` themselves.
 */
export declare function callSlackApi(input: {
    readonly botToken: SlackBotToken | undefined;
    readonly operation: string;
    readonly body: unknown;
}): Promise<SlackApiResponse>;
/**
 * Result of {@link SlackThread.post} / {@link SlackThread.postEphemeral}.
 * The posted message's Slack `ts` is exposed under `id` so callers can
 * target the same message with a follow-up `chat.update`.
 */
export interface SlackPostedMessage {
    /** Slack message `ts`. Empty when Slack did not return one. */
    readonly id: string;
    /** Slack's raw JSON response. */
    readonly raw: SlackApiResponse;
}
/**
 * Optional `files` field shared by every {@link SlackPostInput} variant.
 *
 * When non-empty:
 * - The channel uploads each file via Slack's modern
 *   `files.getUploadURLExternal` → POST bytes → `files.completeUploadExternal`
 *   flow.
 * - For `{ text }`: the text becomes the file post's `initial_comment`,
 *   producing a single Slack message with text and files. Slack
 *   interprets `initial_comment` as mrkdwn.
 * - For `{ markdown }` / `{ blocks }` / `{ card }`: the message lands
 *   first via `chat.postMessage`, then the files are uploaded as a
 *   follow-up message in the same thread. Slack has no native way to
 *   attach arbitrary files inside those message surfaces, and
 *   `initial_comment` cannot render Slack's full Markdown table/header
 *   support.
 */
interface SlackPostWithFiles {
    readonly files?: readonly FileUpload[];
}
/**
 * Inbound shape for {@link SlackThread.post} and
 * {@link SlackThread.postEphemeral}.
 *
 * - `{ markdown }`: Slack's native `markdown_text` field (headings,
 *   tables, lists, etc.).
 * - `{ text }`: Slack's `text` field, interpreted as Slack mrkdwn.
 * - `{ blocks, text? }`: raw Block Kit blocks with optional fallback
 *   text, for layout markdown cannot express.
 * - `{ card, fallbackText? }`: a {@link CardElement} (from the
 *   re-exported `Card`/`Actions`/`Button`/... factories), converted to
 *   Block Kit internally. `fallbackText` overrides the text extracted
 *   from card children.
 *
 * Every variant also accepts an optional `files` field.
 */
export type SlackPostInput = SlackPostWithFiles & ({
    readonly markdown: string;
} | {
    readonly text: string;
} | {
    readonly blocks: readonly unknown[];
    readonly text?: string;
} | {
    readonly card: CardElement;
    readonly fallbackText?: string;
});
/**
 * Options for {@link SlackHandle.uploadFiles}. Defaults follow the bound
 * thread.
 */
export interface SlackUploadFilesOptions {
    /** Override the channel id. Defaults to the binding's `channelId`. */
    readonly channelId?: string;
    /** Override the thread ts. Defaults to the binding's `threadTs`. */
    readonly threadTs?: string;
    /**
     * Optional text shown above the files in the thread. Slack
     * interprets this as mrkdwn.
     */
    readonly initialComment?: string;
}
/**
 * Result of one {@link SlackHandle.uploadFiles} call.
 */
export interface SlackUploadFilesResult {
    /** Slack file ids in upload order. */
    readonly fileIds: readonly string[];
    /** Slack's raw `files.completeUploadExternal` response. */
    readonly raw: SlackApiResponse;
}
/**
 * One thread message returned by {@link SlackThread.refresh} /
 * {@link SlackThread.recentMessages}.
 */
export interface SlackThreadMessage {
    readonly text: string;
    readonly markdown: string;
    readonly user: string | undefined;
    readonly botId: string | undefined;
    readonly ts: string;
    readonly threadTs: string;
    /**
     * Whether this message was authored by the Slack app bound to the thread.
     * Classification requires the binding to carry the app identity (bot user
     * id or app id). Inbound event bindings do; bindings rebuilt from session
     * state or interaction payloads currently do not and mark every message
     * `false`.
     */
    readonly isMe: boolean;
    readonly raw: Record<string, unknown>;
}
/**
 * Thread-scoped Slack handle exposed at `ctx.thread`. Every method
 * targets the thread bound to the current event. For raw calls against a
 * different channel or thread, use {@link SlackHandle.request} on
 * `ctx.slack`.
 */
export interface SlackThread {
    /** Recently fetched thread messages. Populated by {@link refresh}. */
    readonly recentMessages: readonly SlackThreadMessage[];
    /**
     * Fetch the latest replies via {@link refresh} and return the unique
     * human Slack user ids participating in this thread, ordered by first
     * appearance. For a human-started thread, the first entry is the
     * starting author. Bot messages and user-less system messages are
     * excluded.
     *
     * Shares {@link refresh} semantics: it observes at most the first 50
     * messages of the thread, and refresh failures are logged and swallowed,
     * so the returned list may be empty or stale.
     */
    listParticipants(): Promise<readonly string[]>;
    /**
     * Post a reply to this thread.
     *
     * Bare-form shortcuts: `string` becomes `{ markdown }` (so `**bold**` /
     * `[label](url)` render); a {@link CardElement} from `Card(...)`
     * becomes `{ card }`. Otherwise pass a {@link SlackPostInput}
     * explicitly, any variant of which may carry `files`.
     *
     * With `files`, the channel runs Slack's three-step upload flow. The
     * `{ text }` variant attaches files with the text as the upload
     * comment; `{ markdown }`, `{ blocks }`, and `{ card }` post the
     * message first and upload files as a follow-up in the same thread.
     */
    post(message: string | CardElement | SlackPostInput): Promise<SlackPostedMessage>;
    /**
     * Post an ephemeral reply (Slack's `chat.postEphemeral`) visible only
     * to one user in this thread. Accepts the same bare forms and
     * {@link SlackPostInput} variants as {@link post}. The `files` field is
     * ignored: Slack does not support file uploads on ephemeral messages.
     */
    postEphemeral(userId: string, message: string | CardElement | SlackPostInput): Promise<SlackPostedMessage>;
    /**
     * Post a direct message to one user — their IM conversation with the
     * bot, outside this thread. Opens the conversation via Slack's
     * `conversations.open` (requires the `im:write` scope) and posts with
     * the same bare forms and {@link SlackPostInput} variants as
     * {@link post}. The `files` field is ignored.
     */
    postDirectMessage(userId: string, message: string | CardElement | SlackPostInput): Promise<SlackPostedMessage>;
    /**
     * Show a typing/status indicator in this thread via Slack's
     * `assistant.threads.setStatus`. Called with no argument, clears the
     * indicator (empty status). Failures are logged and swallowed: the
     * indicator is a UX nicety, never a reason to fail a turn.
     */
    startTyping(status?: string): Promise<void>;
    /**
     * Fetch the latest replies in this thread into {@link recentMessages}
     * via `conversations.replies` (50-message cap). Overlapping calls share
     * one request. Failures are logged and swallowed without discarding the
     * most recently loaded messages.
     */
    refresh(): Promise<void>;
    /**
     * Returns the Slack mention syntax for a user (`<@U123>`), suitable
     * for embedding in a {@link post} payload.
     */
    mentionUser(userId: string): string;
}
/**
 * Slack identity + raw-API handle exposed at `ctx.slack`, for calls that
 * escape the bound thread: posting in a different channel, looking up
 * users, raw Web API calls, and low-level file uploads. Thread-scoped
 * operations (post, startTyping, refresh) live on {@link SlackThread}
 * (`ctx.thread`).
 */
export interface SlackHandle {
    /** Slack channel id. */
    readonly channelId: string;
    /** Slack thread root ts (or the message ts when not in a thread). */
    readonly threadTs: string;
    /** Slack team id, when the inbound event carried one. */
    readonly teamId: string | undefined;
    /**
     * POST to a Slack Web API method. Returns Slack's raw JSON response.
     * Callers must check `response.ok` themselves.
     */
    request(operation: string, body: unknown): Promise<SlackApiResponse>;
    /**
     * Upload files via Slack's modern external-upload flow, returning the
     * resolved file ids and the raw `files.completeUploadExternal`
     * response. The bot token is resolved at call time so rotated
     * credentials are picked up. Empty `files` is a no-op returning
     * `{ fileIds: [], raw: { ok: true } }`.
     *
     * Prefer `ctx.thread.post({ ..., files })` for thread-scoped uploads.
     * This is the escape hatch for targeting a different channel/thread or
     * pre-staging files without an accompanying message.
     */
    uploadFiles(files: readonly FileUpload[], options?: SlackUploadFilesOptions): Promise<SlackUploadFilesResult>;
}
/**
 * Workspace-scoped Slack API handle exposed to generic inbound event
 * handlers. Events such as `team_join` and `reaction_added` are not always
 * bound to one message thread, so this surface deliberately exposes only
 * workspace identity and the raw Web API escape hatch.
 */
export interface SlackWorkspaceHandle {
    /** Slack team id carried by the Events API envelope, when present. */
    readonly teamId: string | undefined;
    /**
     * POST to a Slack Web API method. Returns Slack's raw JSON response.
     * Callers must check `response.ok` themselves.
     */
    request(operation: string, body: unknown): Promise<SlackApiResponse>;
}
/** Builds the workspace-scoped API handle used by generic event callbacks. */
export declare function buildSlackWorkspaceHandle(input: {
    readonly botToken: SlackBotToken | undefined;
    readonly teamId: string | undefined;
}): SlackWorkspaceHandle;
/**
 * The `{ thread, slack }` pair exposed through `ctx` to every mention
 * handler, interaction handler, and event handler. Returned by
 * {@link buildSlackBinding}.
 */
interface SlackBinding {
    readonly thread: SlackThread;
    readonly slack: SlackHandle;
}
/**
 * Constructs the `{ thread, slack }` pair.
 *
 * Auto-anchor: when the binding starts without a `threadTs`, the first
 * `chat.postMessage` adopts its own `ts` as the thread root, updating the
 * live `threadTs` and firing `onThreadTsChanged` so the caller can
 * persist the anchor. Ephemerals and upload-only file posts do not
 * anchor.
 */
export declare function buildSlackBinding(input: {
    /** Slack app id used to identify this app's fetched thread replies. */
    readonly appId?: string;
    readonly botToken: SlackBotToken | undefined;
    /** Slack bot user id used to identify this app's fetched thread replies. */
    readonly botUserId?: string;
    readonly channelId: string;
    readonly threadTs: string;
    readonly teamId: string | undefined;
    readonly onThreadTsChanged?: (ts: string) => void;
}): SlackBinding;
export {};
