import { type LinearChannelCredentials } from "#public/channels/linear/auth.js";
import { type JsonObject } from "#shared/json.js";
export type LinearFetch = typeof fetch;
/** Transport options for Linear GraphQL calls. */
export interface LinearApiOptions {
    /** Defaults to `https://api.linear.app/graphql`. */
    readonly apiBaseUrl?: string;
    /** Test/fetch override. */
    readonly fetch?: LinearFetch;
}
export type LinearAgentActivitySignal = "auth" | "continue" | "select" | "stop";
export type LinearAgentActivityContent = {
    readonly body: string;
    readonly type: "elicitation" | "error" | "response" | "thought";
} | {
    readonly action: string;
    readonly parameter: string;
    readonly result?: string;
    readonly type: "action";
};
export interface LinearAgentActivityCreateInput {
    agentSessionId: string;
    content: LinearAgentActivityContent;
    ephemeral?: boolean;
    signal?: LinearAgentActivitySignal;
    signalMetadata?: JsonObject;
}
export interface LinearExternalUrl {
    label: string;
    url: string;
}
export interface LinearAgentSessionUpdateInput {
    addedExternalUrls?: readonly LinearExternalUrl[];
    externalLink?: string;
    externalUrls?: readonly LinearExternalUrl[];
    plan?: JsonObject;
    removedExternalUrls?: readonly string[];
}
export interface LinearAgentSessionRecord {
    appUserId?: string;
    commentId?: string | null;
    creatorId?: string | null;
    id: string;
    issue?: {
        id: string;
        identifier?: string;
        title?: string;
        url?: string;
    } | null;
    issueId?: string | null;
    sourceCommentId?: string | null;
    status?: string;
    url?: string | null;
}
export interface LinearAgentActivityRecord {
    content: {
        body?: string;
        type?: string;
        __typename?: string;
    };
    id: string;
    signal?: string | null;
    signalMetadata?: JsonObject | null;
    updatedAt?: string;
}
export declare class LinearApiError extends Error {
    readonly body: unknown;
    readonly queryName: string;
    readonly status: number;
    constructor(input: {
        readonly body: unknown;
        readonly queryName: string;
        readonly status: number;
    });
}
export declare function callLinearGraphQL<T>(input: {
    readonly api?: LinearApiOptions;
    readonly credentials?: LinearChannelCredentials;
    readonly query: string;
    readonly queryName: string;
    readonly variables?: JsonObject;
}): Promise<T>;
/** Emits one semantic Agent Activity into a Linear Agent Session. */
export declare function createLinearAgentActivity(input: {
    readonly api?: LinearApiOptions;
    readonly credentials?: LinearChannelCredentials;
    readonly activity: LinearAgentActivityCreateInput;
}): Promise<{
    readonly id: string;
    readonly success: boolean;
}>;
/** Updates mutable Agent Session fields such as external URLs and plan. */
export declare function updateLinearAgentSession(input: {
    readonly api?: LinearApiOptions;
    readonly credentials?: LinearChannelCredentials;
    readonly id: string;
    readonly update: LinearAgentSessionUpdateInput;
}): Promise<{
    readonly success: boolean;
}>;
/** Creates a proactive Agent Session attached to a Linear issue. */
export declare function createLinearAgentSessionOnIssue(input: {
    readonly api?: LinearApiOptions;
    readonly credentials?: LinearChannelCredentials;
    readonly issueId: string;
    readonly externalLink?: string;
    readonly externalUrls?: readonly LinearExternalUrl[];
}): Promise<LinearAgentSessionRecord>;
/** Creates a proactive Agent Session attached to a Linear root comment. */
export declare function createLinearAgentSessionOnComment(input: {
    readonly api?: LinearApiOptions;
    readonly credentials?: LinearChannelCredentials;
    readonly commentId: string;
    readonly externalLink?: string;
    readonly externalUrls?: readonly LinearExternalUrl[];
}): Promise<LinearAgentSessionRecord>;
/** Reads recent Agent Activities for reconstructing Linear-native HITL replies. */
export declare function listLinearAgentSessionActivities(input: {
    readonly api?: LinearApiOptions;
    readonly credentials?: LinearChannelCredentials;
    readonly agentSessionId: string;
    readonly last?: number;
}): Promise<readonly LinearAgentActivityRecord[]>;
