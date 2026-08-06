interface GitMetadata {
    readonly branch?: string;
    readonly sha?: string;
}
/**
 * Resolves local git metadata for the eval run context.
 *
 * Used to populate `repoInfo` on the Braintrust experiment so the dashboard
 * shows which sha/branch produced the run. This describes the eval code,
 * not the remote target.
 *
 * Returns an empty object when git is unavailable or the directory is
 * not a git repository.
 */
export declare function resolveLocalGitMetadata(cwd: string): GitMetadata;
export {};
