import type { CompiledAgentManifest } from "#compiler/manifest.js";
/**
 * Materializes the per-node workspace resource trees under
 * `.eve/compile/workspace-resources/` and returns a manifest whose node
 * descriptors point at the freshly-written directories.
 *
 * Idempotent against an existing compile run: the resources directory
 * is removed before each invocation so a re-compile produces a clean
 * tree.
 */
export declare function materializeWorkspaceResources(input: {
    readonly compileDirectoryPath: string;
    readonly manifest: CompiledAgentManifest;
}): Promise<CompiledAgentManifest>;
