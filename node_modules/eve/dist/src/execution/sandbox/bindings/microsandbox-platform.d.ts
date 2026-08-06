import type { Sandbox as MicrosandboxSandbox } from "microsandbox";
/**
 * Synchronously reports whether this host can run microsandbox at all:
 * macOS on Apple Silicon, or Linux (glibc) with KVM available. Used by
 * `defaultSandbox()`'s availability chain.
 */
export declare function isMicrosandboxPlatformSupported(): boolean;
/**
 * Validates the host before loading the microsandbox package, turning
 * unsupported platforms into actionable errors instead of opaque
 * native-binding resolution failures.
 */
export declare function assertMicrosandboxPlatformCandidate(): Promise<void>;
/**
 * One-time setup applied to sandboxes created from the raw base image:
 * verifies Bash, creates the `vercel-sandbox` user, and hands it
 * `/workspace`.
 */
export declare function ensureMicrosandboxBaseRuntime(sandbox: MicrosandboxSandbox, options?: {
    readonly log?: (message: string) => void;
}): Promise<void>;
