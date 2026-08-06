type SlackBotToken = string | (() => Promise<string> | string);
type SlackFetch = typeof fetch;
interface SlackApiResponse {
    error?: string;
    needed?: string;
    ok: boolean;
    provided?: string;
    response_metadata?: {
        messages?: string[];
        next_cursor?: string;
        warnings?: string[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
interface SlackApiOptions {
    apiUrl?: string;
    fetch?: SlackFetch;
    token: SlackBotToken;
}
interface SlackApiCallOptions extends SlackApiOptions {
    contentType?: "form" | "json";
}
interface SlackMessageOptions extends SlackApiOptions {
    blocks?: unknown[];
    channel: string;
    markdownText?: string;
    metadata?: unknown;
    replyBroadcast?: boolean;
    text?: string;
    threadTs?: string;
    unfurlLinks?: boolean;
    unfurlMedia?: boolean;
}
interface SlackEphemeralOptions extends SlackMessageOptions {
    user: string;
}
interface SlackUpdateOptions extends SlackMessageOptions {
    ts: string;
}
interface SlackDeleteOptions extends SlackApiOptions {
    channel: string;
    ts: string;
}
interface SlackPostedMessage {
    channel?: string;
    id: string;
    raw: SlackApiResponse;
}
interface SlackResponseUrlPayload {
    blocks?: unknown[];
    deleteOriginal?: boolean;
    replaceOriginal?: boolean;
    responseType?: "ephemeral" | "in_channel";
    text?: string;
    threadTs?: string;
}
interface SlackResponseUrlOptions {
    fetch?: SlackFetch;
}
interface SlackFileUpload {
    altText?: string;
    data: ArrayBuffer | Blob | Uint8Array;
    filename: string;
    snippetType?: string;
    title?: string;
}
interface SlackUploadOptions extends SlackApiOptions {
    channelId?: string;
    initialComment?: string;
    threadTs?: string;
}
interface SlackUploadResult {
    fileIds: string[];
    raw: SlackApiResponse;
}
interface SlackFileFetchOptions extends SlackApiOptions {
    url: string;
}
declare class SlackApiError extends Error {
    method: string;
    response?: SlackApiResponse;
    status?: number;
    constructor(message: string, options: {
        method: string;
        response?: SlackApiResponse;
        status?: number;
    });
}
declare function resolveSlackBotToken(token: SlackBotToken): Promise<string>;
declare function callSlackApi<TResponse extends SlackApiResponse = SlackApiResponse>(method: string, body: Record<string, unknown>, options: SlackApiCallOptions): Promise<TResponse>;
declare function postSlackMessage(options: SlackMessageOptions): Promise<SlackPostedMessage>;
declare function postSlackEphemeral(options: SlackEphemeralOptions): Promise<SlackPostedMessage>;
declare function updateSlackMessage(options: SlackUpdateOptions): Promise<SlackPostedMessage>;
declare function deleteSlackMessage(options: SlackDeleteOptions): Promise<SlackApiResponse>;
declare function sendSlackResponseUrl(url: string, payload: SlackResponseUrlPayload, options?: SlackResponseUrlOptions): Promise<void>;
declare function uploadSlackFiles(files: readonly SlackFileUpload[], options: SlackUploadOptions): Promise<SlackUploadResult>;
declare function fetchSlackFile(options: SlackFileFetchOptions): Promise<Response>;
declare function encodeSlackApiBody(body: Record<string, unknown>, contentType?: "form" | "json"): {
    body: string;
    contentType: string;
};
declare function assertSlackOk(method: string, response: SlackApiResponse): void;

interface SlackThreadRepliesOptions extends SlackApiOptions {
    channel: string;
    cursor?: string;
    includeAllMetadata?: boolean;
    inclusive?: boolean;
    latest?: string;
    limit?: number;
    oldest?: string;
    ts: string;
}
interface SlackThreadRepliesResult {
    messages: unknown[];
    nextCursor?: string;
    raw: SlackApiResponse;
}
interface SlackOpenViewOptions extends SlackApiOptions {
    interactivityPointer?: string;
    triggerId?: string;
    view: unknown;
}
interface SlackOpenViewResult {
    raw: SlackApiResponse;
    view?: unknown;
}
declare function fetchSlackThreadReplies(options: SlackThreadRepliesOptions): Promise<SlackThreadRepliesResult>;
declare function openSlackView(options: SlackOpenViewOptions): Promise<SlackOpenViewResult>;

export { type SlackApiCallOptions, SlackApiError, type SlackApiOptions, type SlackApiResponse, type SlackBotToken, type SlackDeleteOptions, type SlackEphemeralOptions, type SlackFetch, type SlackFileFetchOptions, type SlackFileUpload, type SlackMessageOptions, type SlackOpenViewOptions, type SlackOpenViewResult, type SlackPostedMessage, type SlackResponseUrlOptions, type SlackResponseUrlPayload, type SlackThreadRepliesOptions, type SlackThreadRepliesResult, type SlackUpdateOptions, type SlackUploadOptions, type SlackUploadResult, assertSlackOk, callSlackApi, deleteSlackMessage, encodeSlackApiBody, fetchSlackFile, fetchSlackThreadReplies, openSlackView, postSlackEphemeral, postSlackMessage, resolveSlackBotToken, sendSlackResponseUrl, updateSlackMessage, uploadSlackFiles };
