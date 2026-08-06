import type { CompiledAgentManifest } from "#compiler/manifest.js";
import { type VercelEveAgentSummary } from "#internal/vercel-agent-summary.js";
/**
 * Builds the public {@link VercelEveAgentSummary} from a compiled agent
 * manifest. The result is the stable contract Vercel ingests from the
 * deployment build output — see {@link emitVercelAgentSummary} for the
 * write-out side.
 */
export declare function buildVercelAgentSummary(input: {
    manifest: CompiledAgentManifest;
    generatorVersion?: string;
}): VercelEveAgentSummary;
/**
 * Writes the agent summary file. Returns the absolute path of the
 * written file.
 *
 * On Vercel deployments, the build container's
 * `upload-eve-agent-summary.ts` helper picks up this file from
 * `rootPath` (which equals `appRoot` for the project being built) and
 * uploads it to `<projectId>/<deploymentId>/eve_agent_summary.json` as
 * a top-level deployment artifact — the same tier as
 * `deploy_metadata.json` and `turbo_summary.json`. The dashboard reads
 * it through the dedicated
 * `/v6/deployments/:id/files/eve-agent-summary` endpoint.
 *
 * For self-hosted setups (no Vercel build container in the loop), the
 * file simply sits on disk at the same path. Operators wire it up to
 * whatever surface they want.
 */
export declare function emitVercelAgentSummary(input: {
    manifest: CompiledAgentManifest;
    generatorVersion?: string;
    outputPath: string;
}): Promise<string>;
