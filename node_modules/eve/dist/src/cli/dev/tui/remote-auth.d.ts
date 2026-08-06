import { resolveDevelopmentOidcToken } from "#services/dev-client/request-headers.js";
import { runLoginFlow } from "#setup/flows/login.js";
import type { Prompter } from "#setup/prompter.js";
import { pickTeam } from "#setup/vercel-project.js";
import { resolveVercelDeployment } from "#setup/vercel-deployment.js";
import { applyVercelTrustedSourceAccess, prepareVercelTrustedSourceAccess } from "./vercel-trusted-sources.js";
import { type RemoteAuthPreparation } from "./remote-auth-result.js";
/** Injectable entry point for the remote authentication flow. */
export type RemoteAuthFlow = typeof runRemoteAuthFlow;
export interface RemoteAuthFlowDeps {
    readonly runLoginFlow: typeof runLoginFlow;
    readonly pickTeam: typeof pickTeam;
    readonly resolveVercelDeployment: typeof resolveVercelDeployment;
    readonly resolveOidcToken: typeof resolveDevelopmentOidcToken;
    readonly prepareVercelTrustedSourceAccess: typeof prepareVercelTrustedSourceAccess;
    readonly applyVercelTrustedSourceAccess: typeof applyVercelTrustedSourceAccess;
}
/**
 * Authenticates an interactive client for a remote Vercel deployment.
 *
 * Resolves the deployment's owning project, optionally configures Trusted
 * Sources after user approval, and returns a renewable project-scoped OIDC
 * credential. Callers must pass a TTY-backed {@link Prompter}; cancelled and
 * failed flows are returned as results rather than thrown.
 */
export declare function runRemoteAuthFlow(input: {
    readonly workspaceRoot: string;
    readonly serverUrl: string;
    readonly configureTrustedSources?: boolean;
    readonly prompter: Prompter;
    readonly signal?: AbortSignal;
    readonly deps?: Partial<RemoteAuthFlowDeps>;
}): Promise<RemoteAuthPreparation>;
