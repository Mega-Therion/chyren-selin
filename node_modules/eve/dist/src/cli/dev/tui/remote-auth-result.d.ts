import type { VerifiedVercelTarget } from "#setup/vercel-deployment.js";
export type RemoteAuthCompletedMutation = {
    readonly kind: "vercel-login";
} | {
    readonly kind: "trusted-sources-updated";
    readonly targetProjectName: string;
};
export type RemoteAuthPreparation = {
    readonly kind: "prepared";
    readonly target: VerifiedVercelTarget;
    readonly resolveToken: () => Promise<string>;
    readonly completedMutations: readonly RemoteAuthCompletedMutation[];
} | {
    readonly kind: "cancelled";
    readonly completedMutations: readonly RemoteAuthCompletedMutation[];
} | {
    readonly kind: "failed";
    readonly message: string;
    readonly completedMutations: readonly RemoteAuthCompletedMutation[];
};
/** Human-readable actions that completed and cannot be rolled back automatically. */
export declare function describeRemoteAuthCompletedMutations(completedMutations: readonly RemoteAuthCompletedMutation[]): string[];
/** Adds the mutations that cannot be rolled back to an authentication failure. */
export declare function appendRemoteAuthMutationSummary(message: string, completedMutations: readonly RemoteAuthCompletedMutation[]): string;
/** Formats a Vercel Deployment Protection challenge for the remote TUI. */
export declare function formatRemoteAuthChallengeMessage(serverUrl: string): string;
