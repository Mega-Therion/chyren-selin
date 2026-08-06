import { ContentBuilder, AppUrl, SpectrumInstance } from './_spectrum-core.js';
export { AppUrl } from './_spectrum-core.js';
import { FileUpload, Logger, Adapter, ChatInstance, WebhookOptions, AdapterPostableMessage, RawMessage, Message, FetchOptions, FetchResult, ThreadInfo, EmojiValue, ModalElement, FormattedContent, BaseFormatConverter, Root } from '#compiled/chat/index.js';
import { IMessageMessageEffect, CustomizedMiniAppInput } from './_spectrum-imessage.js';
export { CustomizedMiniAppInput, IMessageMessageEffect } from './_spectrum-imessage.js';

/**
 * Image bytes for a chat background. Accepts raw bytes (`Uint8Array` / `Buffer`
 * / `ArrayBuffer`), a `Blob`, or a Chat SDK `FileUpload` — whatever your image
 * pipeline hands back gets normalized to the bytes spectrum-ts expects.
 */
type BackgroundBytes = Uint8Array | ArrayBuffer | Blob | FileUpload;
/**
 * A chat-background source. Either:
 *
 * - the literal `"clear"` sentinel, to remove the current background;
 * - in-memory {@link BackgroundBytes};
 * - an `http(s)` URL (a `URL` or a string) that spectrum-ts fetches at send
 *   time. Local file paths aren't accepted — read the file into bytes and pass
 *   those instead.
 */
type BackgroundInput = "clear" | BackgroundBytes | URL | string;
/** Optional chat-background metadata. */
interface BackgroundOptions {
    /**
     * MIME type of the image (`image/*`). Required for raw bytes when the `name`
     * carries no image extension; inferred from the URL / name otherwise.
     */
    mimeType?: string;
    /** File name used to infer the MIME type from its extension. */
    name?: string;
}
/**
 * Validate and normalize a chat-background source into the spectrum-ts
 * `background()` content builder. The `"clear"` sentinel removes the current
 * background; URL sources are fetched by spectrum-ts at send time; byte sources
 * are copied to a detached `Buffer` and tagged with a resolved `image/*` MIME
 * type. The builder is a fire-and-forget control signal — remote and
 * iMessage-only.
 */
declare function resolveBackground(input: BackgroundInput, options?: BackgroundOptions): Promise<ContentBuilder>;

/** Thread ID components for iMessage */
interface iMessageThreadId {
    /** Chat GUID (e.g., "iMessage;-;+1234567890") */
    chatGuid: string;
    /**
     * Sending line, when known — encoded in the thread ID so it survives a
     * cold-cache reply invocation where the Space must be rebuilt.
     */
    phone?: string;
}
/**
 * Explicit self-hosted iMessage client entry, passed straight through to
 * spectrum-ts's `imessage.config({ clients: [...] })`.
 *
 * - `address`: gRPC endpoint (`host:port`) of an `@photon-ai/advanced-imessage`
 *   server.
 * - `token`: auth token for that server.
 * - `phone`: the number this client sends/receives as (routing key in
 *   multi-number setups; use the `"shared"` sentinel for single-number).
 */
interface IMessageClientEntry {
    address: string;
    phone: string;
    token: string;
}

interface SpectrumCloudCredentials {
    projectId: string;
    projectSecret: string;
}
type iMessageCredentialProvider = () => Promise<SpectrumCloudCredentials> | SpectrumCloudCredentials;
/**
 * Verifies an inbound webhook that was authenticated by a trusted forwarding
 * service. Throwing or returning a falsy value rejects the request. A returned
 * string replaces the body used for parsing; any other truthy value accepts the
 * original body.
 */
