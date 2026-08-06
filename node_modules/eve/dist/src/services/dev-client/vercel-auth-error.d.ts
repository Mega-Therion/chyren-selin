/**
 * Detection and rendering helpers for the Vercel Deployment Protection
 * "Authentication Required" challenge that fronts protected previews and
 * production deployments.
 *
 * When the eve development client (`eve dev --url …`) targets a deployment
 * that has Deployment Protection enabled and no valid bypass header is
 * attached, Vercel returns an HTML SSO challenge instead of routing the
 * request to the function. The raw HTML body is unhelpful in a CLI
 * context — it dumps a multi-kilobyte page where a one-line directive
 * would do.
 *
 * These helpers let the REPL detect the challenge and render a focused,
 * actionable message instead.
 */
import type { DevelopmentOidcTokenFailure } from "#services/dev-client/request-headers.js";
/** Returns the stable Trusted Sources code embedded in a Vercel error message. */
export declare function vercelTrustedSourcesErrorCode(message: string): string | undefined;
/**
 * Returns `true` for a Vercel Deployment Protection challenge.
 *
 * Accepts both real {@link ClientError} instances and structurally
 * compatible duck-typed errors (`{ status, body, headers }`)
 * so callers can detect the challenge regardless of whether the
 * error survived a network/IPC boundary.
 */
export declare function isVercelAuthChallenge(error: unknown): boolean;
/**
 * Builds the human-readable repair message for the existing dev-client
 * challenge surface, including a structured local OIDC failure when known.
 */
export declare function formatVercelAuthChallengeMessage(input: {
    readonly serverUrl: string;
    readonly oidcTokenFailure?: DevelopmentOidcTokenFailure;
}): string;
export declare function formatDevelopmentOidcTokenFailure(failure: DevelopmentOidcTokenFailure): string;
/**
 * Keeps the actionable Trusted Sources reason and stable error code while
 * dropping Vercel's per-request id. The id is useful in platform logs but is
 * noise in a command result and changes on every retry.
 */
export declare function formatVercelTrustedSourcesFailure(message: string): string;
