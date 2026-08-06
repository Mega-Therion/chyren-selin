import type { UpdateProjectCustomAllow, UpdateProjectTrustedSources } from "@vercel/sdk/models/updateprojectblock.js";
export type TrustedSourceEnvironmentRule = UpdateProjectCustomAllow;
export interface TrustedSourceProject {
    readonly projectId: string;
    readonly customEnvironmentSlugs: readonly string[];
}
type TrustedSourceAccessPlan = {
    readonly kind: "unchanged";
} | {
    readonly kind: "update";
    readonly trustedSources: UpdateProjectTrustedSources;
};
/**
 * Plans the smallest policy update that lets a project's Development token
 * reach one of that same project's deployment environments.
 */
export declare function planTrustedSourceAccess(input: {
    readonly project: TrustedSourceProject;
    readonly targetEnvironment: string;
    readonly trustedSources?: UpdateProjectTrustedSources;
}): TrustedSourceAccessPlan;
export {};
