import type { MicrosandboxModule } from "#execution/sandbox/bindings/microsandbox-runtime.js";
/**
 * Classifies provider errors by message because the microsandbox SDK
 * exposes no structured error codes for these conditions.
 */
export declare function isMicrosandboxNotFoundError(error: unknown): boolean;
export declare function isMicrosandboxStillRunningError(error: unknown): boolean;
export declare function isMicrosandboxSnapshotSourceRunningError(error: unknown): boolean;
export declare function snapshotExists(module: MicrosandboxModule, snapshotName: string): Promise<boolean>;
export declare function sandboxExists(module: MicrosandboxModule, sandboxName: string): Promise<boolean>;
export declare function removeSnapshotIfExists(module: MicrosandboxModule, snapshotName: string): Promise<void>;
