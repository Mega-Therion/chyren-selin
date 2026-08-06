/**
 * Parses a candidate string into a normalized web URL, or `undefined` if it is
 * not a valid `http(s)` URL. Uses the URL parser rather than a pattern so the
 * accept/reject decision matches what a browser would resolve.
 */
export declare function parseWebUrl(candidate: string): string | undefined;
/**
 * Opens a URL in the user's default browser, best-effort and fire-and-forget.
 * Used where eve owns the hand-off (e.g. pointing the user at their Slack
 * workspace after a deploy) rather than relying on a child CLI to open it. A
 * missing or failing opener is never fatal: callers still print the URL for the
 * user to open by hand.
 */
export declare function openUrl(url: string): void;
