import { AsyncLocalStorage } from 'node:async_hooks';
import { WebClientOptions, WebClient } from './_slack-web-api.js';
import { Message, AppContextEntity, BaseFormatConverter, Root, AdapterPostableMessage, CardElement, Logger, Adapter, ChatInstance, UserInfo, WebhookOptions, OptionsLoadResult, ModalResponse, ModalElement, LinkPreview, Attachment, RawMessage, EphemeralMessage, ScheduledMessage, FileUpload, PlanModel, PlanContent, EmojiValue, StreamChunk, StreamOptions, FetchOptions, FetchResult, ThreadInfo, ChannelVisibility, ListThreadsOptions, ListThreadsResult, ChannelInfo, FormattedContent } from '#compiled/chat/index.js';
import { S as SlackWebhookVerifier } from './types-CdGmMyOr.js';
export { EncryptedTokenData, decodeKey } from './_chat-adapter-shared.js';

/** A single entity in a Slack active-view context (wire shape). */
interface SlackAppContextEntity {
    enterprise_id?: string;
    team_id?: string;
    type: string;
    value: unknown;
}
/** Slack active-view context object (`app_context` on messages, `context` elsewhere). */
interface SlackAppContext {
    entities?: SlackAppContextEntity[];
}
/** Slack `app_context_changed` event payload (wire shape, agent_view only). */
interface SlackAppContextChangedEvent {
    channel: string;
    context: SlackAppContext;
    event_ts: string;
    type: "app_context_changed";
    user: string;
}
/**
 * Normalize Slack active-view context entities into the core `AppContextEntity` union.
 * Unrecognized entity types map to `{ kind: "unknown" }` for forward-compatibility.
 * @param context - The Slack context object; tolerates a missing/malformed one.
 * @returns Relevance-ordered normalized entities; empty when the context has none.
 */
declare function normalizeAppContextEntities(context: SlackAppContext | undefined): AppContextEntity[];
/**
 * Read the folded active-view context Slack attaches to a DM message
 * (`message.im`'s `app_context` field), normalized to core entities.
 * @param message - The incoming message whose raw payload may carry `app_context`.
 * @returns Normalized entities; empty when no folded context is present.
 */
declare function getAppContext(message: Message): AppContextEntity[];

/**
 * Slack format conversion.
 *
 * Outgoing: Slack now natively renders markdown via the `markdown_text` field
 * on chat.postMessage / postEphemeral / update / scheduleMessage. We pass
 * markdown through there and let Slack handle it. Interactive `response_url`
 * payloads do not accept `markdown_text`, so those still use Slack mrkdwn text.
 *
 * Incoming: Slack `message` events still deliver text as mrkdwn
 * (`*bold*`, `<@U123>`, `<url|text>`), so the toAst parser stays.
 */

type SlackTextPayload = {
    text: string;
} | {
    markdown_text: string;
};
declare class SlackFormatConverter extends BaseFormatConverter {
    /**
     * Render an AST to standard markdown. Slack accepts this directly via
     * `markdown_text` and the `markdown` block.
     */
    fromAst(ast: Root): string;
    /**
     * Parse Slack mrkdwn into an AST. Used for incoming `message` events.
     */
    toAst(mrkdwn: string): Root;
    /**
     * Build the Slack API payload fields for a message.
     *
     * - `string` / `{ raw }` → `{ text }` (plain — preserves literal `*`, `_`, etc.)
     * - `{ markdown }` / `{ ast }` → `{ markdown_text }` (Slack renders natively)
     *
     * Bare `@user` mentions are rewritten to `<@user>` and `:emoji:` placeholders
     * are normalized for Slack in all branches.
     *
     * Note: `markdown_text` has a 12,000 character limit; `text` allows ~40,000.
     * Note: `markdown_text` is mutually exclusive with `text` and `blocks`.
     */
    toSlackPayload(message: AdapterPostableMessage): SlackTextPayload;
    /**
     * Build text for Slack response_url payloads.
     *
     * Slack rejects `markdown_text` on response_url (`no_text`), so markdown/AST
     * messages are rendered to Slack's legacy mrkdwn format for this surface.
     */
    toResponseUrlText(message: AdapterPostableMessage): string;
    private finalize;
    private astToMrkdwn;
    private nodeToMrkdwn;
}

/**
 * Slack Block Kit converter for cross-platform cards.
 *
 * Converts CardElement to Slack Block Kit blocks.
 * @see https://api.slack.com/block-kit
 */

interface SlackBlock {
    block_id?: string;
    type: string;
    [key: string]: unknown;
}
/**
 * Convert a CardElement to Slack Block Kit blocks.
 */
declare function cardToBlockKit(card: CardElement): SlackBlock[];
/**
 * Generate fallback text from a card element.
 * Used when blocks aren't supported or for notifications.
 */
declare function cardToFallbackText(card: CardElement): string;

/**
 * Slack modal (view) converter.
 * Converts ModalElement to Slack Block Kit view format.
 */

interface SlackView {
    blocks: SlackBlock[];
    callback_id: string;
    close?: {
        type: "plain_text";
        text: string;
    };
    notify_on_close?: boolean;
    private_metadata?: string;
    submit?: {
        type: "plain_text";
        text: string;
    };
    title: {
        type: "plain_text";
        text: string;
    };
    type: "modal";
}
interface SlackModalResponse {
    errors?: Record<string, string>;
    response_action?: "errors" | "update" | "push" | "clear";
    view?: SlackView;
}

/**
 * Slack adapter types.
 */

type SlackAdapterMode = "webhook" | "socket";
/**
 * Bot token configuration. Can be a static string, or a function that returns
 * a token (optionally asynchronously). The function is invoked each time a
 * token is needed, enabling rotation or lazy retrieval from a secret manager.
 */
