import type { ModuleSourceRef } from "#shared/source-ref.js";
import type { DiscoverDiagnostic } from "#discover/diagnostics.js";
import type { ProjectSource, ProjectSourceEntry } from "#discover/project-source.js";
/**
 * Diagnostic emitted when the authored `lib/` root exists but is not a
 * directory.
 */
export declare const DISCOVER_LIB_DIRECTORY_INVALID = "discover/lib-directory-invalid";
/**
 * Diagnostic emitted when discovery finds an unsupported entry under the
 * authored `lib/` tree.
 */
export declare const DISCOVER_LIB_ENTRY_UNSUPPORTED = "discover/lib-entry-unsupported";
/**
 * Input for discovering authored helper modules under `lib/`.
 */
interface DiscoverLibSourcesInput {
    agentRoot: string;
    rootEntries: readonly ProjectSourceEntry[];
    source: ProjectSource;
}
/**
 * Result of recursively discovering authored helper modules under `lib/`.
 */
interface DiscoverLibSourcesResult {
    diagnostics: DiscoverDiagnostic[];
    lib: ModuleSourceRef[];
}
/**
 * Discovers module-only helper sources under `lib/` without executing
 * authored modules.
 */
export declare function discoverLibSources(input: DiscoverLibSourcesInput): Promise<DiscoverLibSourcesResult>;
export {};
