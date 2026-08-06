import { type DiscoverDiagnostic } from "#discover/diagnostics.js";
import { type SandboxSourceRef, type SandboxWorkspaceFolderSourceRef } from "#discover/manifest.js";
import type { ProjectSource, ProjectSourceEntry } from "#discover/project-source.js";
/**
 * Discovery diagnostic emitted when the `sandbox/` folder exists but
 * contains neither a `sandbox.<ext>` module nor a `workspace/`
 * subdirectory. The folder is inert and almost certainly a typo.
 */
export declare const DISCOVER_SANDBOX_FOLDER_EMPTY = "discover/sandbox-folder-empty";
/**
 * Result of discovering the authored sandbox from a single agent root.
 */
interface DiscoverSandboxSourceResult {
    diagnostics: DiscoverDiagnostic[];
    sandbox: SandboxSourceRef | null;
    sandboxWorkspace: SandboxWorkspaceFolderSourceRef | null;
}
/**
 * Discovers the single authored sandbox.
 *
 * Looks for `agent/sandbox/` first; the folder owns the sandbox when
 * it exists (and may carry an authored `workspace/` subtree). If no
 * folder is present, falls back to a top-level `agent/sandbox.<ext>`
 * shorthand for agents that don't need a workspace.
 */
export declare function discoverSandboxSource(input: {
    rootEntries: readonly ProjectSourceEntry[];
    rootPath: string;
    source: ProjectSource;
}): Promise<DiscoverSandboxSourceResult>;
export {};
