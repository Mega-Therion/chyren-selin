import { type RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
import type { RuntimeSandboxTemplatePlan } from "#runtime/sandbox/template-plan.js";
/**
 * Input for deriving the stable runtime keys used for one sandbox definition.
 */
interface CreateRuntimeSandboxKeysInput {
    readonly backendName: string;
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly nodeId: string;
    readonly sessionId: string;
    readonly sourceId: string;
    readonly templatePlan: RuntimeSandboxTemplatePlan;
}
/**
 * Creates the stable runtime template and session keys for one sandbox
 * definition under the current artifact source and backend.
 *
 * Both keys derive from one {@link RuntimeSandboxKeyParts} value, so the
 * coupling holds by construction: the session key rotates exactly when
 * the template content rotates.
 */
export declare function createRuntimeSandboxKeys(input: CreateRuntimeSandboxKeysInput): Promise<{
    readonly sessionKey: string;
    readonly templateKey: string | null;
}>;
/**
 * Creates the stable reusable template key for one sandbox definition,
 * or `null` when the sandbox should start from a fresh backend runtime.
 *
 * The template key factors in the graph `nodeId` so that two
 * runtime agents (root and subagents) do not collide on the same
 * template when they each own a sandbox authored at the same logical
 * path.
 */
export declare function createRuntimeSandboxTemplateKey(input: {
    readonly backendName: string;
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly nodeId: string;
    readonly sourceId: string;
    readonly templatePlan: RuntimeSandboxTemplatePlan;
}): Promise<string | null>;
export {};
