import type { AgentSourceManifest } from "#discover/manifest.js";
import type { ModuleSourceRef } from "#shared/source-ref.js";
/** Emits the runnable, agent-shaped tree and its package entrypoints into staging. */
export declare function emitExtensionDistribution(input: {
    readonly appRoot: string;
    readonly declarationModule: ModuleSourceRef;
    readonly declarationsRoot: string;
    readonly manifest: AgentSourceManifest;
    readonly runtimeDependencies: readonly string[];
    readonly shortName: string;
    readonly sourceRoot: string;
    readonly stagedDistRoot: string;
    readonly stagedOutDir: string;
    readonly transactionRoot: string;
}): Promise<void>;
/**
 * Thrown when publishing failed and the prior output could not be moved back.
 * The prior output survives at {@link preservedOutputPath}; callers must not
 * delete the transaction directory that contains it.
 */
export declare class ExtensionOutputRestoreError extends Error {
    readonly preservedOutputPath: string;
    constructor(preservedOutputPath: string, options: {
        cause: unknown;
    });
}
/** Atomically publishes a staged extension output, restoring the prior tree on failure. */
export declare function replaceExtensionBuildOutput(input: {
    readonly outDir: string;
    readonly stagedOutDir: string;
    readonly transactionRoot: string;
}): Promise<void>;
