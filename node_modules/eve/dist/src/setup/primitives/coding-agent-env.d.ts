/**
 * Environment variables `@vercel/detect-agent@1.2.3` reads as launch markers.
 *
 * Two consumers share this list. Tests that assert a human path delete these
 * from the child environment, because the test runner itself is often launched
 * by a coding agent and the markers would leak into spawned CLIs. And every
 * `vercel` subprocess eve spawns strips them ({@link withoutCodingAgentMarkers}),
 * so the Vercel CLI never sees an agent it would react to — eve drives it
 * explicitly (stdin, flags), and an inherited marker has been observed to turn a
 * read-only `vercel whoami` into a login attempt. The list lives here as the one
 * place that knows the dependency's internals; revisit it when the pinned
 * version changes. (The package also probes `/opt/.devin`, which cannot be
 * masked through the environment.)
 */
export declare const CODING_AGENT_ENV_MARKERS: readonly string[];
/** A copy of `env` with the coding-agent launch markers removed. */
export declare function withoutCodingAgentMarkers(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv;
