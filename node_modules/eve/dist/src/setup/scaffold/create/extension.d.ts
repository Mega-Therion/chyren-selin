import type { PackageManagerKind } from "../../package-manager.js";
import { type WorkspaceRootMutation } from "../workspace-root.js";
import { type EvePackageContract } from "./project.js";
export interface ScaffoldExtensionProjectOptions {
    projectName: string;
    /**
     * The manager that owns command execution and manager-specific generated
     * project files for this scaffold. Defaults to pnpm.
     */
    packageManager?: PackageManagerKind;
    targetDirectory?: string;
    overwriteExisting?: boolean;
    onOverwriteFile?: (filePath: string) => void | Promise<void>;
    evePackage?: EvePackageContract;
    zodPackageVersion?: string;
    typescriptPackageVersion?: string;
    /**
     * Final project path used to discover ancestor workspaces. This differs from
     * the write target only when the CLI stages a scaffold before moving it into
     * place.
     */
    workspaceProbeDirectory?: string;
    onWorkspaceRootMutation?: (mutation: WorkspaceRootMutation) => void | Promise<void>;
}
/**
 * Scaffolds a standalone eve extension package: `extension/extension.ts`, package
 * metadata (`eve.extension`, peer+dev `eve`, zod), and TypeScript config. Does
 * not write sample tools — authors add contributions under `extension/` themselves.
 */
export declare function scaffoldExtensionProject(options: ScaffoldExtensionProjectOptions): Promise<string>;
