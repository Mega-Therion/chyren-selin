/**
 * Returns a scaffold version value, resolving a build-stamp token at the point
 * of need when the running code is unstamped. The published package is stamped
 * by the build (`scripts/stamp-version-tokens.mjs`), so the fallback only ever
 * fires in a dev tree — tsc watch emits and tests running from `src` — where
 * the live workspace catalog *is* the truth the stamp would have captured.
 * Outside a dev tree an unstamped token still throws, because writing the
 * literal token into a scaffolded package.json would break the generated
 * project.
 */
export declare function resolveVersionToken(field: string, value: string): string;
