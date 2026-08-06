export type PackageManagerKind = "bun" | "npm" | "pnpm" | "yarn";
/** How a project's package manager was identified, most authoritative first. */
export type PackageManagerSource = "package-manager-field" | "lockfile" | "default";
export interface DetectedPackageManager {
    kind: PackageManagerKind;
    source: PackageManagerSource;
}
/**
 * Resolves a project's package manager from gathered facts: an explicit
 * `packageManager` field wins, then the first known package-manager marker,
 * then pnpm.
 */
export declare function resolvePackageManager(input: {
    packageManagerField?: string;
    lockfiles: readonly string[];
}): DetectedPackageManager;
/**
 * Identifies the package manager that launched the current process from an
 * npm user-agent string. Every manager advertises itself there when running
 * a binary (`npx`, `pnpm dlx`, `yarn dlx`, `bunx`, run-scripts), e.g.
 * `"pnpm/10.4.0 npm/? node/v24.0.0 darwin arm64"` → pnpm. A binary executed
 * directly carries no user agent and yields undefined.
 */
export declare function packageManagerFromUserAgent(userAgent: string | undefined): PackageManagerKind | undefined;
/** Reads {@link packageManagerFromUserAgent} from the process environment. */
export declare function detectInvokingPackageManager(): PackageManagerKind | undefined;
/** Reads package-manager facts from `projectRoot`, then walks ancestors. */
export declare function detectPackageManager(projectRoot: string): Promise<DetectedPackageManager>;
