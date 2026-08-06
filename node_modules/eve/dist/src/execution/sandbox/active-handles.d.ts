/**
 * The slice of `SandboxBackendHandle` the shutdown registry needs.
 * Structural so handles of any session-options generic register without
 * variance friction.
 */
export interface ShutdownCapableSandboxHandle {
    shutdown(): Promise<void>;
}
/**
 * Registers a live sandbox handle for shutdown tracking. A handle
 * created later for the same backend and session key replaces the
 * previous entry.
 */
export declare function trackActiveSandboxHandle(input: {
    readonly backendName: string;
    readonly handle: ShutdownCapableSandboxHandle;
    readonly sessionKey: string;
}): void;
/**
 * Stops every tracked sandbox by calling `shutdown()` on each handle in
 * parallel, then clears the registry. Failures are logged and never
 * thrown so one misbehaving sandbox cannot block server shutdown.
 */
export declare function shutdownActiveSandboxHandles(input?: {
    readonly log?: (message: string) => void;
}): Promise<void>;
/** Returns the number of tracked handles. Exposed for tests and logging. */
export declare function countActiveSandboxHandles(): number;
export declare function clearActiveSandboxHandlesForTest(): void;
