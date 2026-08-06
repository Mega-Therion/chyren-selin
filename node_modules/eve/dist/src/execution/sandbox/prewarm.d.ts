import type { SandboxBackend, SandboxBackendPrewarmInput, SandboxBackendPrewarmResult } from "#public/definitions/sandbox-backend.js";
import { type RuntimeCompiledArtifactsSource, type RuntimeDiskCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
import { type ResolvedAgentGraphBundle } from "#runtime/graph.js";
/**
 * Optional dispatch override that intercepts every `backend.prewarm`
 * call. Production code never supplies this; the orchestrator dispatches
 * directly to the backend. Tests inject a recorder to verify which
 * templates the orchestrator emits and what bootstrap calls flow through
 * them.
 */
export type SandboxBackendPrewarmDispatch = (input: {
    readonly backend: SandboxBackend;
    readonly input: SandboxBackendPrewarmInput;
}) => Promise<SandboxBackendPrewarmResult>;
interface PrewarmSandboxesInput {
    readonly appRoot: string;
    readonly compileDirectoryPath: string;
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly graph: ResolvedAgentGraphBundle;
    readonly log?: (message: string) => void;
    readonly dispatch?: SandboxBackendPrewarmDispatch;
    readonly onPrewarmSignature?: (signature: string) => void;
    readonly shouldPrewarmSignature?: (signature: string) => boolean;
}
/**
 * Prewarms every backend sandbox template required by one compiled
 * runtime graph.
 *
 * Iterates every registered sandbox and invokes `backend.prewarm(...)`
 * for each backend template.
 */
export declare function prewarmSandboxes(input: PrewarmSandboxesInput): Promise<void>;
/**
 * Loads the compiled runtime graph for one authored app root and
 * prewarms every backend's sandbox templates required by that graph.
 *
 * Hydrates the module map directly from authored source so callers
 * don't need a pre-existing `module-map.mjs` import in Node's cache.
 * Shared entrypoint for `eve dev` startup, the dev watcher, and the
 * Vercel build hook.
 */
export declare function prewarmAppSandboxes(input: {
    readonly appRoot: string;
    readonly compiledArtifactsSource?: RuntimeCompiledArtifactsSource;
    readonly loadAgentGraph?: (input: Readonly<{
        compiledArtifactsSource: RuntimeDiskCompiledArtifactsSource;
    }>) => Promise<ResolvedAgentGraphBundle>;
    readonly log?: (message: string) => void;
    readonly dispatch?: SandboxBackendPrewarmDispatch;
    readonly onPrewarmSignature?: (signature: string) => void;
    readonly shouldPrewarmSignature?: (signature: string) => boolean;
}): Promise<void>;
/**
 * Loads one built app's bundled compiled artifacts and prewarms the sandbox
 * templates that its production Nitro runtime will request.
 */
export declare function prewarmBuiltAppSandboxes(input: {
    readonly appRoot: string;
    readonly log?: (message: string) => void;
    readonly dispatch?: SandboxBackendPrewarmDispatch;
}): Promise<void>;
export {};
