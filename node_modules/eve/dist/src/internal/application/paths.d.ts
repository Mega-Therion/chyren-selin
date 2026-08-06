export declare const EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY_ENV = "EVE_INTERNAL_BUILD_OUTPUT_DIRECTORY";
export declare const EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY_ENV = "EVE_INTERNAL_HOST_BUILD_OUTPUT_DIRECTORY";
export interface ApplicationInfo {
    appRoot: string;
    outputDir: string;
    workflowId: string;
    workflowBuildDir: string;
    workflowSourceDir: string;
}
/**
 * Resolves an application root from the current working directory.
 */
export declare function resolveApplicationRoot(cwd?: string): string;
/**
 * Reports whether the current process is running inside a Vercel build or
 * deployment. Vercel sets `VERCEL` in both build and runtime environments, so
 * this is the canonical signal for "managed by Vercel" versus self-hosted.
 */
export declare function isVercelBuildEnvironment(): boolean;
/**
 * Resolves the programmatic Nitro build directory for an app.
 */
export declare function resolveNitroBuildDirectory(appRoot: string): string;
export declare function resolveApplicationHostArtifactsDirectory(appRoot: string): string;
/**
 * Resolves the package-owned Workflow DevKit bundle directory for a target app.
 *
 * This directory is intentionally placed under the package root rather than the
 * application root so package-owned workflow caches are shared across generated
 * app roots without relying on app-local installed dependencies.
 *
 * Each application root receives a unique hash-keyed subdirectory so parallel
 * builds targeting different app roots never collide. The key is derived from
 * `appRoot` alone — version-keyed dirs are intentionally avoided so every code
 * path that resolves a cache directory converges on the same location and
 * `prepareEveVersionedCacheDirectory` remains the single source of truth for
 * version-based invalidation.
 */
export declare function resolveWorkflowBuildDirectory(appRoot: string): string;
/**
 * Resolves the cache directory used for durable local sandbox snapshots.
 */
export declare function resolveSandboxCacheDirectory(appRoot: string): string;
/**
 * Resolves the production Nitro output directory for an app.
 */
export declare function resolveOutputDirectory(appRoot: string): string;
/**
 * Returns structured app information for diagnostics and CLI output.
 */
export declare function getApplicationInfo(appRoot: string): ApplicationInfo;
