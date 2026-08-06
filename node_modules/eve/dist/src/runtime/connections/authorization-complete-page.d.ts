/**
 * Renders the static HTML landing page that the user's browser sees
 * after an OAuth IdP redirects back to the framework's connection
 * callback route.
 *
 * The framework would otherwise respond with an empty `202 Accepted`
 * body, which looks broken. This helper is intentionally self-contained:
 * no external assets, no script, so it renders identically regardless
 * of where the runtime serves the callback from.
 */
export declare function buildAuthorizationCompletePage(): Response;
