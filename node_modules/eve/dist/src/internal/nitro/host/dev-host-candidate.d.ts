import type { Nitro } from "nitro/types";
import type { PreparedDevelopmentApplicationHost } from "#internal/nitro/host/types.js";
export interface DevelopmentWorkerPayload {
    readonly entry: string;
    readonly workerData: Readonly<Record<string, unknown>>;
}
/**
 * Builds one host candidate in its invocation-owned workspace and returns the
 * worker payload Nitro emitted for it. The Nitro instance is closed before
 * returning: the payload's entry lives on disk in the workspace, so nothing
 * retains the builder.
 */
export declare function buildDevelopmentHostCandidate(input: {
    readonly host: PreparedDevelopmentApplicationHost;
    readonly nitro: Nitro;
}): Promise<DevelopmentWorkerPayload>;