type iMessageWebhookVerifier = (request: Request, rawBody: string) => unknown | Promise<unknown>;
interface iMessageAdapterConfig {
    /** Legacy self-host token. Mapped to a `clients` entry's `token`. */
    apiKey?: string;
    /** Explicit self-host gRPC clients (advanced). */
    clients?: IMessageClientEntry | IMessageClientEntry[];
    /** Resolve Spectrum Cloud credentials when the adapter is first used. */
    credentials?: iMessageCredentialProvider;
    /**
     * @deprecated Local (on-device) mode was removed. `false` is accepted as a
     * no-op for back-compat; `true` throws.
     */
    local?: false;
    logger: Logger;
    /** Routing/identity phone for legacy self-host (defaults to `"shared"`). */
    phone?: string;
    /** Spectrum Cloud project id (recommended path). */
    projectId?: string;
    /** Spectrum Cloud project secret (recommended path). */
    projectSecret?: string;
    /** Legacy self-host endpoint. Now a gRPC `host:port` (see README). */
    serverUrl?: string;
    /** Per-webhook signing secret for verifying Spectrum Cloud deliveries. */
    webhookSecret?: string;
    /** Trusted-forwarder verifier. Takes precedence over `webhookSecret`. */
    webhookVerifier?: iMessageWebhookVerifier;
}
/** @deprecated Use {@link iMessageAdapterConfig}. */
type iMessageAdapterRemoteConfig = iMessageAdapterConfig;
interface CreateiMessageAdapterOptions {
    apiKey?: string;
    clients?: IMessageClientEntry | IMessageClientEntry[];
    /**
     * Resolve Spectrum Cloud credentials lazily. The provider is called when the
     * adapter first initializes or sends, rather than during construction.
     */
    credentials?: iMessageCredentialProvider;
    /**
     * @deprecated Local (on-device) mode was removed. `false` is accepted as a
     * no-op for back-compat; `true` throws.
     */
    local?: boolean;
    logger?: Logger;
    phone?: string;
    projectId?: string;
    projectSecret?: string;
    serverUrl?: string;
    webhookSecret?: string;
    /** Trusted-forwarder verifier. Takes precedence over `webhookSecret`. */
    webhookVerifier?: iMessageWebhookVerifier;
}
/**
 * Normalize a legacy `serverUrl` into a gRPC `host:port` address.
 *
 * `@photon-ai/advanced-imessage` (the transport spectrum-ts uses) speaks gRPC,
 * not HTTP/Socket.IO, so any scheme is stripped and a default `:443` port is
 * appended when none is present.
 */
declare function deriveAddress(serverUrl: string): string;

/**
 * iMessage expressive-send effects, keyed by friendly name. Bubble effects
 * (`slam`, `loud`, `gentle`, `invisible`) animate the message bubble; the rest
 * are full-screen effects (`confetti`, `fireworks`, `balloons`, `heart`,
 * `lasers`, `celebration`, `sparkles`, `spotlight`, `echo`).
 *
 * Re-exported from spectrum-ts so callers can reference effects by name without
 * reaching into the provider package — e.g. `iMessageEffect.confetti`.
 */
declare const iMessageEffect: {
    readonly balloons: "com.apple.messages.effect.CKBalloonEffect";
    readonly celebration: "com.apple.messages.effect.CKHappyBirthdayEffect";
    readonly confetti: "com.apple.messages.effect.CKConfettiEffect";
    readonly echo: "com.apple.messages.effect.CKEchoEffect";
    readonly fireworks: "com.apple.messages.effect.CKFireworksEffect";
    readonly gentle: "com.apple.MobileSMS.expressivesend.gentle";
    readonly heart: "com.apple.messages.effect.CKHeartEffect";
    readonly invisible: "com.apple.MobileSMS.expressivesend.invisibleink";
    readonly lasers: "com.apple.messages.effect.CKLasersEffect";
    readonly loud: "com.apple.MobileSMS.expressivesend.loud";
    readonly slam: "com.apple.MobileSMS.expressivesend.impact";
    readonly sparkles: "com.apple.messages.effect.CKSparklesEffect";
    readonly spotlight: "com.apple.messages.effect.CKSpotlightEffect";
};
/** Accepted effect names (`"confetti"`, `"fireworks"`, …). */
type iMessageEffectName = keyof typeof iMessageEffect;
/**
 * Resolve an effect argument to a spectrum-ts effect id. Accepts either a
 * friendly name (`"confetti"`) or the raw effect id
 * (`iMessageEffect.confetti`), so both styles work. Throws a `ValidationError`
 * on an unknown effect.
 */
