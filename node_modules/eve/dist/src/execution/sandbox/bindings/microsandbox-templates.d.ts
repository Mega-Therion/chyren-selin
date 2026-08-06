/**
 * Removes stale microsandbox template metadata directories (and their
 * captured snapshots) for one application.
 */
export declare function pruneMicrosandboxTemplates(input: {
    readonly appRoot: string;
    readonly now?: number;
    readonly recentWindowMs?: number;
    readonly retainCount?: number;
}): Promise<void>;
export declare function resolveMicrosandboxTemplateRootPath(cacheDirectory: string, templateKey: string): string;
export declare function resolveMicrosandboxTemplatesDirectory(cacheDirectory: string): string;
export declare function resolveMicrosandboxSessionRootPath(cacheDirectory: string, sessionKey: string): string;
