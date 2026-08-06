import { type ConnectionCatalogEntry, type ConnectionProtocol, type CustomConnectionInput } from "../connections/catalog.js";
import type { PackageJsonMutation } from "./channels.js";
export type ConnectionMutationAction = "created" | "overwritten" | "skipped";
export interface ConnectionMutationResult {
    slug: string;
    protocol: ConnectionProtocol;
    action: ConnectionMutationAction;
    /** Absolute path of the connection module. */
    filePath: string;
    filesWritten: string[];
    filesOverwritten?: string[];
    filesSkipped: string[];
    packageJsonUpdated: PackageJsonMutation[];
    /** Env keys appended to `.env.local` (empty when none were added). */
    envKeysAdded: string[];
    /** Env keys the user must populate for this connection. */
    envKeysRequired: string[];
}
/** A catalog entry or a free-form custom connection. */
export type ConnectionInput = ConnectionCatalogEntry | CustomConnectionInput;
export interface EnsureConnectionOptions {
    projectRoot: string;
    /** File name / connection name. Defaults to `entry.slug`. */
    slug?: string;
    /** Protocol resolved by the flow before scaffolding. */
    protocol: ConnectionProtocol;
    entry: ConnectionInput;
    force?: boolean;
    connectPackageVersion?: string;
}
export interface EnsureConnectionDependenciesOptions {
    projectRoot: string;
    connectPackageVersion?: string;
}
/** Adds the package dependency required by a Connect-auth connection. */
export declare function ensureConnectionDependencies(options: EnsureConnectionDependenciesOptions): Promise<PackageJsonMutation[]>;
/**
 * Scaffolds `agent/connections/<slug>.ts` from a catalog entry or custom
 * input, patching `package.json` for Connect-auth connections and seeding
 * `.env.local` placeholders for static-key connections.
 */
export declare function ensureConnection(options: EnsureConnectionOptions): Promise<ConnectionMutationResult>;
/** Lists authored connection names under `agent/connections/` (file and folder form). */
export declare function listAuthoredConnections(projectRoot: string): Promise<string[]>;
