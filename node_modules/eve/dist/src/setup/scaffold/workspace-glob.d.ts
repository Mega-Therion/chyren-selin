export declare function workspaceRelativePath(workspaceRoot: string, projectRoot: string): string;
export declare function isPathInside(parentPath: string, childPath: string): boolean;
export declare function workspacePatternForProject(workspaceRoot: string, projectRoot: string): string;
export declare function workspacePatternClaimsRelativePath(pattern: string, relativePath: string): boolean;
export declare function workspacePatternsClaimProject(patterns: readonly string[], workspaceRoot: string, projectRoot: string): boolean;
