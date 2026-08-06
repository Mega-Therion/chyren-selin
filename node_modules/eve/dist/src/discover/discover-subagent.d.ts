import { type DiscoverDiagnostic } from "#discover/diagnostics.js";
import { type SubagentSourceRef } from "#discover/manifest.js";
import { type ProjectSource } from "#discover/project-source.js";
/**
 * Diagnostics emitted while discovering subagent source graphs.
 */
export declare const DISCOVER_LOCAL_SUBAGENT_SCHEDULES_INVALID = "discover/local-subagent-schedules-invalid";
export declare const DISCOVER_REQUIRED_SUBAGENT_CONFIG_MODULE_MISSING = "discover/required-subagent-config-module-missing";
export declare const DISCOVER_SUBAGENTS_DIRECTORY_INVALID = "discover/subagents-directory-invalid";
/**
 * Input for discovering subagent entries beneath one authored source root.
 */
interface DiscoverSubagentsInput {
    agentRoot: string;
    appRoot: string;
    /**
     * Optional {@link ProjectSource} used for all filesystem reads. Defaults
     * to a disk-backed source so disk callers keep their current behaviour.
     */
    source?: ProjectSource;
    subagentsDirectoryPath?: string;
    subagentsLogicalPath?: string;
}
/**
 * Result of discovering local subagent packages.
 */
interface DiscoverSubagentsResult {
    diagnostics: DiscoverDiagnostic[];
    subagents: SubagentSourceRef[];
}
/**
 * Discovers local subagent packages recursively without importing authored
 * modules.
 */
export declare function discoverSubagents(input: DiscoverSubagentsInput): Promise<DiscoverSubagentsResult>;
export {};
