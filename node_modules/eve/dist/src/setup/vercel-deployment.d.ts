import { captureVercel, type VercelCaptureFailure } from "#setup/primitives/index.js";
import type { VercelProjectReference } from "#setup/project-resolution.js";
declare const verifiedVercelTargetBrand: unique symbol;
export interface ResolvedVercelDeployment {
    readonly provider: "vercel";
    readonly ownerId: string;
    readonly projectId: string;
    readonly projectName: string;
    readonly environment: string;
}
/** Proof that Vercel resolved one exact HTTPS origin under an authenticated scope. */
export interface VerifiedVercelTarget {
    readonly [verifiedVercelTargetBrand]: true;
    readonly origin: `https://${string}`;
    readonly deployment: ResolvedVercelDeployment;
}
export type VercelDeploymentResolutionFailure = {
    readonly cause: "vercel";
    readonly failure: VercelCaptureFailure;
} | {
    readonly cause: "invalid-json" | "invalid-shape";
    readonly message: string;
};
export type VercelDeploymentResolution = {
    readonly kind: "resolved";
    readonly target: VerifiedVercelTarget;
} | {
    readonly kind: "not-found";
} | {
    readonly kind: "forbidden";
} | {
    readonly kind: "project-mismatch";
    readonly expectedProjectId: string;
    readonly actualProjectId: string;
} | {
    readonly kind: "cancelled";
} | {
    readonly kind: "failed";
    readonly failure: VercelDeploymentResolutionFailure;
};
export interface VercelDeploymentResolutionDeps {
    readonly captureVercel: typeof captureVercel;
}
type VercelDeploymentLookupScope = {
    /** An explicit Vercel scope selected for this lookup. */
    readonly scope?: string;
    readonly source?: never;
} | {
    /** A known project source, which also cross-checks the returned project id. */
    readonly scope?: never;
    readonly source: Pick<VercelProjectReference, "orgId" | "projectId">;
};
/** Resolves a Vercel deployment URL to its project and target environment. */
export declare function resolveVercelDeployment(input: {
    readonly workspaceRoot: string;
    readonly host: string;
    readonly signal?: AbortSignal;
    readonly deps?: Partial<VercelDeploymentResolutionDeps>;
} & VercelDeploymentLookupScope): Promise<VercelDeploymentResolution>;
export {};
