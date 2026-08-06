/**
 * Minimal subset of an npm `package.json` needed to read a world's declared
 * `@workflow/*` dependency line.
 */
export interface WorkflowWorldManifest {
    readonly dependencies?: Readonly<Record<string, string>>;
    readonly peerDependencies?: Readonly<Record<string, string>>;
}
export interface AssertWorkflowWorldCompatibilityInput {
    /** Package name of the configured world, used only for the error message. */
    readonly worldPackageName: string;
    /** Parsed `package.json` of the installed configured world. */
    readonly worldManifest: WorkflowWorldManifest;
    /** The `@workflow/core` version this eve release bundles. */
    readonly expectedWorkflowVersion: string;
}
/**
 * Fails fast when a configured Workflow world targets a `@workflow/*` major or
 * prerelease line that is incompatible with the line this eve release bundles.
 */
export declare function assertWorkflowWorldCompatibility(input: AssertWorkflowWorldCompatibilityInput): void;