type SlackBotToken = string | (() => string | Promise<string>);
/** Data stored per Slack workspace installation */
interface SlackInstallation {
    botToken: string;
    botUserId?: string;
    teamName?: string;
}
/** Options for the feedback buttons appended to streamed replies. */
interface SlackFeedbackButtonsOptions {
    /**
     * `action_id` dispatched to `bot.onAction` when a button is clicked.
     * Defaults to "message_feedback".
     */
    actionId?: string;
    /** Label for the negative button. Defaults to "Bad response". */
    negativeLabel?: string;
    /** Action value dispatched for negative clicks. Defaults to "negative". */
    negativeValue?: string;
    /** Label for the positive button. Defaults to "Good response". */
    positiveLabel?: string;
    /** Action value dispatched for positive clicks. Defaults to "positive". */
    positiveValue?: string;
}
/** A single suggested prompt shown in an assistant/agent thread. */
interface SlackSuggestedPrompt {
    /** Full prompt text sent as the user's message when the prompt is clicked. */
    message: string;
    /** Short label shown on the prompt button. */
    title: string;
}
/** Suggested prompts payload applied when an assistant/agent thread opens. */
interface SlackSuggestedPromptsOptions {
    /** The prompts to display. Slack shows at most 4. */
    prompts: SlackSuggestedPrompt[];
    /** Optional heading shown above the prompts. */
    title?: string;
}
/** Context passed to a dynamic `suggestedPrompts` resolver. */
interface SlackSuggestedPromptsContext {
    /** The DM channel the assistant/agent thread lives in. */
    channelId: string;
    /** Enterprise the user opened the thread from (legacy assistant_view). */
    enterpriseId?: string;
    /** Active-view context entities (agent_view, when Slack folds context in). */
    entities?: AppContextEntity[];
    /** Team the user opened the thread from (legacy assistant_view). */
    teamId?: string;
    /** Assistant thread root (legacy assistant_view; absent under agent_view). */
    threadTs?: string;
    /** The user who opened the thread. */
    userId: string;
}
/**
 * Suggested prompts configuration: a static payload, or a resolver invoked
 * each time an assistant/agent thread opens. Return null/undefined from the
 * resolver to skip setting prompts for that thread.
 */
type SlackSuggestedPrompts = SlackSuggestedPromptsOptions | ((context: SlackSuggestedPromptsContext) => SlackSuggestedPromptsOptions | null | undefined | Promise<SlackSuggestedPromptsOptions | null | undefined>);
interface SlackAdapterConfig {
    /**
     * Enable Slack's Agent messaging experience (`agent_view` manifest mode).
     * When true, `app_home_opened` is treated as the DM-open signal regardless of
     * tab and folded active-view context is surfaced. Defaults to false (legacy
     * `assistant_view`).
     */
    agentView?: boolean;
    /** Override the Slack API base URL (e.g. "https://slack-gov.com/api/" for GovSlack). Defaults to SLACK_API_URL env var. */
    apiUrl?: string;
    /** App-level token (xapp-...). Required for socket mode. */
    appToken?: string;
    /**
     * Bot token (xoxb-...). Required for single-workspace mode. Omit for multi-workspace.
     * May be a string, or a function returning a string or Promise<string> (called
     * on each use to support rotation or deferred resolution).
     */
    botToken?: SlackBotToken;
    /** Bot user ID (will be fetched if not provided) */
    botUserId?: string;
    /** Slack app client ID (required for OAuth / multi-workspace) */
    clientId?: string;
    /** Slack app client secret (required for OAuth / multi-workspace) */
    clientSecret?: string;
    /**
     * Base64-encoded 32-byte AES-256-GCM encryption key.
     * If provided, bot tokens stored via setInstallation() will be encrypted at rest.
     */
    encryptionKey?: string;
    /**
     * Append Slack's native feedback buttons (a `context_actions` block with a
     * `feedback_buttons` element) to every streamed reply, attached when the
     * stream finishes. Clicks dispatch to `bot.onAction` with the configured
     * `actionId` and a positive/negative value. Pass `true` for defaults, or an
     * options object to customize labels, values, and the action id. Skipped
     * when a stream falls back to post-and-edit.
     */
    feedbackButtons?: boolean | SlackFeedbackButtonsOptions;
    /**
     * Prefix for the state key used to store workspace installations.
     * Defaults to `slack:installation`. The full key will be `{prefix}:{teamId}`.
     */
    installationKeyPrefix?: string;
    /**
     * External installation provider for multi-workspace apps using external
     * token management (e.g., Vercel Connect). When set, the adapter bypasses
     * internal StateAdapter storage for token lookups.
     *
     * For Enterprise Grid org-wide installs, `installationId` will be the
     * enterprise ID; otherwise it will be the team ID.
     */
    installationProvider?: {
        getInstallation: (installationId: string, isEnterpriseInstall: boolean) => Promise<SlackInstallation | null>;
    };
    /**
     * Default rotating loading messages for the assistant thinking indicator
     * (`assistant.threads.setStatus` `loading_messages`). Used by `startTyping`
     * and `setAssistantStatus` when no explicit status/messages are passed.
     */
    loadingMessages?: string[];
    /** Logger instance for error reporting. Defaults to ConsoleLogger. */
    logger?: Logger;
    /** Connection mode: "webhook" (default) or "socket" */
    mode?: SlackAdapterMode;
    /**
     * Use Slack's native streaming API (`chat.startStream` / `chat.appendStream`
     * / `chat.stopStream`) for streamed posts. Defaults to true. Set false on
     * Slack flavours without the streaming methods (e.g. GovSlack) to always
     * stream via post-and-edit; the adapter also falls back automatically when
     * the workspace rejects the first native call.
     */
    nativeStreaming?: boolean;
    /** Signing secret for webhook verification. Defaults to SLACK_SIGNING_SECRET env var. */
    signingSecret?: string;
    /** Shared secret for authenticating forwarded socket mode events. Auto-detected from SLACK_SOCKET_FORWARDING_SECRET. Falls back to appToken if not set. */
    socketForwardingSecret?: string;
    /**
     * Suggested prompts to pin automatically when an assistant/agent thread
     * opens. Applied on `assistant_thread_started` (legacy `assistant_view`)
     * and on Messages-tab `app_home_opened` (with `agentView` enabled, where
     * prompts sit at the top of the agent conversation). Pass a static payload
     * or a resolver that receives the thread context (user, channel,
     * active-view entities) and returns prompts per thread.
     */
    suggestedPrompts?: SlackSuggestedPrompts;
    /** Override bot username (optional) */
    userName?: string;
    /**
     * Options forwarded to the underlying `@slack/web-api` `WebClient` instances, both the
     * default client and the per-token clients used for multi-workspace requests.
     *
     * Use this to tune Web API behavior the adapter does not otherwise expose, most
     * notably `retryConfig` and `timeout`. By default the WebClient retries rate-limited
     * (429) requests with `retryPolicies.tenRetriesInAboutThirtyMinutes`, so a single
     * `chat.update`/`chat.postMessage` can block for ~30 minutes under sustained rate
     * limiting. Callers that stream frequent edits (where a hung call can stall a whole
     * turn) will typically want a bounded policy and/or a timeout. `timeout` applies to
     * each HTTP request attempt, not the total retry period. Set
     * `rejectRateLimitedCalls` to reject 429 responses without waiting for `Retry-After`.
     *
     * ```ts
     * import { retryPolicies } from "./_slack-web-api.js";
     * createSlackAdapter({
     *   signingSecret,
     *   webClientOptions: { retryConfig: retryPolicies.fiveRetriesInFiveMinutes, timeout: 15_000 },
     * });
     * ```
     *
     * Use `apiUrl` to override the Slack Web API base URL.
     */
    webClientOptions?: Omit<WebClientOptions, "slackApiUrl">;
    /**
     * Custom webhook verifier. Used in place of `signingSecret`.
     * Receives the incoming `Request` and the raw body text already
     * read by the adapter. To reject the request, either
     * return a falsy value (sync or async) or throw/reject; the adapter will
     * respond with `401 Invalid signature`. Any truthy return value is treated
     * as a successful verification. If a string is returned, it replaces the
     * raw body for downstream parsing — useful when the verifier needs to
     * canonicalize or substitute the verified payload.
     *
     * `webhookVerifier` takes precedence over `signingSecret` and the
     * `SLACK_SIGNING_SECRET` env var; when it is set, those are ignored.
     *
     * SECURITY: When this is used in place of `signingSecret`, the built-in
     * Slack timestamp tolerance check is NOT performed. Implementations are
     * responsible for verifying the `x-slack-request-timestamp` header (or an
     * equivalent freshness signal) to prevent replay of captured signed
     * requests.
     */
    webhookVerifier?: SlackWebhookVerifier;
}

