import type { AgentSourceManifest } from "#discover/manifest.js";
import { type CompiledAgentManifest } from "#compiler/manifest.js";
/**
 * Compiles one discovery manifest into the normalized manifest loaded by the runtime.
 */
export declare function compileAgentManifest(manifest: AgentSourceManifest): Promise<CompiledAgentManifest>;
