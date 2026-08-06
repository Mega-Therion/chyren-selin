import type { PackageManagerKind } from "../../package-manager.js";
import { bunPackageManager } from "./bun.js";
import { npmPackageManager } from "./npm.js";
import { pnpmPackageManager } from "./pnpm.js";
import type { PackageManagerStrategy } from "./types.js";
import { yarnPackageManager } from "./yarn.js";
/** Returns the strategy that owns command and project-file behavior for `kind`. */
export declare function getPackageManagerStrategy(kind: PackageManagerKind): PackageManagerStrategy;
export { bunPackageManager, npmPackageManager, pnpmPackageManager, yarnPackageManager };
export { PNPM_WORKSPACE_CONTENT, PNPM_WORKSPACE_PATH } from "./pnpm.js";
export type { PackageManagerConfigurationResult, PackageManagerConfigurationOptions, PackageManagerInstallOptions, PackageManagerInvocation, PackageManagerStrategy, } from "./types.js";
