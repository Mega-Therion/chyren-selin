import type { CompileAgentResult } from "#compiler/compile-agent.js";
export interface DevelopmentRuntimeArtifactsRevision {
    readonly revision: string;
}
export interface DevelopmentRuntimeArtifactsSnapshot {
    readonly runtimeAppRoot: string;
    readonly snapshotRoot: string;
    readonly snapshotSourceRoot: string;
    readonly sourceRoot: string;
}
export interface ActiveDevelopmentRuntimeArtifactsSnapshot {
    readonly runtimeAppRoot: string;
    readonly snapshotRoot: string;
}
export interface DevelopmentRuntimeArtifactsActivation {
    commit(): void;
    rollback(): Promise<void>;
}
/**
 * Resolves the dev-server pointer that records the latest runtime artifact
 * snapshot for new sessions.
 */
export declare function resolveDevelopmentRuntimeArtifactsPointerPath(appRoot: string): string;
/**
 * Stages one immutable dev runtime snapshot without moving the latest pointer.
 */
export declare function stageDevelopmentRuntimeArtifactsSnapshot(compileResult: CompileAgentResult): Promise<DevelopmentRuntimeArtifactsSnapshot>;
/**
 * Moves the dev runtime pointer so future sessions use a staged snapshot.
 */
export declare function activateDevelopmentRuntimeArtifactsSnapshot(input: {
    readonly appRoot: string;
    readonly snapshot: DevelopmentRuntimeArtifactsSnapshot;
}): Promise<void>;
export declare function activateDevelopmentRuntimeArtifactsSnapshotTransaction(input: {
    readonly appRoot: string;
    readonly snapshot: DevelopmentRuntimeArtifactsSnapshot;
}): Promise<DevelopmentRuntimeArtifactsActivation>;
/**
 * Reads the latest dev runtime snapshot root when the dev server has one.
 */
export declare function readDevelopmentRuntimeArtifactsSnapshotRoot(pointerPath: string | undefined): string | undefined;
export declare function readActiveDevelopmentRuntimeArtifactsSnapshot(appRoot: string): ActiveDevelopmentRuntimeArtifactsSnapshot | undefined;
/**
 * Reads a revision token for the latest dev runtime artifact snapshot.
 */
export declare function readDevelopmentRuntimeArtifactsRevision(appRoot: string): DevelopmentRuntimeArtifactsRevision;
/**
 * Bounds dev snapshot storage without consulting a Workflow World. The active
 * generation is always retained; retired generations receive a grace period,
 * and the newest retired generations remain as a rebuild-rate safety net.
 */
export declare function pruneDevelopmentRuntimeArtifactsSnapshots(input: {
    readonly appRoot: string;
    readonly gracePeriodMs?: number;
    readonly now?: number;
    readonly retainCount?: number;
}): Promise<void>;
