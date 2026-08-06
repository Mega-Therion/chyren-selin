export declare const DEVELOPMENT_RUNTIME_ARTIFACTS_ACTIVATED_MARKER = "activated";
/** Records the instant at which an activated generation stopped being current. */
export declare function recordRetiredDevelopmentRuntimeArtifactsSnapshot(snapshotRoot: string, retiredAt?: number): Promise<void>;
/** Applies the bounded retention policy within one dev snapshot directory. */
export declare function pruneDevelopmentRuntimeArtifactsSnapshotDirectory(input: {
    readonly activeSnapshotRoot: string | undefined;
    readonly gracePeriodMs?: number;
    readonly now?: number;
    readonly protectAll: boolean;
    readonly retainCount?: number;
    readonly snapshotsDirectory: string;
}): Promise<void>;
