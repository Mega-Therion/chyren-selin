/** Version of the machine-readable `eve build --profile` report schema. */
export declare const APPLICATION_BUILD_PROFILE_SCHEMA_VERSION: 1;
/** Deployment target represented by one build profile. */
export type ApplicationBuildProfileTarget = "local" | "vercel";
/** One completed phase in an application build profile. */
export interface ApplicationBuildProfilePhase {
    readonly durationMs: number;
    readonly name: string;
}
/** Size totals for one Vercel function directory in the published output. */
export interface ApplicationBuildProfileFunctionBundle {
    readonly files: number;
    readonly gzipBytes: number;
    readonly path: string;
    readonly rawBytes: number;
}
/** Final output-size measurements collected after a successful publication. */
export interface ApplicationBuildProfileOutput {
    readonly files: number;
    readonly functionBundles: readonly ApplicationBuildProfileFunctionBundle[];
    readonly gzipBytes: number;
    readonly rawBytes: number;
}
/** Timing data gathered while an application build runs. */
export interface ApplicationBuildProfileTiming {
    readonly durationMs: number;
    readonly phases: readonly ApplicationBuildProfilePhase[];
}
/** Stable JSON document written by `eve build --profile <path>`. */
export interface ApplicationBuildProfile {
    readonly durationMs: number;
    readonly kind: "eve-build-profile";
    readonly output: ApplicationBuildProfileOutput;
    readonly phases: readonly ApplicationBuildProfilePhase[];
    readonly schemaVersion: typeof APPLICATION_BUILD_PROFILE_SCHEMA_VERSION;
    readonly target: ApplicationBuildProfileTarget;
}
interface ApplicationBuildProfilerOptions {
    readonly now?: () => number;
}
/**
 * Records elapsed build phases only when profile output was requested. The
 * injected clock keeps its serialization behavior independently testable.
 */
export declare class ApplicationBuildProfiler {
    #private;
    constructor(options?: ApplicationBuildProfilerOptions);
    measure<T>(name: string, operation: () => T | Promise<T>): Promise<T>;
    finish(): ApplicationBuildProfileTiming;
}
/** Creates the versioned report shape from completed timings and output measurements. */
export declare function createApplicationBuildProfile(input: {
    readonly output: ApplicationBuildProfileOutput;
    readonly target: ApplicationBuildProfileTarget;
    readonly timing: ApplicationBuildProfileTiming;
}): ApplicationBuildProfile;
/**
 * Measures regular files in the published output without following symlinks.
 * Each `.func` directory receives its own subtotal for Vercel output.
 */
export declare function measureApplicationBuildOutput(outputDirectory: string): Promise<ApplicationBuildProfileOutput>;
/** Writes one formatted profile JSON document outside the build output. */
export declare function writeApplicationBuildProfile(outputPath: string, profile: ApplicationBuildProfile): Promise<void>;
export {};
