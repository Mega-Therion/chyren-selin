/**
 * Outcome of round-tripping an `AI_GATEWAY_API_KEY` against the Vercel AI
 * Gateway.
 *
 * - `valid`: the gateway accepted the key.
 * - `invalid`: the gateway rejected the key (authentication failure).
 * - `inconclusive`: the check itself failed (offline, timeout). The caller can
 *   save the key anyway rather than block on a flaky network. Only an explicit
 *   rejection counts as a wrong key.
 */
export type GatewayKeyValidation = {
    kind: "valid";
} | {
    kind: "invalid";
    message: string;
} | {
    kind: "inconclusive";
    message: string;
};
/**
 * Confirms an `AI_GATEWAY_API_KEY` authenticates before eve saves it, by making
 * one account-scoped request to the gateway (`getCredits`). That endpoint
 * rejects a bad key with a 401; the model catalog (`getAvailableModels`) is
 * public and would accept any key, so it cannot validate.
 *
 * Aborts with the caller's `signal` (so the dev TUI's Esc/Ctrl-C interrupt
 * cancels it like any other loading state); a user-initiated abort is rethrown,
 * while a timeout or network failure resolves to `inconclusive`.
 */
export declare function validateGatewayApiKey(apiKey: string, signal?: AbortSignal): Promise<GatewayKeyValidation>;
