import type { CompiledWorkspaceResourceRoot } from "#compiler/manifest.js";
import type { ResolvedSandboxDefinition } from "#runtime/types.js";
/**
 * Describes whether one sandbox needs a prewarmed template and, if so,
 * which inputs must participate in the template key.
 */
export type RuntimeSandboxTemplatePlan = {
    readonly kind: "none";
} | {
    readonly contentHash?: string;
    readonly kind: "workspace-content";
} | {
    readonly contentHash?: string;
    readonly kind: "bootstrap";
    readonly revalidationKey?: string;
    readonly sourceHash: string;
};
/**
 * Chooses the template strategy for one resolved sandbox definition.
 */
export declare function createRuntimeSandboxTemplatePlan(input: {
    readonly definition: ResolvedSandboxDefinition;
    readonly workspaceResourceRoot: CompiledWorkspaceResourceRoot;
}): RuntimeSandboxTemplatePlan;
