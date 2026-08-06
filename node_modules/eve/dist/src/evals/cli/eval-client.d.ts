import { Client } from "#client/client.js";
import type { ClientOptions } from "#client/types.js";
import { type VerifiedRemoteDevelopmentClientDeps } from "#setup/verified-remote-client.js";
import type { EveEvalTargetHandle } from "#evals/types.js";
/**
 * Synchronous {@link ClientOptions} for an eval target: local needs no auth,
 * remote stays anonymous unless `EVE_EVAL_AUTH_TOKEN` sets a static bearer.
 * Ambient Vercel credentials need the async {@link createEvalClient}.
 */
export declare function resolveEvalClientOptions(target: Pick<EveEvalTargetHandle, "kind" | "url">): ClientOptions;
export interface CreateEvalClientOptions {
    /** Working directory for Vercel lookup and the fallback on-disk project link. */
    readonly workspaceRoot?: string;
    /** Test seams for the two authority-resolution boundaries. */
    readonly deps?: Partial<VerifiedRemoteDevelopmentClientDeps>;
}
/** Creates one eval client, authorizing ambient Vercel credentials only after origin proof. */
export declare function createEvalClient(target: Pick<EveEvalTargetHandle, "kind" | "url">, options?: CreateEvalClientOptions): Promise<Client>;
