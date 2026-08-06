import type { NodeEngineOverride } from "../node-engine.js";
import type { PackageManagerKind } from "../package-manager.js";
import type { PackageJsonPatchResult } from "./update/package-json.js";
export interface WorkspaceRootMutation {
    kind: "package-json" | "workspace-config";
    nodeEngineOverride?: NodeEngineOverride;
    path: string;
}
export interface WorkspaceRootPackageJsonPatchResult extends PackageJsonPatchResult {
    /** Root package.json path when an ancestor workspace root was eligible for patching. */
    path?: string;
}
export declare function isPackageManagerWorkspaceMember(packageManager: PackageManagerKind, projectRoot: string): boolean;
/** Applies root-only package.json fields to an ancestor workspace package.json. */
export declare function patchWorkspaceRootPackageJson(packageManager: PackageManagerKind, projectRoot: string, input: {
    readonly aiPackageVersion?: string;
    readonly nodeEngineRequirement?: string;
    readonly onWorkspaceRootMutation?: (mutation: WorkspaceRootMutation) => void | Promise<void>;
}): Promise<WorkspaceRootPackageJsonPatchResult>;
/** Applies manager-owned project files and reports ancestor workspace mutations. */
export declare function applyPackageManagerWorkspaceConfiguration(input: {
    readonly packageManager: PackageManagerKind;
    readonly projectRoot: string;
    readonly workspaceProbeRoot?: string;
    readonly onWorkspaceRootMutation?: (mutation: WorkspaceRootMutation) => void | Promise<void>;
}): Promise<{
    filesSkipped: string[];
    filesWritten: string[];
}>;