declare function resolveEffect(effect: IMessageMessageEffect | iMessageEffectName): IMessageMessageEffect;

/**
 * Image bytes for a mini-app card's inline image. Accepts raw bytes
 * (`Uint8Array` / `Buffer` / `ArrayBuffer`), a `Blob`, or a Chat SDK
 * `FileUpload` — whatever you already have on hand gets converted to the
 * `Uint8Array` spectrum-ts expects.
 */
type MiniAppImage = Uint8Array | ArrayBuffer | Blob | FileUpload;
/**
 * Layout of a mini-app card — everything the recipient sees in the bubble.
 * Every field is optional; supply the ones that make sense for your card. The
 * `image` renders as the card's artwork, with `imageTitle` / `imageSubtitle`
 * overlaid; the caption fields fill the text rows, and `summary` is the
 * fallback text shown where the mini-app can't render.
 */
interface MiniAppCardLayout {
    caption?: string;
    image?: MiniAppImage;
    imageSubtitle?: string;
    imageTitle?: string;
    subcaption?: string;
    summary?: string;
    trailingCaption?: string;
    trailingSubcaption?: string;
}
/**
 * A native iMessage mini-app card (an `MSMessageExtension` balloon). The
 * `appName`, `teamId`, and `extensionBundleId` identify the iMessage extension
 * that opens when the recipient taps the card, receiving `url`; `appStoreId`
 * optionally points recipients without the extension installed at its App
 * Store entry.
 */
interface MiniAppCard {
    /** Display name of the iMessage extension. */
    appName: string;
    /** Optional App Store id, for recipients without the extension installed. */
    appStoreId?: number;
    /** Bundle id of the `MSMessageExtension` that receives the tap. */
    extensionBundleId: string;
    /** What the recipient sees in the bubble. */
    layout?: MiniAppCardLayout;
    /** Apple Developer team id that signs the extension. */
    teamId: string;
    /** URL handed to the extension when the card is tapped. */
    url: string | URL;
}
/**
 * Validate and normalize a {@link MiniAppCard} into the
 * {@link CustomizedMiniAppInput} spectrum-ts's `customizedMiniApp()` builder
 * expects: required identifiers are checked non-empty, `url` is normalized to a
 * validated string, and the layout image (if any) is decoded to bytes.
 */
declare function resolveMiniApp(card: MiniAppCard): Promise<CustomizedMiniAppInput>;
/**
 * Distinguish the lightweight `app(url)` form from a fully-specified
 * {@link MiniAppCard}. An {@link AppUrl} is a string, a `Promise<string>`, or a
 * thunk (`() => string | Promise<string>`) — the mini-app card is a plain
 * object with named fields, so it never matches any of those shapes.
 */
declare function isAppUrl(input: MiniAppCard | AppUrl): input is AppUrl;

/**
 * Audio bytes for a voice message. Accepts raw bytes (`Uint8Array` / `Buffer` /
 * `ArrayBuffer`), a `Blob`, or a Chat SDK `FileUpload` — whatever your TTS
 * pipeline hands back gets normalized to the bytes spectrum-ts expects.
 */
type VoiceBytes = Uint8Array | ArrayBuffer | Blob | FileUpload;
/**
 * A voice message source: in-memory {@link VoiceBytes}, or an `http(s)` URL (a
 * `URL` or a string) that spectrum-ts fetches at send time. Local file paths
 * aren't accepted — read the file into bytes and pass those instead.
 */
type VoiceInput = VoiceBytes | URL | string;
/** Optional voice-message metadata. */
interface VoiceOptions {
    /**
     * Playback duration in seconds, surfaced on the waveform bubble. Optional —
     * iMessage derives the waveform from the audio itself when omitted.
     */
    duration?: number;
    /**
     * MIME type of the audio (`audio/*`). Required for raw bytes when the `name`
     * carries no audio extension; inferred from the URL / name otherwise.
     */
    mimeType?: string;
    /** File name handed to spectrum-ts (also used to infer the MIME type). */
    name?: string;
}
/**
 * Validate and normalize a voice source into the spectrum-ts `voice()` content
 * builder. URL sources are fetched by spectrum-ts at send time; byte sources
 * are copied to a detached `Buffer` and tagged with a resolved `audio/*` MIME
 * type. The builder is sent as a native iMessage voice note (a waveform
 * bubble), not an audio-file attachment.
 */
