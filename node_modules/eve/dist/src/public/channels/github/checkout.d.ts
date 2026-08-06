import { type GitHubApiOptions } from "#public/channels/github/api.js";
import { type GitHubChannelCredentials } from "#public/channels/github/auth.js";
import type { SandboxSession } from "#shared/sandbox-session.js";
/** Options for cloning a GitHub repository ref into the active sandbox. */
export interface GitHubCheckoutOptions {
    readonly depth?: number;
    readonly includeBase?: boolean;
    readonly mode?: "full" | "shallow";
    readonly path?: string;
    readonly ref?: string;
}
/** Result returned after a GitHub checkout completes. */
export interface GitHubCheckout {
    readonly baseRef: string | null;
    readonly path: string;
    readonly ref: string;
    readonly sha: string;
}
/** Internal descriptor used by channel-owned checkout paths. */
export interface GitHubCheckoutInput extends GitHubCheckoutOptions {
    readonly api?: GitHubApiOptions;
    readonly baseRef?: string | null;
    readonly baseSha?: string | null;
    readonly credentials?: GitHubChannelCredentials;
    readonly defaultBranch?: string | null;
    readonly headRef?: string | null;
    readonly headSha?: string | null;
    readonly installationId?: number | null;
    readonly owner?: string;
    readonly pullRequestNumber?: number | null;
    readonly repo?: string;
}
/**
 * Clones a described GitHub repository ref into the given sandbox.
 *
 * Runs on every turn via the channel's `turn.started` handler, which resolves
 * the session sandbox from its `ctx` and passes it in. The sandbox persists for
 * the session, so when the workspace is already at the target commit this is a
 * no-op probe — no token is minted and nothing is fetched.
 *
 * The installation token is brokered at the sandbox firewall
 * (`sandbox.setNetworkPolicy`) rather than embedded in the remote URL, so it
 * never enters the sandbox process. Requires a firewall-capable backend; the
 * local backend rejects `setNetworkPolicy`.
 *
 * Channel-internal; not part of the public GitHub channel API.
 */
export declare function checkoutGitHubRepository(sandbox: SandboxSession, input: GitHubCheckoutInput): Promise<GitHubCheckout>;
