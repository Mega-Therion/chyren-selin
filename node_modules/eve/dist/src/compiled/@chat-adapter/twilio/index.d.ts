import { BaseFormatConverter, Root, AdapterPostableMessage, Logger, CardElement, Adapter, ChatInstance, WebhookOptions, RawMessage, Message, FetchOptions, FetchResult, ThreadInfo, UserInfo, FormattedContent, Attachment } from '#compiled/chat/index.js';
import { TwilioMessageResource, TwilioCredential, TwilioFetch, TwilioApiOptions } from './api.js';
import { T as TwilioWebhookPayload, a as TwilioWebhookUrl, b as TwilioWebhookVerifier, c as TwilioMediaPayload } from './types-WYjTBVDi.js';

declare class TwilioFormatConverter extends BaseFormatConverter {
    toAst(text: string): Root;
    fromAst(ast: Root): string;
    renderPostable(message: AdapterPostableMessage): string;
}

interface TwilioThreadId {
    recipient: string;
    sender: string;
}
interface TwilioAdapterConfig {
    accountSid?: TwilioCredential;
    apiUrl?: string;
    authToken?: TwilioCredential;
    fetch?: TwilioFetch;
    logger?: Logger;
    messagingServiceSid?: string;
    phoneNumber?: string;
    statusCallbackUrl?: string;
    userName?: string;
    webhookUrl?: TwilioWebhookUrl;
    webhookVerifier?: TwilioWebhookVerifier;
}
type TwilioRawMessage = TwilioMessageResource | TwilioWebhookPayload;

declare function cardToTwilioText(card: CardElement): string;

declare class TwilioAdapter implements Adapter<TwilioThreadId, TwilioRawMessage> {
    readonly name = "twilio";
    readonly lockScope: "channel";
    readonly persistThreadHistory = true;
    readonly userName: string;
    protected chat: ChatInstance | null;
    protected readonly accountSid?: TwilioAdapterConfig["accountSid"];
    protected readonly apiUrl?: string;
    protected readonly authToken?: TwilioAdapterConfig["authToken"];
    protected readonly fetch?: TwilioAdapterConfig["fetch"];
    protected readonly formatConverter: TwilioFormatConverter;
    protected readonly logger: Logger;
    protected readonly messagingServiceSid?: string;
    protected readonly phoneNumber?: string;
    protected readonly statusCallbackUrl?: string;
    protected readonly webhookUrl?: TwilioAdapterConfig["webhookUrl"];
    protected readonly webhookVerifier?: TwilioAdapterConfig["webhookVerifier"];
    constructor(config?: TwilioAdapterConfig);
    initialize(chat: ChatInstance): Promise<void>;
    handleWebhook(request: Request, options?: WebhookOptions): Promise<Response>;
    postMessage(threadId: string, message: AdapterPostableMessage): Promise<RawMessage<TwilioRawMessage>>;
    editMessage(): Promise<RawMessage<TwilioRawMessage>>;
    deleteMessage(_threadId: string, messageId: string): Promise<void>;
    addReaction(): Promise<void>;
    removeReaction(): Promise<void>;
    startTyping(): Promise<void>;
    parseMessage(raw: TwilioRawMessage): Message<TwilioRawMessage>;
    fetchMessage(threadId: string, messageId: string): Promise<Message<TwilioRawMessage> | null>;
    fetchMessages(threadId: string, options?: FetchOptions): Promise<FetchResult<TwilioRawMessage>>;
    fetchThread(threadId: string): Promise<ThreadInfo>;
    getUser(userId: string): Promise<UserInfo | null>;
    openDM(userId: string): Promise<string>;
    isDM(threadId: string): boolean;
    channelIdFromThreadId(threadId: string): string;
    encodeThreadId(platformData: TwilioThreadId): string;
    decodeThreadId(threadId: string): TwilioThreadId;
    renderFormatted(content: FormattedContent): string;
    rehydrateAttachment(attachment: Attachment): Attachment;
    protected parseTwilioTextPayload(raw: TwilioWebhookPayload & {
        kind: "text";
    }, threadId: string): Message<TwilioRawMessage>;
    protected parseTwilioResource(raw: TwilioMessageResource, fallbackThread: TwilioThreadId | undefined): Message<TwilioRawMessage>;
    protected renderPostableText(message: AdapterPostableMessage): string;
    protected mediaUrls(message: AdapterPostableMessage): string[];
    protected twilioAttachment(media: TwilioMediaPayload): Attachment;
    protected apiOptions(): TwilioApiOptions;
    protected defaultSender(): string;
    protected author(userId: string, isMe: boolean): Message["author"];
    protected threadIdForResource(raw: TwilioMessageResource, fallback: TwilioThreadId): string;
}
declare function createTwilioAdapter(config?: TwilioAdapterConfig): TwilioAdapter;

export { TwilioAdapter, type TwilioAdapterConfig, TwilioFormatConverter, type TwilioRawMessage, type TwilioThreadId, cardToTwilioText, createTwilioAdapter };