declare function resolveVoice(input: VoiceInput, options?: VoiceOptions): Promise<ContentBuilder>;

declare class iMessageAdapter implements Adapter {
    readonly name = "imessage";
    readonly userName: string;
    readonly serverUrl?: string;
    readonly apiKey?: string;
    readonly projectId?: string;
    readonly projectSecret?: string;
    readonly clients?: IMessageClientEntry[];
    readonly phone?: string;
    readonly webhookSecret?: string;
    /** The spectrum-ts instance — null until `initialize()` or `ensureApp()` runs. */
    app: SpectrumInstance | null;
    /** In-flight app build, so concurrent callers share one construction. */
    private appBuild;
    private chat;
    private readonly credentialProvider?;
    private readonly logger;
    private readonly webhookRequestVerifier?;
    private readonly formatConverter;
    private readonly cache;
    private readonly modals;
    private gatewayOptions?;
    private pump;
    constructor(config: iMessageAdapterConfig);
    initialize(chat: ChatInstance): Promise<void>;
    /**
     * Build the spectrum-ts app on demand. eve may call the adapter in an
     * invocation that never ran `initialize()` (e.g. a Vercel Workflow reply
     * callback), leaving `this.app` null — every send funnels through here first.
     */
    private ensureApp;
    private buildApp;
    /**
     * Handle a Spectrum Cloud webhook delivery (signed JSON `messages` event).
     *
     * Verifies the `X-Spectrum-Signature` HMAC, then routes the message into the
     * Chat SDK. A delivered thread has no live spectrum-ts `Space`, but the
     * adapter rebuilds one from the chat GUID on demand (see `resolveSpace`), so
     * replying works directly from a webhook delivery.
     *
     * @see https://photon.codes/docs/webhooks/overview
     */
    handleWebhook(request: Request, options?: WebhookOptions): Promise<Response>;
    /**
     * Build the spectrum content for an outbound message. Markdown-typed inputs
     * are sent via `markdown()` so remote iMessage renders them as native styled
     * text; raw/string/card inputs stay plain `text()`. Returns the rendered
     * `body` too so callers can skip an empty send.
     */
    private toSpectrumContent;
    postMessage(threadId: string, message: AdapterPostableMessage): Promise<RawMessage>;
    /**
     * Send a message with an iMessage expressive-send effect — a bubble effect
     * (`slam`, `loud`, `gentle`, `invisible`) or a full-screen effect
     * (`confetti`, `fireworks`, `balloons`, `heart`, `lasers`, `celebration`,
     * `sparkles`, `spotlight`, `echo`). Not part of the Chat SDK `Adapter`
     * interface — exposed as an adapter-specific extra (e.g. celebratory confetti
     * on task completion).
     *
     * The `effect` argument accepts a friendly name (`"confetti"`) or a value from
     * the re-exported `iMessageEffect` map. Effects attach to text content only,
     * so this requires non-empty text.
     */
    sendEffect(threadId: string, message: AdapterPostableMessage, effect: IMessageMessageEffect | iMessageEffectName): Promise<RawMessage>;
    /**
     * Send an iMessage mini-app card — an `MSMessageExtension` balloon, the
     * closest iMessage gets to a rich card (à la Slack Block Kit) instead of a
     * bare link. Not part of the Chat SDK `Adapter` interface — exposed as an
     * adapter-specific extra.
     *
     * Two forms:
     *
     * - **Just a URL** — pass a string (or a `Promise`/thunk resolving to one, so
     *   the link can be minted at send time). This is the lightweight `app(url)`
     *   card: the URL is rendered as a mini-app with no extension identifiers
     *   required.
     * - **A full {@link MiniAppCard}** — pass an object to control the bubble's
     *   image, captions, and the exact iMessage extension that opens on tap. Its
     *   `appName`, `teamId`, and `extensionBundleId` identify that extension.
     */
    sendMiniApp(threadId: string, url: AppUrl): Promise<RawMessage>;
    sendMiniApp(threadId: string, card: MiniAppCard): Promise<RawMessage>;
    /**
     * Send a native iMessage voice note — a real, playable waveform bubble (the
     * message renders with `isAudioMessage`), not an audio file dropped in as an
     * attachment. A natural fit for TTS-capable bots that reply with speech. Not
     * part of the Chat SDK `Adapter` interface — exposed as an adapter-specific
     * extra.
     *
     * The `input` is either in-memory audio bytes (`Uint8Array` / `Buffer` /
     * `ArrayBuffer`, a `Blob`, or a Chat SDK `FileUpload`) or an `http(s)` URL (a
     * `URL` or a string) that is fetched at send time. Audio bytes need an
     * `audio/*` MIME type — supply `options.mimeType` (e.g. `"audio/mp4"`) or an
     * `options.name` with an audio extension when it can't be inferred.
     */
    sendVoice(threadId: string, input: VoiceInput, options?: VoiceOptions): Promise<RawMessage>;
    /**
     * Set or clear the chat background — the wallpaper behind a conversation, an
     * iMessage-only touch with no analog on the plain-text competitors. Not part
     * of the Chat SDK `Adapter` interface — exposed as an adapter-specific extra.
     *
     * The `input` is either the literal `"clear"` (to remove the current
     * background), in-memory image bytes (`Uint8Array` / `Buffer` / `ArrayBuffer`,
     * a `Blob`, or a Chat SDK `FileUpload`), or an `http(s)` URL (a `URL` or a
     * string) that is fetched at send time. Image bytes need an `image/*` MIME
     * type — supply `options.mimeType` (e.g. `"image/jpeg"`) or an `options.name`
     * with an image extension when it can't be inferred.
     *
     * Fire-and-forget: iMessage acknowledges the control signal without returning
     * a message, so this resolves to `void` rather than a {@link RawMessage}.
     */
    setBackground(threadId: string, input: BackgroundInput, options?: BackgroundOptions): Promise<void>;
    editMessage(threadId: string, messageId: string, message: AdapterPostableMessage): Promise<RawMessage>;
    deleteMessage(threadId: string, messageId: string): Promise<void>;
    parseMessage(raw: unknown): Message;
    /**
     * Fetch a single message by id. spectrum-ts can resolve a message by id
     * (from the inbound cache or the provider's by-id lookup) even though it has
     * no paginated history API, so single-message reads work where
     * `fetchMessages` cannot. Returns `null` when the message can't be resolved.
     */
    fetchMessage(threadId: string, messageId: string): Promise<Message | null>;
    fetchMessages(_threadId: string, _options?: FetchOptions): Promise<FetchResult>;
    fetchThread(_threadId: string): Promise<ThreadInfo>;
    channelIdFromThreadId(threadId: string): string;
    addReaction(threadId: string, messageId: string, emoji: EmojiValue | string): Promise<void>;
    removeReaction(_threadId: string, messageId: string, emoji: EmojiValue | string): Promise<void>;
    startTyping(threadId: string, _status?: string): Promise<void>;
    /**
     * Cold-start a DM with a phone number / handle. spectrum-ts resolves (or
     * creates) the 1:1 conversation from the participant via `space.create`, so
     * the bot can message a user it has never received from. Returns the encoded
     * thread id, ready to pass to `postMessage`.
     */
    openDM(userId: string): Promise<string>;
    /**
     * Mark a received message (and the conversation up to it) as read, surfacing
     * a read receipt where iMessage supports one. Not part of the
     * Chat SDK `Adapter` interface — exposed as an adapter-specific extra.
     */
    markRead(threadId: string, messageId: string): Promise<void>;
    openModal(triggerId: string, modal: ModalElement, contextId?: string): Promise<{
        viewId: string;
    }>;
    renderFormatted(content: FormattedContent): string;
    encodeThreadId(platformData: iMessageThreadId): string;
    decodeThreadId(threadId: string): iMessageThreadId;
    isDM(threadId: string): boolean;
    startGatewayListener(options: WebhookOptions, durationMs?: number, abortSignal?: AbortSignal): Promise<Response>;
    private routeWebhookMessage;
    private routeInbound;
    private processInboundReaction;
    private handlePollOption;
    /**
     * Resolve a sendable spectrum-ts `Space` for a thread. Prefers a cached live
     * Space; otherwise rebuilds it from the chat GUID, passing the sending line
     * so `space.get` can pick it when multiple lines are configured. Returns
     * `undefined` when no Space can be obtained.
     */
    private resolveSpace;
    /**
     * The iMessage provider's Space namespace (`get` / `create`). `HasProvider`
     * over the default provider tuple won't narrow to `true`, so `imessage(app)`
     * types as `never` — cast to the slice of the instance we use.
     */
    private platformSpaces;
    private requireSpace;
    private resolveMessage;
}

