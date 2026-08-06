import { isCodingAgentLaunch } from "#cli/agent-detection.js";
import { detectInvokingPackageManager, detectPackageManager } from "#setup/package-manager.js";
import { runPackageManagerInstall } from "#setup/primitives/index.js";
import { scaffoldExtensionProject } from "#setup/scaffold/index.js";
import { tryInitializeGit } from "./init-git.js";
export interface ExtensionInitCliLogger {
    error(message: string): void;
    log(message: string): void;
}
export interface ExtensionInitCommandDependencies {
    detectInvokingPackageManager: typeof detectInvokingPackageManager;
    detectPackageManager: typeof detectPackageManager;
    isCodingAgentLaunch: typeof isCodingAgentLaunch;
    now: () => number;
    runPackageManagerInstall: typeof runPackageManagerInstall;
    scaffoldExtensionProject: typeof scaffoldExtensionProject;
    tryInitializeGit: typeof tryInitializeGit;
}
/** Same override env as agent `eve init` so CI can pin the eve package specifier. */
export declare const EVE_INIT_PACKAGE_SPEC_ENV = "EVE_INIT_PACKAGE_SPEC";
/**
 * Creates a new eve extension package. Same install/git flow as agent `eve init`,
 * but always create-only and prints next steps instead of starting `eve dev`.
 */
export declare function runExtensionInitCommand(logger: ExtensionInitCliLogger, parentDirectory: string, target: string | undefined, dependencies?: ExtensionInitCommandDependencies): Promise<void>;
