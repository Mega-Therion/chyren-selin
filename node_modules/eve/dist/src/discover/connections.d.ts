import { type DiscoverDiagnostic } from "#discover/diagnostics.js";
import { type ConnectionSourceRef } from "#discover/manifest.js";
import type { ProjectSource, ProjectSourceEntry } from "#discover/project-source.js";
/**
 * Shared diagnostic emitted when the authored `connections/` root is not a
 * directory.
 */
export declare const DISCOVER_CONNECTIONS_DIRECTORY_INVALID = "discover/connections-directory-invalid";
/**
 * Discovery diagnostic emitted when a connection exists in both file form
 * (`connections/<name>.ts`) and folder form (`connections/<name>/`).
 */
export declare const DISCOVER_CONNECTION_FILE_FOLDER_COLLISION = "discover/connection-file-folder-collision";
/**
 * Discovery diagnostic emitted when a folder-form connection contains no
 * `connection.ts` definition module.
 */
export declare const DISCOVER_CONNECTION_FOLDER_EMPTY = "discover/connection-folder-empty";
/**
 * Result of discovering authored connection sources from a single agent root.
 */
interface DiscoverConnectionSourcesResult {
    connections: ConnectionSourceRef[];
    diagnostics: DiscoverDiagnostic[];
}
/**
 * Discovers authored connections under `agent/connections/`.
 */
export declare function discoverConnectionSources(input: {
    rootEntries: readonly ProjectSourceEntry[];
    rootPath: string;
    source: ProjectSource;
}): Promise<DiscoverConnectionSourcesResult>;
export {};