/**
 * Construct an {@link iMessageAdapter}, filling unset options from environment
 * variables. Requires remote credentials: cloud `projectId` + `projectSecret`,
 * or self-host `clients` / `serverUrl` + `apiKey`.
 */
declare function createiMessageAdapter(config?: CreateiMessageAdapterOptions): iMessageAdapter;

/**
 * iMessage format conversion using AST-based parsing.
 *
 * Remote iMessage (via spectrum-ts) renders CommonMark natively as styled text
 * (bold/italic/links etc. via UTF-16 formatting ranges), so markdown-typed
 * outbound content is sent through spectrum's `markdown()` builder verbatim --
 * see `renderPostableContent`. The plain-text rendering here (`fromAst`) is
 * still used for inbound parsing, `renderFormatted`, and the raw/card fallback
 * paths: it strips formatting markers and preserves structure (lists,
 * blockquotes, code blocks) with whitespace.
 */

/**
 * The spectrum content a postable message should be sent as: the body string
 * plus whether spectrum should render it as native markdown (styled text) or
 * pass it through as plain text.
 */
interface PostableContent {
    body: string;
    markdown: boolean;
}
declare class iMessageFormatConverter extends BaseFormatConverter {
    /**
     * Render an AST to iMessage plain text format.
     * Strips all formatting markers since iMessage doesn't support rich text via API.
     */
    fromAst(ast: Root): string;
    /**
     * Parse iMessage text into an AST.
     * iMessage sends plain text, so we just parse it as markdown.
     */
    toAst(text: string): Root;
    /**
     * Decide how a postable message should reach spectrum-ts.
     *
     * Markdown-typed inputs -- `{ markdown }` and `{ ast }` -- carry CommonMark
     * the caller wants styled, so their source is preserved verbatim and flagged
     * `markdown: true`; the adapter sends it via spectrum's `markdown()` builder,
     * which renders bold/italic/links/lists as native iMessage styled text.
     *
     * Everything else is pass-through-as-is by contract -- a plain `string` or
     * `{ raw }` must not have stray `*`/`_` reinterpreted as formatting, and
     * cards fall back to plain text -- so those are rendered to plain text and
     * flagged `markdown: false`.
     */
    renderPostableContent(message: AdapterPostableMessage): PostableContent;
    private nodeToPlainText;
}

export { type BackgroundBytes, type BackgroundInput, type BackgroundOptions, type CreateiMessageAdapterOptions, type IMessageClientEntry, type MiniAppCard, type MiniAppCardLayout, type MiniAppImage, type SpectrumCloudCredentials, type VoiceBytes, type VoiceInput, type VoiceOptions, createiMessageAdapter, deriveAddress, iMessageAdapter, type iMessageAdapterConfig, type iMessageAdapterRemoteConfig, type iMessageCredentialProvider, iMessageEffect, type iMessageEffectName, iMessageFormatConverter, type iMessageThreadId, type iMessageWebhookVerifier, isAppUrl, resolveBackground, resolveEffect, resolveMiniApp, resolveVoice };
