import { resolveOutputPublicationLockPath } from "#internal/application/output-publication-lock.js";
export { resolveOutputPublicationLockPath };
export interface OutputPublicationInput {
    readonly appRoot: string;
    readonly finalOutputDir: string;
    readonly finalSummaryPath: string;
    /** Invocation-owned directory containing the staged paths; recovery removes it. */
    readonly scratchDir: string;
    readonly stagedOutputDir: string;
    readonly stagedSummaryPath: string;
}
/**
 * A publication failure that retained the lock journal on disk. The staged
 * artifacts (and the scratch directory containing them) must outlive this
 * invocation so a later build can finish the interrupted publication.
 */
export declare class RecoverablePublicationError extends AggregateError {
    constructor(errors: readonly unknown[], message: string, options?: ErrorOptions);
}
interface OutputPublicationObserver {
    afterBackup(): Promise<void>;
    afterOutputInstall(): Promise<void>;
    onContention(): Promise<void>;
}
/**
 * Atomically installs a build's staged output and summary as the app's
 * published artifacts: backs up the previous publication, renames the staged
 * paths into place, and rolls back to the backup on failure. A journaled,
 * cross-process lock serializes publishers and lets the next build finish an
 * interrupted publication.
 */
export declare function publishApplicationBuildArtifacts(input: OutputPublicationInput): Promise<void>;
export declare function publishApplicationBuildArtifactsWithObserver(input: OutputPublicationInput, observer: OutputPublicationObserver): Promise<void>;
