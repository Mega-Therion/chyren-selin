type SlackHeaderValue = readonly string[] | string | null | undefined;
type SlackHeaders = Headers | Iterable<readonly [string, string]> | Record<string, SlackHeaderValue>;
type SlackWebhookVerifier = (request: Request, body: string) => Promise<unknown> | unknown;
interface SlackVerifyOptions {
    maxSkewSeconds?: number;
    now?: () => number;
    signingSecret?: string;
    webhookVerifier?: SlackWebhookVerifier;
}
interface SlackParseOptions {
    contentType?: string | null;
    headers?: SlackHeaders;
}
interface SlackReadOptions extends SlackParseOptions, SlackVerifyOptions {
}
interface SlackRetry {
    num: number;
    reason?: string;
}
interface SlackContinuation {
    channelId: string;
    enterpriseId?: string;
    teamId?: string;
    threadTs: string;
}
interface SlackUser {
    id: string;
    name?: string;
    teamId?: string;
    username?: string;
}
interface SlackFile {
    downloadUrl?: string;
    filetype?: string;
    id: string;
    mimeType?: string;
    name?: string;
    raw: Record<string, unknown>;
    size?: number;
    title?: string;
    type: "audio" | "file" | "image" | "video";
    url?: string;
}
type SlackWebhookPayload = SlackAppMentionPayload | SlackBlockActionsPayload | SlackBlockSuggestionPayload | SlackDirectMessagePayload | SlackSlashCommandPayload | SlackUnsupportedPayload | SlackUrlVerificationPayload | SlackViewClosedPayload | SlackViewSubmissionPayload;
interface SlackUrlVerificationPayload {
    challenge: string;
    kind: "url_verification";
    raw: Record<string, unknown>;
    retry?: SlackRetry;
}
interface SlackEventBasePayload {
    apiAppId?: string;
    channelId: string;
    continuation: SlackContinuation;
    enterpriseId?: string;
    eventId?: string;
    eventTime?: number;
    files?: SlackFile[];
    isExtSharedChannel?: boolean;
    raw: Record<string, unknown>;
    retry?: SlackRetry;
    teamId?: string;
    text: string;
    threadTs: string;
    ts: string;
    userId?: string;
}
interface SlackAppMentionPayload extends SlackEventBasePayload {
    eventType: "app_mention";
    kind: "app_mention";
}
interface SlackDirectMessagePayload extends SlackEventBasePayload {
    botId?: string;
    eventType: "message";
    kind: "direct_message";
    subtype?: string;
}
interface SlackSlashCommandPayload {
    channelId: string;
    channelName?: string;
    command: string;
    enterpriseId?: string;
    isEnterpriseInstall: boolean;
    kind: "slash_command";
    raw: Record<string, string>;
    responseUrl?: string;
    retry?: SlackRetry;
    teamId?: string;
    text: string;
    triggerId?: string;
    userId: string;
    userName?: string;
}
interface SlackAction {
    actionId: string;
    blockId?: string;
    label?: string;
    raw: Record<string, unknown>;
    selectedOptionLabel?: string;
    selectedOptionValue?: string;
    type: string;
    user?: SlackUser;
    value?: string;
}
interface SlackBlockActionsPayload {
    actions: SlackAction[];
    channelId?: string;
    continuation?: SlackContinuation;
    enterpriseId?: string;
    isEnterpriseInstall?: boolean;
    kind: "block_actions";
    messageBlocks?: unknown[];
    messagePromptBlock?: unknown;
    messagePromptText?: string;
    messageTs?: string;
    raw: Record<string, unknown>;
    responseUrl?: string;
    retry?: SlackRetry;
    teamId?: string;
    threadTs?: string;
    triggerId?: string;
    user?: SlackUser;
    userId: string;
    userName?: string;
}
interface SlackBlockSuggestionPayload {
    actionId: string;
    blockId: string;
    channelId?: string;
    enterpriseId?: string;
    kind: "block_suggestion";
    raw: Record<string, unknown>;
    retry?: SlackRetry;
    teamId?: string;
    userId: string;
    value: string;
}
interface SlackViewSubmissionPayload {
    callbackId?: string;
    enterpriseId?: string;
    kind: "view_submission";
    privateMetadata?: string;
    raw: Record<string, unknown>;
    responseUrls?: unknown[];
    retry?: SlackRetry;
    teamId?: string;
    user?: SlackUser;
    userId: string;
    values?: SlackViewStateValue[];
    view: Record<string, unknown>;
}
interface SlackViewClosedPayload {
    enterpriseId?: string;
    kind: "view_closed";
    raw: Record<string, unknown>;
    retry?: SlackRetry;
    teamId?: string;
    user?: SlackUser;
    userId: string;
    view: Record<string, unknown>;
}
interface SlackViewStateValue {
    actionId: string;
    blockId: string;
    raw: Record<string, unknown>;
    selectedOptionLabel?: string;
    selectedOptionValue?: string;
    type?: string;
    value?: string;
}
interface SlackUnsupportedPayload {
    kind: "unsupported";
    raw: unknown;
    retry?: SlackRetry;
    type: string;
}
declare class SlackWebhookError extends Error {
    constructor(message: string);
}
declare class SlackWebhookVerificationError extends SlackWebhookError {
    constructor(message: string);
}
declare class SlackWebhookParseError extends SlackWebhookError {
    constructor(message: string);
}

export { type SlackWebhookVerifier as S, type SlackParseOptions as a, type SlackWebhookPayload as b, type SlackReadOptions as c, type SlackVerifyOptions as d, type SlackHeaders as e, type SlackAction as f, type SlackAppMentionPayload as g, type SlackBlockActionsPayload as h, type SlackBlockSuggestionPayload as i, type SlackContinuation as j, type SlackDirectMessagePayload as k, type SlackEventBasePayload as l, type SlackFile as m, type SlackHeaderValue as n, type SlackRetry as o, type SlackSlashCommandPayload as p, type SlackUnsupportedPayload as q, type SlackUrlVerificationPayload as r, type SlackUser as s, type SlackViewClosedPayload as t, type SlackViewStateValue as u, type SlackViewSubmissionPayload as v, SlackWebhookError as w, SlackWebhookParseError as x, SlackWebhookVerificationError as y };
