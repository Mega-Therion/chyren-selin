import { DrainedNitroDevServer } from "#internal/nitro/host/drained-nitro-dev-server.js";
import type { PreparedDevelopmentApplicationHost } from "#internal/nitro/host/types.js";
export type DevelopmentRebuildKind = "structural" | "unchanged" | "runtime";
/**
 * Raised when generation activation fails after the replacement worker has
 * already been swapped in. The server keeps serving on the new worker with
 * the previous generation; the next rebuild retries activation.
 */
export declare class PostCommitDevelopmentRebuildError extends Error {
    constructor(cause: unknown);
}
/**
 * Raised when an authored reload changes which process owns the Workflow
 * World. That ownership is fixed when the development server starts, so the
 * existing server must keep serving until the user restarts it.
 */
export declare class DevelopmentWorkflowWorldChangeRequiresRestartError extends Error {
    constructor();
}
export interface DevelopmentRebuildResult {
    readonly host: PreparedDevelopmentApplicationHost;
    readonly kind: DevelopmentRebuildKind;
}
export interface DevelopmentAuthoredRebuildCoordinator {
    rebuild(input: {
        readonly changedPaths: readonly string[];
    }): Promise<DevelopmentRebuildResult>;
}
export declare function createDevelopmentAuthoredRebuildCoordinator(input: {
    readonly devServer: DrainedNitroDevServer;
    readonly initialHost: PreparedDevelopmentApplicationHost;
}): Promise<DevelopmentAuthoredRebuildCoordinator>;
