/** Maximum body length accepted by GitHub issue and pull-request comments. */
export declare const GITHUB_COMMENT_BODY_MAX_LENGTH = 65536;
/** Splits a long comment body into GitHub-sized comment bodies. */
export declare function splitGitHubCommentBody(body: string, maxLength?: number): readonly string[];
