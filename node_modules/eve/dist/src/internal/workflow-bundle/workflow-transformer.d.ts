import type { WorkflowManifest } from "./workflow-builders.js";
type WorkflowDirectiveMode = "workflow" | "step" | "client" | false;
export declare function transformWorkflowDirectives(input: {
    filename: string;
    mode: WorkflowDirectiveMode;
    moduleSpecifier: string | undefined;
    source: string;
    /**
     * Package-qualified module specifier without the `@<pkg.version>`
     * stamp. Used to mint workflow ids for functions named in
     * {@link transformWorkflowDirectives.input.stableWorkflowNames} so
     * the bundled id matches the runtime reference on every deployment.
     */
    stableModuleSpecifier?: string | undefined;
    /**
     * Workflow function names whose bundled id should be emitted without
     * the package version stamp. See `STABLE_WORKFLOW_NAMES` in
     * `workflow-runtime.ts` for the canonical set eve itself uses.
     */
    stableWorkflowNames?: ReadonlySet<string>;
}): Promise<{
    code: string;
    workflowManifest: WorkflowManifest;
}>;
export {};