/**
 * Build a `context_actions` block with Slack's native feedback buttons
 * (thumbs up/down on agent replies). The adapter appends this automatically
 * to streamed replies when the `feedbackButtons` config is set; use this
 * helper to attach the same block to non-streamed messages via raw blocks.
 */
declare function buildFeedbackButtonsBlock(options?: SlackFeedbackButtonsOptions): Record<string, unknown>;
/** Envelope for events forwarded from a socket mode listener via HTTP POST */
interface SlackForwardedSocketEvent {
    body: Record<string, unknown>;
    eventType: string;
    timestamp: number;
    type: "socket_event";
}
interface SlackOAuthCallbackOptions {
    /** Redirect URI to send to Slack during the OAuth code exchange. */
    redirectUri?: string;
}
/** Slack-specific thread ID data */
interface SlackThreadId {
    channel: string;
    threadTs: string;
}
/** Slack event payload (raw message format) */
interface SlackEvent {
    /** Legacy attachments (unfurl previews, app unfurls, etc.) */
    attachments?: Array<{
        from_url?: string;
        image_url?: string;
        is_msg_unfurl?: boolean;
        original_url?: string;
        service_icon?: string;
        service_name?: string;
        text?: string;
        thumb_url?: string;
        title?: string;
        title_link?: string;
    }>;
    /** Rich text blocks containing structured elements (links, mentions, etc.) */
    blocks?: Array<{
        type: string;
        elements?: Array<{
            type: string;
            elements?: Array<{
                type: string;
                url?: string;
                text?: string;
            }>;
        }>;
    }>;
    bot_id?: string;
    channel?: string;
    /** Channel type: "channel", "group", "mpim", or "im" (DM) */
    channel_type?: string;
    edited?: {
        ts: string;
    };
    files?: Array<{
        id?: string;
        mimetype?: string;
        url_private?: string;
        name?: string;
        size?: number;
        original_w?: number;
        original_h?: number;
    }>;
    /** Hidden flag on message_changed events (true for unfurl-only updates) */
    hidden?: boolean;
    /** Timestamp of the latest reply (present on thread parent messages) */
    latest_reply?: string;
    /** Inner message on message_changed events */
    message?: SlackEvent;
    /** Number of replies in the thread (present on thread parent messages) */
    reply_count?: number;
    subtype?: string;
    team?: string;
    team_id?: string;
    text?: string;
    thread_ts?: string;
    ts?: string;
    type: string;
    user?: string;
    username?: string;
}
/** Slack reaction event payload */
interface SlackReactionEvent {
    event_ts: string;
    item: {
        type: string;
        channel: string;
        ts: string;
    };
    item_user?: string;
    reaction: string;
    type: "reaction_added" | "reaction_removed";
    user: string;
}
/** Slack assistant_thread_started event payload */
interface SlackAssistantThreadStartedEvent {
    assistant_thread: {
        user_id: string;
        channel_id: string;
        thread_ts: string;
        context: {
            channel_id?: string;
            team_id?: string;
            enterprise_id?: string;
            thread_entry_point?: string;
            force_search?: boolean;
        };
    };
    event_ts: string;
    type: "assistant_thread_started";
}
/** Slack assistant_thread_context_changed event payload */
interface SlackAssistantContextChangedEvent {
    assistant_thread: {
        user_id: string;
        channel_id: string;
        thread_ts: string;
        context: {
            channel_id?: string;
            team_id?: string;
            enterprise_id?: string;
            thread_entry_point?: string;
            force_search?: boolean;
        };
    };
    event_ts: string;
    type: "assistant_thread_context_changed";
}
/** Slack app_home_opened event payload */
interface SlackAppHomeOpenedEvent {
    channel: string;
    context?: SlackAppContext;
    event_ts: string;
    tab: string;
    type: "app_home_opened";
    user: string;
}
/** Slack member_joined_channel event payload */
interface SlackMemberJoinedChannelEvent {
    channel: string;
    channel_type?: string;
    event_ts: string;
    inviter?: string;
    team?: string;
    type: "member_joined_channel";
    user: string;
}
/** Slack user_change event payload */
interface SlackUserChangeEvent {
    event_ts: string;
    type: "user_change";
    user: {
        id: string;
        name?: string;
        real_name?: string;
        profile?: {
            display_name?: string;
            real_name?: string;
        };
    };
}
/** Slack webhook payload envelope */
interface SlackWebhookPayload {
    challenge?: string;
    /** Enterprise ID for Enterprise Grid org-wide installs */
    enterprise_id?: string;
    event?: SlackEvent | SlackReactionEvent | SlackAssistantThreadStartedEvent | SlackAssistantContextChangedEvent | SlackAppHomeOpenedEvent | SlackMemberJoinedChannelEvent | SlackUserChangeEvent;
    event_id?: string;
    event_time?: number;
    /** Whether this is an Enterprise Grid org-wide install */
    is_enterprise_install?: boolean;
    /** Whether this event occurred in an externally shared channel (Slack Connect) */
    is_ext_shared_channel?: boolean;
    team_id?: string;
    type: string;
}
/** Slack interactive payload (block_actions) for button clicks */
interface SlackBlockActionsPayload {
    actions: Array<{
        type: string;
        action_id: string;
        block_id?: string;
        value?: string;
        action_ts?: string;
        selected_option?: {
            value: string;
        };
    }>;
    channel: {
        id: string;
        name: string;
    };
    container: {
        type: string;
        message_ts: string;
        channel_id: string;
        is_ephemeral?: boolean;
        thread_ts?: string;
    };
    message: {
        ts: string;
        thread_ts?: string;
    };
    response_url?: string;
    trigger_id: string;
    type: "block_actions";
    user: {
        id: string;
        username: string;
        name?: string;
    };
}
interface SlackViewSubmissionPayload {
    trigger_id: string;
    type: "view_submission";
    user: {
        id: string;
        username: string;
        name?: string;
    };
    view: {
        id: string;
        callback_id: string;
        private_metadata?: string;
        state: {
            values: Record<string, Record<string, {
                value?: string;
                selected_option?: {
                    value: string;
                };
            }>>;
        };
    };
}
interface SlackViewClosedPayload {
    type: "view_closed";
    user: {
        id: string;
        username: string;
        name?: string;
    };
    view: {
        id: string;
        callback_id: string;
        private_metadata?: string;
    };
}
interface SlackBlockSuggestionPayload {
    action_id: string;
    block_id: string;
    team?: {
        id: string;
    };
    type: "block_suggestion";
    user: {
        id: string;
        username?: string;
        name?: string;
    };
    value?: string;
}
type SlackInteractivePayload = SlackBlockActionsPayload | SlackBlockSuggestionPayload | SlackViewSubmissionPayload | SlackViewClosedPayload;
/** Cached user info */
interface CachedUser {
    avatarUrl?: string;
    displayName: string;
    email?: string;
    isBot?: boolean;
    realName: string;
}
declare class SlackAdapter implements Adapter<SlackThreadId, unknown> {
    readonly name = "slack";
    readonly userName: string;
    protected readonly _client: WebClient;
    protected readonly tokenClientCache: Map<string, WebClient>;
    protected readonly slackApiUrl: string | undefined;
    protected readonly webClientOptions: SlackAdapterConfig["webClientOptions"];
    protected readonly signingSecret: string | undefined;
    protected readonly webhookVerifier: ((request: Request, body: string) => unknown | Promise<unknown>) | undefined;
    protected readonly defaultBotTokenProvider: (() => string | Promise<string>) | undefined;
    protected chat: ChatInstance | null;
    protected readonly logger: Logger;
    protected _botUserId: string | null;
    protected _botId: string | null;
    protected readonly formatConverter: SlackFormatConverter;
    protected static readonly USER_CACHE_TTL_MS: number;
    protected static readonly CHANNEL_CACHE_TTL_MS: number;
    protected static readonly REVERSE_INDEX_TTL_MS: number;
    /**
     * Cache of channel IDs known to be external/shared (Slack Connect).
     * Populated from `is_ext_shared_channel` in incoming webhook payloads.
     */
    private readonly _externalChannels;
    protected readonly appToken: string | undefined;
    protected readonly agentView: boolean;
    protected readonly suggestedPrompts?: SlackSuggestedPrompts;
    protected readonly loadingMessages?: string[];
    /** Normalized feedbackButtons config (`true` becomes `{}`). */
    protected readonly feedbackButtons?: SlackFeedbackButtonsOptions;
    protected readonly nativeStreaming: boolean;
    /**
     * Latched when the workspace rejects native streaming with an error that
     * won't heal (e.g. `unknown_method` on GovSlack) so later streams skip the
     * doomed native attempt and go straight to post-and-edit.
     */
    protected nativeStreamingBroken: boolean;
    protected readonly mode: SlackAdapterMode;
    protected readonly socketForwardingSecret: string | undefined;
    private socketClient;
    protected readonly clientId: string | undefined;
    protected readonly clientSecret: string | undefined;
    protected readonly encryptionKey: Buffer | undefined;
    protected readonly installationKeyPrefix: string;
    protected readonly installationProvider: SlackAdapterConfig["installationProvider"];
    protected readonly requestContext: AsyncLocalStorage<{
        token: string;
        botUserId?: string;
        isExtSharedChannel?: boolean;
        enterpriseId?: string;
        isEnterpriseInstall?: boolean;
    }>;
    /** Bot user ID (e.g., U_BOT_123) used for mention detection */
    get botUserId(): string | undefined;
    get isSocketMode(): boolean;
    /**
     * Direct access to a [`WebClient`](https://github.com/slackapi/node-slack-sdk/tree/main/packages/web-api)
     * from `@slack/web-api` bound to the bot token for the current request
     * context (multi-workspace) or the configured default token
     * (single-workspace). Use for any Slack Web API call not covered by the
     * SDK's high-level methods — for example
     * `adapter.webClient.pins.add(...)` or
     * `adapter.webClient.usergroups.list(...)`.
     *
     * Resolution order:
     *   1. Token from the current `requestContext` (set during webhook
     *      handling, or by `withBotToken()`).
     *   2. The default bot token, when configured as a static string or
     *      synchronous resolver function.
     *
     * Throws `AuthenticationError` if neither is available — typical causes
     * are calling `.webClient` outside any webhook/`withBotToken()` context
     * in multi-workspace mode, or having configured `botToken` as an async
     * function. In the latter case wrap the work in
     * `adapter.withBotToken(token, () => adapter.webClient...)`.
     *
     * @example
     * ```ts
     * const slack = bot.getAdapter("slack").webClient;
     * await slack.pins.add({
     *   channel: "C123ABC",
     *   timestamp: "1234567890.123456",
     * });
     * ```
     */
    get webClient(): WebClient;
    /**
     * @deprecated Use {@link SlackAdapter.webClient | `webClient`} instead.
     * This alias is preserved for backwards compatibility and will be
     * removed in a future major release.
     */
    get client(): WebClient;
    private getClientForToken;
    constructor(config?: SlackAdapterConfig);
    /**
     * Get the current bot token for API calls.
     * Checks request context (multi-workspace) → default token provider
     * (single-workspace) → throws.
     */
    protected getToken(): Promise<string>;
    /**
     * Add the current token to API call options.
     * Workaround for Slack WebClient types not including `token` in per-method args.
     */
    protected withToken<T extends Record<string, any>>(options: T): Promise<T & {
        token: string;
    }>;
    initialize(chat: ChatInstance): Promise<void>;
    protected installationKey(teamId: string): string;
    /**
     * Save a Slack workspace installation.
     * Call this from your OAuth callback route after a successful installation.
     */
    setInstallation(teamId: string, installation: SlackInstallation): Promise<void>;
    /**
     * Retrieve a Slack workspace installation.
     */
    getInstallation(teamId: string): Promise<SlackInstallation | null>;
    /**
     * Handle the Slack OAuth V2 callback.
     * Accepts the incoming request, extracts the authorization code,
     * exchanges it for tokens, and saves the installation.
     */
    handleOAuthCallback(request: Request, options?: SlackOAuthCallbackOptions): Promise<{
        teamId: string;
        installation: SlackInstallation;
    }>;
    /**
     * Remove a Slack workspace installation.
     */
    deleteInstallation(teamId: string): Promise<void>;
    /**
     * Run a function with a specific bot token in context.
     * Use this for operations outside webhook handling (cron jobs, workflows).
     */
    withBotToken<T>(token: string, fn: () => T): T;
    /**
     * Resolve the bot token for an installation from the external provider or state adapter.
     * @param installationId - team_id or enterprise_id depending on install type
     * @param isEnterpriseInstall - true if this is an Enterprise Grid org-wide install
     */
    protected resolveTokenForTeam(installationId: string, isEnterpriseInstall?: boolean): Promise<{
        token: string;
        botUserId?: string;
    } | null>;
    /**
     * Extract installation info from an interactive payload (form-urlencoded).
     * For Enterprise Grid org-wide installs, returns enterprise_id; otherwise team_id.
     */
    protected extractInstallationFromInteractive(body: string): {
        installationId: string;
        isEnterpriseInstall: boolean;
        enterpriseId?: string;
    } | null;
    /**
     * Look up user info from Slack API with caching via state adapter.
     * Returns null when the API call fails.
     */
    protected lookupUser(userId: string): Promise<CachedUser | null>;
    /**
     * Look up channel name from Slack API with caching via state adapter.
     * Returns channel name, or falls back to channel ID.
     */
    protected lookupChannel(channelId: string): Promise<string>;
    getUser(userId: string): Promise<UserInfo | null>;
    handleWebhook(request: Request, options?: WebhookOptions): Promise<Response>;
    /** Extract and dispatch events from a validated payload */
    protected processEventPayload(payload: SlackWebhookPayload, options?: WebhookOptions): void;
    /**
     * Handle Slack interactive payloads (button clicks, view submissions, etc.).
     * These are sent as form-urlencoded with a `payload` JSON field.
     */
    protected handleInteractivePayload(body: string, options?: WebhookOptions): Response | Promise<Response>;
    /**
     * Dispatch a pre-parsed interactive payload to the correct handler.
     * Used by both webhook and socket mode paths.
     */
    protected dispatchInteractivePayload(payload: SlackInteractivePayload, options?: WebhookOptions): Response | Promise<Response>;
    /**
     * Handle Slack slash command payloads.
     * Slash commands are sent as form-urlencoded with command, text, user_id, channel_id, etc.
     */
    protected handleSlashCommand(params: URLSearchParams, options?: WebhookOptions): Promise<Response>;
    /**
     * Handle block_actions payload (button clicks in Block Kit).
     */
    protected handleBlockActions(payload: SlackBlockActionsPayload, options?: WebhookOptions): void;
    protected handleBlockSuggestion(payload: SlackBlockSuggestionPayload, options?: WebhookOptions): Promise<Response>;
    protected optionsLoadResponse(result: OptionsLoadResult): Response;
    protected handleViewSubmission(payload: SlackViewSubmissionPayload, options?: WebhookOptions): Promise<Response>;
    protected handleViewClosed(payload: SlackViewClosedPayload, options?: WebhookOptions): void;
    protected modalResponseToSlack(response: ModalResponse, contextId?: string): SlackModalResponse;
    protected convertModalJSX(modal: ModalElement): ModalElement;
    /**
     * Start Socket Mode connection.
     * Creates a SocketModeClient, registers event handlers, and connects.
     */
    protected startSocketMode(): Promise<void>;
    /**
     * Route a socket mode event to the appropriate handler.
     */
    protected routeSocketEvent(body: Record<string, unknown>, eventType: string, ack: (response?: Record<string, unknown>) => Promise<void>, options?: WebhookOptions): Promise<void>;
    /**
     * Start a transient Socket Mode listener for serverless environments.
     * The listener maintains a WebSocket for `durationMs`, acks events, and
     * forwards them via HTTP POST to the webhook endpoint (or processes directly).
     *
     * @param options - Webhook options with waitUntil function
     * @param durationMs - How long to keep listening (default: 180000ms = 3 minutes)
     * @param abortSignal - Optional signal to stop the listener early
     * @param webhookUrl - URL to forward socket events to (required for forwarding mode)
     */
    startSocketModeListener(options: WebhookOptions, durationMs?: number, abortSignal?: AbortSignal, webhookUrl?: string): Promise<Response>;
    /**
     * Run the socket mode listener for a specified duration.
     */
    protected runSocketModeListener(durationMs: number, abortSignal?: AbortSignal, webhookUrl?: string, options?: WebhookOptions): Promise<void>;
    /**
     * Forward a socket mode event to the webhook endpoint.
     */
    protected forwardSocketEvent(webhookUrl: string, event: SlackForwardedSocketEvent): Promise<void>;
    /**
     * Disconnect the socket mode client.
     * No-op if not connected.
     */
    disconnect(): Promise<void>;
    /**
     * Handle message events from Slack.
     * Bot message filtering (isMe) is handled centrally by the Chat class.
     */
    protected handleMessageEvent(event: SlackEvent, options?: WebhookOptions): void;
    protected handleMessageChanged(event: SlackEvent, _options?: WebhookOptions): void;
    /**
     * Handle reaction events from Slack (reaction_added, reaction_removed).
     */
    protected handleReactionEvent(event: SlackReactionEvent, options?: WebhookOptions): Promise<void>;
    /**
     * Handle assistant_thread_started events from Slack's Assistants API.
     * Fires when a user opens a new assistant thread (DM with the bot).
     */
    protected handleAssistantThreadStarted(event: SlackAssistantThreadStartedEvent, options?: WebhookOptions): void;
    /**
     * Handle assistant_thread_context_changed events from Slack's Assistants API.
     * Fires when a user navigates to a different channel with the assistant panel open.
     */
    protected handleAssistantContextChanged(event: SlackAssistantContextChangedEvent, options?: WebhookOptions): void;
    /**
     * Handle app_home_opened events from Slack.
     * Fires when a user opens the bot's Home tab.
     */
    protected handleAppHomeOpened(event: SlackAppHomeOpenedEvent, options?: WebhookOptions): void;
    /**
     * Handle app_context_changed events (Slack Agent messaging experience).
     * Reports the user's current active view via normalized entities.
     */
    protected handleAppContextChanged(event: SlackAppContextChangedEvent, options?: WebhookOptions): void;
    /**
     * Handle member_joined_channel events from Slack.
     * Fires when a user (including the bot) joins a channel.
     */
    protected handleMemberJoinedChannel(event: SlackMemberJoinedChannelEvent, options?: WebhookOptions): void;
    protected handleUserChange(event: SlackUserChangeEvent): Promise<void>;
    /**
     * Publish a Home tab view for a user.
     * Slack API: views.publish
     */
    publishHomeView(userId: string, view: Record<string, unknown>): Promise<void>;
    /**
     * Set suggested prompts for an assistant/agent thread.
     * Slack Assistants API: assistant.threads.setSuggestedPrompts.
     * `threadTs` is optional under the Agent messaging experience (agent_view),
     * where prompts can sit at the top of the agent conversation without a thread.
     */
    setSuggestedPrompts(channelId: string, threadTs: string | undefined, prompts: Array<{
        title: string;
        message: string;
    }>, title?: string): Promise<void>;
    /**
     * Resolve and apply the configured `suggestedPrompts` for a newly opened
     * assistant/agent thread. Errors are logged, never thrown — this runs on
     * the webhook path where a failure must not turn into a 500.
     */
    protected applyConfiguredSuggestedPrompts(context: SlackSuggestedPromptsContext): Promise<void>;
    /**
     * Set status/thinking indicator for an assistant thread.
     * Slack Assistants API: assistant.threads.setStatus
     *
     * When `loadingMessages` is omitted, falls back to the adapter-level
     * `loadingMessages` config.
     */
    setAssistantStatus(channelId: string, threadTs: string, status: string, loadingMessages?: string[]): Promise<void>;
    /**
     * Set title for an assistant thread (shown in History tab).
     * Slack Assistants API: assistant.threads.setTitle
     */
    setAssistantTitle(channelId: string, threadTs: string, title: string): Promise<void>;
    /**
     * Resolve inline user mentions in Slack mrkdwn text.
     * Converts <@U123> to <@U123|displayName> so that toAst/extractPlainText
     * renders them as @displayName instead of @U123.
     *
     * @param skipSelfMention - When true, skips the bot's own user ID so that
     *   mention detection (which looks for @botUserId in the text) continues to
     *   work. Uses the effective request-scoped bot user ID in multi-workspace
     *   mode, not only the adapter's default bot user ID. Set to false when
     *   parsing historical/channel messages where mention detection doesn't
     *   apply.
     */
    protected resolveInlineMentions(text: string, skipSelfMention: boolean): Promise<string>;
    /**
     * Extract link URLs from a Slack event.
     * Uses the `blocks` field (rich_text blocks with link elements) when available,
     * falling back to parsing `<url>` patterns from the text field.
     */
    protected extractLinks(event: SlackEvent): LinkPreview[];
    /**
     * Create a LinkPreview for a URL. If the URL points to a Slack message,
     * includes a `fetchMessage` callback that fetches and parses the linked message.
     */
    protected createLinkPreview(url: string): LinkPreview;
    protected parseSlackMessage(event: SlackEvent, threadId: string, options?: {
        skipSelfMention?: boolean;
    }): Promise<Message<unknown>>;
    protected enrichLinks(links: LinkPreview[], messageTs?: string): Promise<LinkPreview[]>;
    /**
     * Create an Attachment object from a Slack file.
     * Includes a fetchData method that uses the bot token for auth.
     */
    protected createAttachment(file: {
        id?: string;
        mimetype?: string;
        url_private?: string;
        name?: string;
        size?: number;
        original_w?: number;
        original_h?: number;
    }, teamId?: string): Attachment;
    protected fetchSlackFile(url: string, token: string): Promise<Buffer>;
    rehydrateAttachment(attachment: Attachment): Attachment;
    /**
     * Resolve @name mentions in text to Slack <@USER_ID> format using the
     * reverse user cache. When multiple users share a display name, prefers
     * the one who is a participant in the given thread.
     */
    protected resolveOutgoingMentions(text: string, threadId: string): Promise<string>;
    /**
     * Pre-process an outgoing message to resolve @name mentions before rendering.
     */
    protected resolveMessageMentions(message: AdapterPostableMessage, threadId: string): Promise<AdapterPostableMessage>;
    postMessage(threadId: string, _message: AdapterPostableMessage): Promise<RawMessage<unknown>>;
    postEphemeral(threadId: string, userId: string, _message: AdapterPostableMessage): Promise<EphemeralMessage>;
    scheduleMessage(threadId: string, _message: AdapterPostableMessage, options: {
        postAt: Date;
    }): Promise<ScheduledMessage>;
    openModal(triggerId: string, modal: ModalElement, contextId?: string): Promise<{
        viewId: string;
    }>;
    updateModal(viewId: string, modal: ModalElement): Promise<{
        viewId: string;
    }>;
    /**
     * Upload files to Slack and share them to a channel.
     * Returns the file IDs of uploaded files.
     */
    protected uploadFiles(files: FileUpload[], channel: string, threadTs?: string): Promise<string[]>;
    editMessage(threadId: string, messageId: string, _message: AdapterPostableMessage): Promise<RawMessage<unknown>>;
    postObject(threadId: string, kind: string, data: unknown): Promise<RawMessage<unknown>>;
    editObject(threadId: string, messageId: string, kind: string, data: unknown): Promise<RawMessage<unknown>>;
    protected renderPlanFallbackText(plan: PlanModel): string;
    protected planToBlockKit(plan: PlanModel): unknown[];
    protected planContentToPlainText(content: PlanContent | undefined): string;
    protected planContentToRichText(content: PlanContent | undefined): {
        type: "rich_text";
        elements: unknown[];
    } | undefined;
    deleteMessage(threadId: string, messageId: string): Promise<void>;
    addReaction(threadId: string, messageId: string, emoji: EmojiValue | string): Promise<void>;
    removeReaction(threadId: string, messageId: string, emoji: EmojiValue | string): Promise<void>;
    /**
     * Show typing indicator with optional custom status.
     *
     * When status is provided, uses Slack's assistant.threads.setStatus API
     * to show custom loading text (requires Agents & AI Apps feature and assistant:write scope).
     * The status auto-clears when a message is posted to the thread.
     *
     * When status is not provided, defaults to "Typing..." with default loading messages.
     *
     * @param threadId - The thread to show the indicator in
     * @param status - Optional custom status message (e.g., "Searching documents...")
     */
    startTyping(threadId: string, status?: string): Promise<void>;
    /**
     * Stream a message using Slack's native streaming API.
     *
     * Consumes an async iterable of text chunks and/or structured StreamChunk
     * objects (task_update, plan_update, markdown_text) and streams them to Slack.
     *
     * Plain strings are rendered through StreamingMarkdownRenderer for safe
     * incremental markdown. StreamChunk objects are passed directly to Slack's
     * streaming API as chunk payloads, enabling native task progress cards
     * and plan displays in the Slack AI Assistant UI.
     *
     * Falls back to post-and-edit when the thread lacks native stream context.
     */
    stream(threadId: string, textStream: AsyncIterable<string | StreamChunk>, options?: StreamOptions): Promise<RawMessage<unknown> | null>;
    /**
     * Open a direct message conversation with a user.
     * Returns a thread ID that can be used to post messages.
     */
    openDM(userId: string): Promise<string>;
    fetchMessages(threadId: string, options?: FetchOptions): Promise<FetchResult<unknown>>;
    /**
     * Fetch messages in forward direction (oldest first, efficient).
     * Uses native Slack cursor pagination.
     */
    protected fetchMessagesForward(channel: string, threadTs: string, threadId: string, limit: number, cursor?: string): Promise<FetchResult<unknown>>;
    /**
     * Fetch messages in backward direction (most recent first).
     *
     * Slack's API returns oldest-first, so for backward direction we:
     * 1. Use `latest` parameter to fetch messages before a timestamp (cursor)
     * 2. Fetch up to 1000 messages (API limit) and take the last N
     * 3. Return messages in chronological order (oldest first within the page)
     *
     * Note: For very large threads (>1000 messages), the first backward call
     * may not return the absolute most recent messages. This is a Slack API limitation.
     */
    protected fetchMessagesBackward(channel: string, threadTs: string, threadId: string, limit: number, cursor?: string): Promise<FetchResult<unknown>>;
    fetchThread(threadId: string): Promise<ThreadInfo>;
    /**
     * Fetch a single message by ID (timestamp).
     */
    fetchMessage(threadId: string, messageId: string): Promise<Message<unknown> | null>;
    encodeThreadId(platformData: SlackThreadId): string;
    /**
     * Check if a thread is a direct message conversation.
     * Slack DM channel IDs start with 'D'.
     */
    isDM(threadId: string): boolean;
    /**
     * Get the visibility scope of a channel containing the thread.
     *
     * - `external`: Slack Connect channel shared with external organizations
     * - `private`: Private channel (starts with G) or DM (starts with D)
     * - `workspace`: Public channel visible to all workspace members
     * - `unknown`: Visibility cannot be determined (not yet cached)
     */
    getChannelVisibility(threadId: string): ChannelVisibility;
    decodeThreadId(threadId: string): SlackThreadId;
    parseMessage(raw: SlackEvent): Message<unknown>;
    /**
     * Synchronous message parsing without user lookup.
     * Used for parseMessage interface - falls back to user ID for username.
     */
    protected parseSlackMessageSync(event: SlackEvent, threadId: string): Message<unknown>;
    /**
     * Derive channel ID from a Slack thread ID.
     * Slack thread IDs are "slack:CHANNEL:THREAD_TS", channel ID is "slack:CHANNEL".
     */
    channelIdFromThreadId(threadId: string): string;
    /**
     * Fetch channel-level messages (conversations.history, not thread replies).
     */
    fetchChannelMessages(channelId: string, options?: FetchOptions): Promise<FetchResult<unknown>>;
    protected fetchChannelMessagesForward(channel: string, limit: number, cursor?: string): Promise<FetchResult<unknown>>;
    protected fetchChannelMessagesBackward(channel: string, limit: number, cursor?: string): Promise<FetchResult<unknown>>;
    /**
     * List threads in a Slack channel.
     * Fetches channel history and filters for messages with replies.
     */
    listThreads(channelId: string, options?: ListThreadsOptions): Promise<ListThreadsResult<unknown>>;
    /**
     * Fetch Slack channel info/metadata.
     */
    fetchChannelInfo(channelId: string): Promise<ChannelInfo>;
    /**
     * Post a top-level message to a channel (not in a thread).
     */
    postChannelMessage(channelId: string, message: AdapterPostableMessage): Promise<RawMessage<unknown>>;
    renderFormatted(content: FormattedContent): string;
    /**
     * Check if a Slack event is from this bot.
     *
     * Slack messages can come from:
     * - User messages: have `user` field (U_xxx format)
     * - Bot messages: have `bot_id` field (B_xxx format)
     *
     * We check both because:
     * - _botUserId is the user ID (U_xxx) - matches event.user
     * - _botId is the bot ID (B_xxx) - matches event.bot_id
     */
    protected isMessageFromSelf(event: SlackEvent): boolean;
    protected handleSlackError(error: unknown): never;
    /**
     * Encode response_url and userId into messageId for ephemeral messages.
     * This allows edit/delete operations to work via response_url.
     */
    protected encodeEphemeralMessageId(messageTs: string, responseUrl: string, userId: string): string;
    /**
     * Decode ephemeral messageId to extract messageTs, responseUrl, and userId.
     * Returns null if the messageId is not an ephemeral encoding.
     */
    protected decodeEphemeralMessageId(messageId: string): {
        messageTs: string;
        responseUrl: string;
        userId: string;
    } | null;
    /**
     * Send a request to Slack's response_url to modify an ephemeral message.
     */
    protected sendToResponseUrl(responseUrl: string, action: "replace" | "delete", options?: {
        message?: AdapterPostableMessage;
        threadTs?: string;
    }): Promise<Record<string, unknown>>;
}
declare function createSlackAdapter(config?: SlackAdapterConfig): SlackAdapter;

export { SlackAdapter, type SlackAdapterConfig, type SlackAdapterMode, type SlackAppContext, type SlackAppContextChangedEvent, type SlackAppContextEntity, type SlackBotToken, type SlackEvent, type SlackFeedbackButtonsOptions, SlackFormatConverter, type SlackInstallation, SlackFormatConverter as SlackMarkdownConverter, type SlackOAuthCallbackOptions, type SlackReactionEvent, type SlackSuggestedPrompt, type SlackSuggestedPrompts, type SlackSuggestedPromptsContext, type SlackSuggestedPromptsOptions, type SlackThreadId, buildFeedbackButtonsBlock, cardToBlockKit, cardToFallbackText, createSlackAdapter, getAppContext, normalizeAppContextEntities };
