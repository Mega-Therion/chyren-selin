import type { ClientOptions } from "#client/index.js";
import { type DevelopmentOidcTokenFailure, resolveDevelopmentOidcToken } from "#services/dev-client/request-headers.js";
import { resolveVercelDeployment, type VercelDeploymentResolution } from "./vercel-deployment.js";
/** Dependencies for verifying one remote client (injectable for tests). */
export interface VerifiedRemoteDevelopmentClientDeps {
    readonly resolveVercelDeployment: typeof resolveVercelDeployment;
    readonly resolveDevelopmentOidcToken: typeof resolveDevelopmentOidcToken;
}
/** A verified remote client's options plus a reader for its latest OIDC failure. */
export interface VerifiedRemoteDevelopmentClient {
    readonly deploymentResolution?: VercelDeploymentResolution;
    readonly options: ClientOptions;
    /** OIDC failure from the most recent request, or `undefined` while healthy. */
    readonly lastOidcTokenFailure: () => DevelopmentOidcTokenFailure | undefined;
}
/**
 * Resolves a remote client that emits ambient Vercel credentials only after
 * exact origin proof, plus a reader for the latest OIDC token failure.
 */
export declare function resolveVerifiedRemoteDevelopmentClient(input: {
    readonly headers?: Readonly<Record<string, string>>;
    readonly serverUrl: string;
    readonly signal?: AbortSignal;
    readonly vercelScope?: string;
    readonly workspaceRoot: string;
    readonly deps?: Partial<VerifiedRemoteDevelopmentClientDeps>;
}): Promise<VerifiedRemoteDevelopmentClient>;
