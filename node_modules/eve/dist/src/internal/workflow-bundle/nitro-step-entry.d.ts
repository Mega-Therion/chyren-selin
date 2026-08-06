import { type WorkflowManifest } from "#internal/workflow-bundle/workflow-builders.js";
export interface NitroStepEntrypointDiscoveredEntries {
    readonly discoveredSerdeFiles: readonly string[];
    readonly discoveredSteps: readonly string[];
}
/**
 * Writes the hosted Nitro step entrypoint source and returns the manifest
 * metadata discovered from the imported step and serde files.
 */
export declare function writeNitroStepEntrypoint(input: {
    readonly builtinsPath?: string;
    readonly discoveredEntries: NitroStepEntrypointDiscoveredEntries;
    readonly outfile: string;
    readonly preferAbsoluteFileImports?: boolean;
    readonly projectRoot: string;
    readonly sideEffectFiles: readonly string[];
    readonly workingDir: string;
}): Promise<WorkflowManifest>;
