/**
 * Minimal GitHub REST/GraphQL wrapper used by the GitHub channel.
 *
 * eve exposes channel-owned helper types and functions instead of leaking a
 * third-party SDK through public channel APIs.
 */
import { type GitHubAuthApiOptions, type GitHubChannelCredentials } from "#public/channels/github/auth.js";
import { type JsonObject } from "#shared/json.js";
/** JSON object accepted by GitHub helper calls. */
export type GitHubJsonObject = JsonObject;
/** HTTP methods supported by the low-level GitHub request helper. */
export type GitHubApiMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
/**
 * Transport options for GitHub API calls: `apiBaseUrl` (defaults to
 * `https://api.github.com`) and a custom `fetch` (defaults to the global
 * `fetch`).
 */
export interface GitHubApiOptions extends GitHubAuthApiOptions {
}
/** Options for {@link GitHubHandle.request}. */
export interface GitHubRequestOptions {
    readonly auth?: boolean;
    readonly headers?: Readonly<Record<string, string>>;
    readonly installationId?: number;
}
/**
 * Successful (2xx) GitHub API response; non-2xx throws {@link GitHubApiError},
 * so `ok` is always true here. `T` is the parsed JSON body type.
 */
export interface GitHubApiResponse<T = unknown> {
    readonly body: T;
    readonly ok: boolean;
    readonly status: number;
}
/** Error thrown for non-2xx GitHub REST and GraphQL responses. */
export declare class GitHubApiError extends Error {
    readonly body: unknown;
    readonly method: string;
    readonly path: string;
    readonly status: number;
    constructor(input: {
        readonly body: unknown;
        readonly method: string;
        readonly path: string;
        readonly status: number;
    });
}
/** Body accepted by GitHub comment-writing helpers. */
export interface GitHubCommentBody {
    readonly body: string;
}
/**
 * Posted-comment result from thread helpers. `id` is the GitHub comment id (0 if
 * absent), `htmlUrl`/`url` are undefined when GitHub omits them, and `raw` holds
 * the untyped original response for escape-hatch access.
 */
export interface GitHubPostedComment {
    readonly htmlUrl: string | undefined;
    readonly id: number;
    readonly raw: unknown;
    readonly url: string | undefined;
}
/** GitHub reaction contents supported by the Reactions REST API. */
export type GitHubReactionContent = "+1" | "-1" | "confused" | "eyes" | "heart" | "hooray" | "laugh" | "rocket";
interface GitHubResourceInput {
    readonly api?: GitHubApiOptions;
    readonly credentials?: GitHubChannelCredentials;
    readonly installationId?: number;
    readonly owner: string;
    readonly repo: string;
}
/**
 * Calls a GitHub REST API path with installation-token auth by default. Pass
 * `options.auth: false` for unauthenticated reads.
 */
export declare function callGitHubApi<T = unknown>(input: {
    readonly api?: GitHubApiOptions;
    readonly body?: GitHubJsonObject;
    readonly credentials?: GitHubChannelCredentials;
    readonly installationId?: number;
    readonly method: GitHubApiMethod;
    readonly path: string;
    readonly options?: GitHubRequestOptions;
}): Promise<GitHubApiResponse<T>>;
/** Creates an issue or PR timeline comment. */
export declare function createGitHubIssueComment(input: GitHubResourceInput & {
    readonly body: string | GitHubCommentBody;
    readonly issueNumber: number;
}): Promise<GitHubPostedComment>;
/** Updates an issue or PR timeline comment. */
export declare function updateGitHubIssueComment(input: GitHubResourceInput & {
    readonly body: string | GitHubCommentBody;
    readonly commentId: number;
}): Promise<GitHubPostedComment>;
/** Replies to an inline pull-request review comment thread. */
export declare function createGitHubReviewCommentReply(input: GitHubResourceInput & {
    readonly body: string | GitHubCommentBody;
    readonly commentId: number;
    readonly pullRequestNumber: number;
}): Promise<GitHubPostedComment>;
/** Updates an inline pull-request review comment or reply. */
export declare function updateGitHubPullRequestReviewComment(input: GitHubResourceInput & {
    readonly body: string | GitHubCommentBody;
    readonly commentId: number;
}): Promise<GitHubPostedComment>;
/** Creates a pull-request review. */
export declare function createGitHubPullRequestReview(input: GitHubResourceInput & {
    readonly body: GitHubJsonObject;
    readonly pullRequestNumber: number;
}): Promise<GitHubApiResponse>;
/** Creates an inline pull-request review comment. */
export declare function createGitHubPullRequestReviewComment(input: GitHubResourceInput & {
    readonly body: GitHubJsonObject;
    readonly pullRequestNumber: number;
}): Promise<GitHubPostedComment>;
/** Minimal pull-request metadata returned by {@link getGitHubPullRequest}. */
export interface GitHubPullRequestDetails {
    readonly additions: number | undefined;
    readonly author: GitHubPullRequestUser | undefined;
    readonly base: GitHubPullRequestRefDetails;
    readonly body: string | undefined;
    readonly changedFiles: number | undefined;
    readonly defaultBranch: string | undefined;
    readonly deletions: number | undefined;
    readonly draft: boolean;
    readonly head: GitHubPullRequestRefDetails;
    readonly htmlUrl: string | undefined;
    readonly mergeable: boolean | null | undefined;
    readonly number: number;
    readonly raw: unknown;
    readonly state: string | undefined;
    readonly title: string;
}
/** Minimal pull-request author metadata. */
export interface GitHubPullRequestUser {
    readonly id: number;
    readonly login: string;
    readonly type: string;
}
/** Minimal pull-request branch metadata. */
export interface GitHubPullRequestRefDetails {
    readonly ref: string | undefined;
    readonly repoFullName: string | undefined;
    readonly sha: string | undefined;
}
/** Fetches pull-request metadata for context injection and checkout resolution. */
export declare function getGitHubPullRequest(input: GitHubResourceInput & {
    readonly pullRequestNumber: number;
}): Promise<GitHubPullRequestDetails>;
/** Minimal pull-request file metadata returned by {@link listGitHubPullRequestFiles}. */
export interface GitHubPullRequestFile {
    readonly additions: number | undefined;
    readonly changes: number | undefined;
    readonly deletions: number | undefined;
    readonly filename: string;
    readonly patch: string | undefined;
    readonly status: string | undefined;
}
/** Lists files changed by a pull request. */
export declare function listGitHubPullRequestFiles(input: GitHubResourceInput & {
    readonly perPage?: number;
    readonly pullRequestNumber: number;
}): Promise<readonly GitHubPullRequestFile[]>;
/** Lists files changed between two commits (three-dot compare). */
export declare function listGitHubCompareFiles(input: GitHubResourceInput & {
    readonly baseSha: string;
    readonly headSha: string;
}): Promise<readonly GitHubPullRequestFile[]>;
/** Creates a reaction on a GitHub issue or review comment. */
export declare function createGitHubReaction(input: GitHubResourceInput & {
    readonly commentId: number;
    readonly content: GitHubReactionContent;
    readonly subject: "issue_comment" | "pull_request_review_comment";
}): Promise<GitHubApiResponse>;
/** Fetches repository metadata, primarily to resolve `repository.id` for receive(). */
export declare function getGitHubRepository(input: GitHubResourceInput & {
    readonly auth?: boolean;
}): Promise<{
    readonly id: number;
    readonly defaultBranch: string | undefined;
}>;
export {};
