/**
 * One concrete file materialized from a workspace seed directory for
 * sandbox template preparation.
 */
interface MaterializedWorkspaceFile {
    readonly content: Buffer;
    readonly path: string;
}
/**
 * Walks a directory tree on disk and returns one entry per file rooted at
 * `/workspace/...`, sorted by path. The directory is treated as the
 * `/workspace` root for the resulting seed file paths.
 */
export declare function materializeWorkspaceDirectory(sourceDirectoryPath: string): Promise<readonly MaterializedWorkspaceFile[]>;
export {};
