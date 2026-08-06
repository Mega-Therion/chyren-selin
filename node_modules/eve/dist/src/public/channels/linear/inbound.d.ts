import type { UserContent } from "ai";
import { type JsonObject } from "#shared/json.js";
/** Linear Agent Session webhook actions supported by the channel. */
export type LinearAgentSessionAction = "created" | "prompted" | (string & {});
/** Verified Linear webhook delivery headers. */
export interface LinearDelivery {
    event: string | undefined;
    id: string | undefined;
}
/** Linear actor projected from webhook payload user/creator fields. */
export interface LinearUser {
    id: string;
    displayName?: string;
    name?: string;
    email?: string;
    url?: string;
}
/** Linear issue context attached to an Agent Session. */
export interface LinearIssueRef {
    id: string;
    identifier?: string;
    title?: string;
    url?: string;
}
/** Linear Agent Session snapshot carried by Agent Session webhooks. */
export interface LinearAgentSessionRef {
    appUserId?: string;
    commentId?: string | null;
    creator?: LinearUser;
    creatorId?: string | null;
    id: string;
    issue?: LinearIssueRef | null;
    issueId?: string | null;
    organizationId?: string;
    sourceCommentId?: string | null;
    status?: string;
    summary?: string | null;
    url?: string | null;
}
/** Linear Agent Activity snapshot carried by `prompted` webhooks. */
export interface LinearAgentActivityRef {
    body?: string;
    content: JsonObject;
    id: string;
    signal?: string | null;
    signalMetadata?: JsonObject | null;
    sourceCommentId?: string | null;
    user?: LinearUser;
    userId?: string | null;
}
/** Parsed Linear Agent Session event consumed by `linearChannel`. */
export interface LinearAgentSessionEvent {
    readonly action: LinearAgentSessionAction;
    readonly agentActivity?: LinearAgentActivityRef;
    readonly agentSession: LinearAgentSessionRef;
    readonly appUserId?: string;
    readonly createdAt?: string;
    readonly delivery: LinearDelivery;
    readonly guidance?: string;
    readonly kind: "agent_session";
    readonly oauthClientId?: string;
    readonly organizationId?: string;
    readonly previousComments: readonly string[];
    readonly promptContext?: string;
    readonly raw: JsonObject;
}
/** Parsed generic Linear data webhook event. */
export interface LinearDataWebhookEvent {
    readonly action?: string;
    readonly delivery: LinearDelivery;
    readonly kind: "data";
    readonly organizationId?: string;
    readonly raw: JsonObject;
    readonly type: string;
}
/** Parsed Linear webhook event shape consumed by the channel. */
export type LinearInboundEvent = LinearAgentSessionEvent | LinearDataWebhookEvent;
/** Builds the continuation token for one Linear Agent Session. */
export declare function linearContinuationToken(agentSessionId: string): string;
/** Parses a verified Linear webhook body into a normalized event, or `null` when unsupported. */
export declare function parseLinearWebhookEvent(input: {
    readonly body: string;
    readonly headers: Headers;
}): LinearInboundEvent | null;
/** Builds the user-facing message for a Linear Agent Session event. */
export declare function messageFromLinearAgentSessionEvent(event: LinearAgentSessionEvent): UserContent;
/** Formats Linear issue/session context as an eve context block. */
export declare function formatLinearContextBlock(event: LinearAgentSessionEvent): string;
