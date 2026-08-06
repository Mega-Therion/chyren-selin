import type { ProjectResolution } from "../../project-resolution.js";
import type { VercelAuthStatus } from "../../vercel-project.js";
/** Read-only hosting facts available to channel-owned setup hooks. */
export interface IntegrationSetupEnvironment {
    vercel: {
        kind: "available";
        project: ProjectResolution;
    } | {
        kind: "unavailable";
        reason: Exclude<VercelAuthStatus, "authenticated">;
    };
}
/** Describes the result of the read-only Vercel capability probe. */
export declare function describeIntegrationSetupEnvironment(environment: IntegrationSetupEnvironment): string;
/** Builds channel setup facts from the independent Vercel probes. */
export declare function integrationSetupEnvironment(authStatus: VercelAuthStatus, project: ProjectResolution): IntegrationSetupEnvironment;
