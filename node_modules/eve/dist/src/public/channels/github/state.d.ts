import { type GitHubCiWebhookEvent, type GitHubConversationKind, type GitHubConversationRef, type GitHubIssueCommentEvent, type GitHubIssueWebhookEvent, type GitHubPullRequestReviewCommentEvent, type GitHubPullRequestWebhookEvent } from "#public/channels/github/inbound.js";
/**
 * Durable, mutable per-conversation GitHub channel state, persisted as JSON.
 *
 * Which fields are populated depends on `conversationKind`: `review_thread`
 * state sets `reviewCommentId`/`reviewThreadRootCommentId`, issue and PR
 * timeline comments set `triggeringCommentId`, and issue/PR conversations set
 * `issueNumber`/`pullRequestNumber`. See the `stateFrom*` builders for the
 * exact mapping per kind.
 *
 * The checkout-derived fields (`checkoutPath`, `headSha`, `baseRef`) start
 * null. The default `turn.started` handler fills them in once it checks out
 * the repository, which is why the fields are mutable.
 */
export interface GitHubChannelState {
    baseRef: string | null;
    baseSha: string | null;
    checkoutPath: string | null;
    conversationKind: GitHubConversationKind;
    defaultBranch: string | null;
    headRef: string | null;
    headSha: string | null;
    installationId: number | null;
    issueNumber: number | null;
    owner: string;
    pullRequestNumber: number | null;
    repo: string;
    repositoryId: number;
    reviewCommentId: number | null;
    reviewThreadRootCommentId: number | null;
    triggeringCommentId: number | null;
    triggeringUserLogin: string | null;
}
/** Minimal receive target needed to seed GitHub channel state. */
export interface GitHubReceiveStateTarget {
    readonly installationId?: number;
    readonly issueNumber?: number;
    readonly pullRequestNumber?: number;
}
/** Initial empty GitHub channel state. */
export declare function initialGitHubState(): GitHubChannelState;
/** Builds state for an issue or PR timeline comment. */
export declare function stateFromIssueCommentEvent(event: GitHubIssueCommentEvent): GitHubChannelState;
/** Builds state for an inline pull-request review comment. */
export declare function stateFromPullRequestReviewCommentEvent(event: GitHubPullRequestReviewCommentEvent): GitHubChannelState;
/** Builds state for an issue event hook dispatch. */
export declare function stateFromIssueEvent(event: GitHubIssueWebhookEvent): GitHubChannelState;
/** Builds state for a pull-request event hook dispatch. */
export declare function stateFromPullRequestEvent(event: GitHubPullRequestWebhookEvent): GitHubChannelState;
/** Builds pull-request state for a CI event hook dispatch. */
export declare function stateFromCiEvent(event: GitHubCiWebhookEvent): GitHubChannelState;
/** Builds state for proactive `receive()` calls. */
export declare function stateFromReceiveTarget(input: {
    readonly target: GitHubReceiveStateTarget;
    readonly owner: string;
    readonly repo: string;
    readonly repositoryId: number;
}): GitHubChannelState;
/** Reconstructs the channel-local GitHub conversation reference from state. */
export declare function conversationFromState(state: GitHubChannelState): GitHubConversationRef;
/** Builds the channel-local continuation token from durable state. */
export declare function continuationTokenFromState(state: GitHubChannelState): string;
