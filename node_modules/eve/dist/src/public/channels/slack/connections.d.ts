/**
 * Slack rendering for `authorization.*` events.
 *
 * The framework emits these when a tool call needs the user to complete
 * an OAuth-style authorization flow (e.g. signing in to Linear). The
 * challenge is a credential: anyone in a shared thread could complete a
 * posted sign-in link and bind their own identity to the session. The
 * default handler therefore posts a link-free public status while
 * delivering the actual challenge as an ephemeral "Sign in with X"
 * message visible only to the triggering user.
 *
 * When no user can be targeted (no triggering user id, no challenge
 * URL, or the ephemeral delivery fails), the public status still leaves
 * the shared thread with safe progress feedback. The matching
 * `authorization.completed` handler edits that status post in place to
 * surface the outcome (`authorized` / `declined` / `failed` /
 * `timed-out`).
 */
import type { ConnectionAuthorizationOutcome } from "#protocol/message.js";
export type { ConnectionAuthorizationOutcome };
/**
 * Title-cases a connection name (`linear` → `Linear`) for display. Empty
 * strings pass through unchanged so the renderer never emits an empty
 * label inside a sentence.
 */
export declare function formatConnectionDisplayName(connectionName: string): string;
/**
 * Public status text for an authorization challenge. Deliberately
 * link-free: it must stay safe to post in a shared thread. When the
 * channel cannot identify a triggering user (rare — schedule-initiated
 * sessions or events that lack actor metadata) the text drops the
 * "Connect with" call-to-action since there's no one to act on it.
 */
export declare function buildAuthRequiredPublicText(input: {
    readonly displayName: string;
    readonly hasUser: boolean;
}): string;
/**
 * Final-state markdown for the public status message. Edited in place by
 * `authorization.completed` so the thread sees resolution without
 * scrolling.
 */
export declare function buildAuthCompletedText(input: {
    readonly displayName: string;
    readonly outcome: ConnectionAuthorizationOutcome;
    readonly reason?: string;
}): string;
/**
 * Block Kit blocks for the ephemeral "Sign in with X" link button.
 * Device-code flows carry a `userCode` the user must enter after
 * following the link, so it is rendered alongside the button. Slack
 * ephemerals accept the same block list shape as regular messages so the
 * helper returns blocks directly.
 */
export declare function buildAuthEphemeralBlocks(input: {
    readonly displayName: string;
    readonly url: string;
    readonly userCode?: string;
}): unknown[];
