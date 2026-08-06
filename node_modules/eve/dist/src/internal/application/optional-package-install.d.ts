import { EVE_DEV_ENV_FLAG, isEveDevEnvironment } from "#internal/application/dev-environment.js";
export { EVE_DEV_ENV_FLAG, isEveDevEnvironment };
export type ProjectPackageManager = "bun" | "npm" | "pnpm" | "yarn";
/**
 * Detects the project's package manager from its lockfile, walking up
 * from `appRoot` so workspace members resolve their monorepo root's
 * manager. Defaults to npm when no lockfile is found.
 */
export declare function detectProjectPackageManager(appRoot: string): ProjectPackageManager;
/**
 * Installs one package into the application as a devDependency using
 * the project's own package manager, so the install is visible in
 * `package.json` and the lockfile. Throws with the captured output when
 * the install fails.
 */
export declare function installPackageIntoProject(input: {
    readonly appRoot: string;
    readonly packageName: string;
}): Promise<void>;
/**
 * Loads an optional engine package, auto-installing it into the
 * project when missing. Installs run only during `eve dev`; any other
 * process fails with the caller-supplied actionable message so
 * production deployments never mutate the application.
 */
export declare function loadOptionalEnginePackage<T>(input: {
    readonly appRoot: string;
    readonly autoInstall: boolean;
    readonly importInstalledModule?: () => Promise<T>;
    readonly importModule: () => Promise<T>;
    readonly missingMessage: string;
    readonly packageName: string;
}): Promise<T>;
/** Imports an optional engine from the application without installing it. */
export declare function importInstalledEnginePackage<T>(input: {
    readonly appRoot: string;
    readonly packageName: string;
}): Promise<T>;
