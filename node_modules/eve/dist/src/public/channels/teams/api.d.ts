/**
 * Minimal Microsoft Teams Bot Framework Connector REST wrapper.
 *
 * The native Teams channel talks directly to the Bot Framework Activity
 * protocol instead of exposing BotBuilder or Teams SDK objects through
 * eve public APIs.
 */
import { type JsonObject } from "#shared/json.js";
/** Microsoft application id, materialized directly or from an async secret provider. */
export type TeamsAppId = string | (() => string | Promise<string>);
/** Microsoft application password, materialized directly or from an async secret provider. */
export type TeamsAppPassword = string | (() => string | Promise<string>);
/** Microsoft tenant id, materialized directly or from an async secret provider. */
export type TeamsTenantId = string | (() => string | Promise<string>);
/** Fetch implementation override used by tests or non-standard runtimes. */
export type TeamsFetch = typeof fetch;
/** Result shape accepted from a caller-owned Bot Connector token provider. */
export type TeamsAccessTokenResult = string | {
    readonly accessToken: string;
    readonly expiresAt?: Date | number;
};
/** Caller-owned Bot Connector token provider. */
export type TeamsTokenProvider = () => TeamsAccessTokenResult | Promise<TeamsAccessTokenResult>;
/** Credentials used by the native Teams channel. */
export interface TeamsCredentials {
    readonly appId?: TeamsAppId;
    readonly appPassword?: TeamsAppPassword;
    readonly tenantId?: TeamsTenantId;
    readonly tokenProvider?: TeamsTokenProvider;
}
/** Shared Teams API options. */
export interface TeamsApiOptions {
    readonly credentials?: TeamsCredentials;
    /** Fetch override for tests or non-standard runtimes. */
    readonly fetch?: TeamsFetch;
    /**
     * Microsoft OAuth host for the client-credentials token flow. Defaults to
     * `https://login.microsoftonline.com`. eve ignores it when
     * `credentials.tokenProvider` is set.
     */
    readonly loginBaseUrl?: string;
}
/** Raw Teams Connector API response body. */
export interface TeamsApiResponse {
    readonly status: number;
    readonly ok: boolean;
    readonly body: unknown;
}
/** Minimal ResourceResponse object returned by Teams write operations. */
export interface TeamsPostedActivity {
    /** Teams/Bot Framework activity id, when one was returned. */
    readonly id: string;
    /** Connector's raw JSON response. */
    readonly raw: unknown;
}
/** Bot Framework channel account shape surfaced by the native Teams channel. */
export interface TeamsChannelAccount {
    readonly aadObjectId?: string;
    readonly id: string;
    readonly name?: string;
    readonly role?: string;
}
/** Bot Framework mention entity shape used by Teams messages. */
export interface TeamsMention {
    readonly mentioned: TeamsChannelAccount;
    readonly text: string;
    readonly type: "mention";
}
/** Bot Framework/Teams attachment shape supported by eve-owned APIs. */
export interface TeamsAttachment {
    readonly content?: JsonObject;
    readonly contentType: string;
    readonly contentUrl?: string;
    readonly name?: string;
}
/** JSON body supported by Teams message endpoints used by eve. */
export interface TeamsMessageBody {
    readonly attachments?: readonly TeamsAttachment[];
    readonly channelData?: JsonObject;
    readonly entities?: readonly TeamsMention[];
    readonly inputHint?: string;
    readonly speak?: string;
    readonly suggestedActions?: JsonObject;
    readonly text?: string;
    readonly textFormat?: "markdown" | "plain" | "xml";
}
/**
 * Outbound Bot Framework activity body sent through the Connector API.
 * `type: "message"` carries the message fields; `type: "typing"` is a
 * content-free typing indicator sent as-is, without normalization or
 * channelData merging.
 */
export interface TeamsOutboundActivity extends TeamsMessageBody {
    readonly conversation?: JsonObject;
    readonly from?: TeamsChannelAccount;
    readonly recipient?: TeamsChannelAccount;
    readonly replyToId?: string;
    readonly type: "message" | "typing";
}
/** Maximum character length for a single outbound Teams activity before `splitTeamsMessageText` chunks it (80 KiB). */
export declare const TEAMS_MESSAGE_TEXT_MAX_LENGTH: number;
/** Builds the channel-local continuation token for one Teams conversation/thread. */
export declare function teamsContinuationToken(input: {
    readonly conversationId: string;
    readonly replyToActivityId?: string | null;
    readonly tenantId?: string | null;
}): string;
/** Normalizes the thread suffix that Teams inconsistently includes in channel conversation ids. */
export declare function normalizeTeamsContinuationAddress(input: {
    readonly conversationId: string;
    readonly replyToActivityId?: string | null;
}): {
    readonly conversationId: string;
    readonly replyToActivityId: string | null;
};
/** Resolves a Teams app id, falling back to `MICROSOFT_APP_ID` then `TEAMS_APP_ID`. */
export declare function resolveTeamsAppId(appId?: TeamsAppId): Promise<string>;
/** Resolves a Teams app password, falling back to `MICROSOFT_APP_PASSWORD` then `TEAMS_APP_PASSWORD`. */
export declare function resolveTeamsAppPassword(appPassword?: TeamsAppPassword): Promise<string>;
/** Resolves a Teams tenant id, falling back to `MICROSOFT_TENANT_ID` then `TEAMS_TENANT_ID`. */
export declare function resolveTeamsTenantId(tenantId?: TeamsTenantId): Promise<string | undefined>;
/** Resolves a Bot Connector access token, using a custom provider or client credentials. */
export declare function resolveTeamsAccessToken(options?: TeamsApiOptions): Promise<string>;
/** Low-level Bot Framework Connector API call. */
export declare function callTeamsConnectorApi(input: TeamsApiOptions & {
    readonly body?: TeamsOutboundActivity | JsonObject;
    readonly method?: "DELETE" | "GET" | "POST" | "PUT";
    readonly path: string;
    readonly serviceUrl: string;
}): Promise<TeamsApiResponse>;
/** Sends a non-reply activity to one Teams conversation. */
export declare function sendTeamsActivity(input: TeamsApiOptions & {
    readonly body: TeamsOutboundActivity;
    readonly conversationId: string;
    readonly serviceUrl: string;
}): Promise<TeamsPostedActivity>;
/** Sends a reply activity to one Teams conversation activity. */
export declare function replyToTeamsActivity(input: TeamsApiOptions & {
    readonly activityId: string;
    readonly body: TeamsOutboundActivity;
    readonly conversationId: string;
    readonly serviceUrl: string;
}): Promise<TeamsPostedActivity>;
/** Updates an existing Teams bot activity. */
export declare function updateTeamsActivity(input: TeamsApiOptions & {
    readonly activityId: string;
    readonly body: TeamsOutboundActivity;
    readonly conversationId: string;
    readonly serviceUrl: string;
}): Promise<TeamsPostedActivity>;
/** Triggers Teams' typing indicator for one conversation. */
export declare function triggerTeamsTypingIndicator(input: TeamsApiOptions & {
    readonly conversationId: string;
    readonly serviceUrl: string;
}): Promise<void>;
/**
 * Splits `content` into chunks no longer than `TEAMS_MESSAGE_TEXT_MAX_LENGTH`,
 * breaking on paragraph, then line, then word boundaries before a hard cut.
 * Returns a single-element array when `content` already fits.
 */
export declare function splitTeamsMessageText(content: string): readonly string[];
/** Normalizes a string or message body into a Teams message activity body. */
export declare function normalizeTeamsPostInput(message: string | TeamsMessageBody): TeamsMessageBody;
