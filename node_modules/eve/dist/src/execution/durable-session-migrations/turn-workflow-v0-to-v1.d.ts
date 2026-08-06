/**
 * Turn workflow input v0 → v1 migration.
 *
 * Before versioning, the driver wrote a flat, unversioned run input;
 * `runMigrationChain` reads that as version 0 (via its `initialVersion`
 * option) and this lifts the flat shape into the nested v1 input. The
 * reshape is inlined rather than delegating to `createTurnWorkflowInput`,
 * so the historical transform stays frozen as the live dispatch
 * constructor evolves.
 */
import type { VersionMigration } from "./chain.js";
export declare const turnWorkflowInputV0ToV1: VersionMigration;
