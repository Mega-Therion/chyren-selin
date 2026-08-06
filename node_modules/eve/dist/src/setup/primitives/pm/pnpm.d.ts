export declare const PNPM_WORKSPACE_PATH = "pnpm-workspace.yaml";
export declare const PNPM_WORKSPACE_MEMBERSHIP_ARGUMENTS: readonly ["list", "--depth", "-1", "--json"];
export declare const PNPM_WORKSPACE_CONTENT: string;
/** Whether pnpm can walk from this project into a parent-owned workspace. */
export declare function findAncestorPnpmWorkspaceRoot(projectRoot: string): string | undefined;
/** Whether pnpm can walk from this project into a parent-owned workspace. */
export declare function hasAncestorPnpmWorkspace(projectRoot: string): boolean;
/**
 * Returns the ancestor workspace root only when the workspace manifest's
 * package candidates include `projectRoot`. If the manifest cannot be parsed,
 * it is treated as a workspace owner so setup does not silently create nested
 * standalone package-manager state in an ambiguous monorepo.
 */
export declare function findClaimingAncestorPnpmWorkspaceRoot(projectRoot: string): string | undefined;
export declare function ensurePnpmWorkspaceIncludesProject(projectRoot: string): Promise<"skipped" | "written">;
/**
 * Reads `pnpm list --depth -1 --json` and answers whether the ancestor
 * workspace explicitly includes `projectRoot`. `undefined` means the output
 * was not trustworthy enough to choose an install mode.
 */
export declare function pnpmWorkspaceClaimsProject(stdout: string, projectRoot: string): boolean | undefined;
export declare const pnpmPackageManager: {
    kind: "pnpm";
    scaffoldFiles: {
        "pnpm-workspace.yaml": string;
    };
    applyProjectConfiguration(projectRoot: string, options: import("./types.js").PackageManagerConfigurationOptions | undefined): Promise<{
        filesSkipped: never[];
        filesWritten: string[];
    } | {
        filesSkipped: string[];
        filesWritten: never[];
    }>;
    devArguments: () => string[];
    installArguments: (options: import("./types.js").PackageManagerInstallOptions) => string[];
    prepareArguments: (projectRoot: string, args: readonly string[]) => string[];
    resolveInvocation(args: readonly string[]): {
        args: readonly string[];
        command: string;
        shell: boolean;
    } | {
        shell?: undefined;
        args: readonly string[];
        command: string;
    };
};
