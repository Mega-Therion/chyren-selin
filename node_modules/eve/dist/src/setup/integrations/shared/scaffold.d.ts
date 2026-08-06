import { type ChannelSetupLog } from "#setup/cli/index.js";
import { detectPackageManager } from "#setup/package-manager.js";
import { runPackageManagerInstall } from "#setup/primitives/pm/run.js";
/** Effects used to install dependencies added by an integration scaffold. */
export interface IntegrationScaffoldDeps {
    detectPackageManager: typeof detectPackageManager;
    runPackageManagerInstall: typeof runPackageManagerInstall;
}
/** Installs dependencies added by an integration scaffold without failing setup if installation fails. */
export declare function installScaffoldDependencies(input: {
    changed: boolean;
    log: ChannelSetupLog;
    projectPath: string;
    signal?: AbortSignal;
    skip?: boolean;
    deps?: IntegrationScaffoldDeps;
}): Promise<void>;
/** Reports files overwritten by one integration scaffold. */
export declare function reportOverwrittenFiles(log: ChannelSetupLog, files: readonly string[] | undefined): void;
