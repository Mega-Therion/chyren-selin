import type { MicrosandboxError, Sandbox as MicrosandboxSandbox, SandboxBuilder as MicrosandboxSandboxBuilder } from "microsandbox";
export declare function createMicrosandboxWithProgress(input: {
    readonly builder: MicrosandboxSandboxBuilder;
    readonly errorType: typeof MicrosandboxError;
    readonly log?: (message: string) => void;
    readonly source: string;
}): Promise<MicrosandboxSandbox>;
export declare function enrichMicrosandboxError(input: {
    readonly context: string;
    readonly error: unknown;
    readonly errorType?: typeof MicrosandboxError;
}): Error;
