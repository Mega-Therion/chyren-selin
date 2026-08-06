import { captureVercel } from "#setup/primitives/index.js";
import type { Prompter } from "#setup/prompter.js";
import type { VerifiedVercelTarget } from "#setup/vercel-deployment.js";
type VercelTrustedSourcePreparation = {
    readonly kind: "unchanged";
} | {
    readonly kind: "approved";
    readonly grant: VercelTrustedSourceGrant;
} | {
    readonly kind: "cancelled";
} | {
    readonly kind: "failed";
    readonly message: string;
};
type VercelTrustedSourceApplication = {
    readonly kind: "unchanged";
} | {
    readonly kind: "updated";
    readonly targetProjectName: string;
} | {
    readonly kind: "failed";
    readonly message: string;
};
export interface VercelTrustedSourceGrant {
    readonly ownerId: string;
    readonly projectId: string;
    readonly projectName: string;
    readonly targetEnvironment: string;
}
export interface VercelTrustedSourceDeps {
    readonly captureVercel: typeof captureVercel;
}
/** Confirms a Trusted Sources grant for one verified target project. */
export declare function prepareVercelTrustedSourceAccess(input: {
    readonly workspaceRoot: string;
    readonly target: VerifiedVercelTarget;
    readonly prompter: Prompter;
    readonly signal?: AbortSignal;
    readonly deps?: Partial<VercelTrustedSourceDeps>;
}): Promise<VercelTrustedSourcePreparation>;
/** Applies an approved grant against the target project's latest policy. */
export declare function applyVercelTrustedSourceAccess(input: {
    readonly workspaceRoot: string;
    readonly grant: VercelTrustedSourceGrant;
    readonly signal?: AbortSignal;
    readonly deps?: Partial<VercelTrustedSourceDeps>;
}): Promise<VercelTrustedSourceApplication>;
export {};
