import type { SandboxBackendTags } from "#public/definitions/sandbox-backend.js";
import { type RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
import type { RuntimeSandboxRegistry } from "#runtime/sandbox/registry.js";
import type { SandboxAccess, SandboxState } from "#sandbox/state.js";
/**
 * Input for creating or reattaching the live sandbox for one step execution.
 */
export interface EnsureSandboxAccessInput {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly nodeId: string;
    readonly registry: RuntimeSandboxRegistry;
    readonly sessionId: string;
    readonly runOnSession?: (callback: () => Promise<void>) => Promise<void>;
    readonly state: SandboxState | null;
    readonly tags?: SandboxBackendTags;
}
/**
 * Creates or reattaches the live sandbox from the compiled agent bundle's
 * registry and persisted session state, returning a {@link SandboxAccess}
 * suitable for the runtime context.
 *
 * Every agent has exactly one sandbox. The sandbox carries its own
 * `SandboxBackend` value (resolved from the authored module or
 * substituted with `defaultSandbox()` when omitted), and the runtime
 * simply calls `backend.create(...)`.
 */
export declare function ensureSandboxAccess(input: EnsureSandboxAccessInput): Promise<SandboxAccess>;
