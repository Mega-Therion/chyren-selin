import type { PackageManagerInvocation } from "./types.js";
export type StandardExecutablePackageManager = "bun" | "npm" | "yarn";
/** Resolves a manager executable, preserving test and package-runner interposition. */
export declare function resolveStandardInvocation(kind: StandardExecutablePackageManager, args: readonly string[]): PackageManagerInvocation;
export declare function applyNoProjectConfiguration(): Promise<{
    filesSkipped: [];
    filesWritten: [];
}>;
