import { prewarmAppSandboxes } from "#execution/sandbox/prewarm.js";
type PrewarmAppSandboxesInput = Parameters<typeof prewarmAppSandboxes>[0];
/**
 * Vercel build-time sandbox prewarm hook. Failures here are treated as
 * build failures because the same sandbox bootstrap would otherwise
 * break at runtime.
 *
 * Returns `true` after validating a Vercel build's template requirements,
 * `false` outside a Vercel build.
 */
export declare function runVercelBuildPrewarm(input: PrewarmAppSandboxesInput): Promise<boolean>;
export {};
