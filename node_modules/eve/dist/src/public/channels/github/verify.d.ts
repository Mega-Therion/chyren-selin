import { type GitHubWebhookSecret } from "#public/channels/github/auth.js";
/**
 * Caller-supplied inbound webhook verifier. Use it as an alternative to HMAC
 * verification. For example, Connect supplies a verifier that authenticates
 * Connect-forwarded webhooks with Vercel OIDC instead of GitHub's webhook
 * secret.
 *
 * Contract (matches the other channels' `webhookVerifier`):
 *
 * - **Throw / reject** → the channel responds 401 to GitHub.
 * - **Return a falsy value** (`null` / `undefined` / `false` / `""` / `0`)
 *   → the channel responds 401 to GitHub. This lets verifiers signal
 *   rejection without throwing. For example, Connect's `vercelOidc()` returns
 *   `null` on a failed OIDC check.
 * - **Return a truthy non-string value** → verification accepted.
 * - **Return a string** → verification accepted, and the string replaces
 *   the raw body for downstream parsing.
 */
export type GitHubWebhookVerifier = (request: Request, body: string) => unknown | Promise<unknown>;
/** Options for {@link verifyGitHubRequest}. */
export interface GitHubVerifyOptions {
    readonly webhookSecret?: GitHubWebhookSecret;
    readonly webhookVerifier?: GitHubWebhookVerifier;
}
/**
 * Verifies a GitHub webhook request and returns its raw body. The raw body is
 * required because GitHub signs the exact bytes it delivered.
 *
 * When a {@link GitHubWebhookVerifier} is supplied, it replaces the built-in
 * HMAC check: GitHub's webhook secret is never read and the verifier owns the
 * accept/reject decision.
 */
export declare function verifyGitHubRequest(request: Request, options: GitHubVerifyOptions): Promise<string>;
/** Signs a raw GitHub webhook body for tests and local fixtures. */
export declare function signGitHubWebhookBody(body: string, secret: string): string;
