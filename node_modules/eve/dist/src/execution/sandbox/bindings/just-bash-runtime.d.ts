import type { SandboxBackendHandle } from "#public/definitions/sandbox-backend.js";
import type { JustBashSandboxCreateOptions } from "#public/sandbox/just-bash-sandbox.js";
import type { SandboxProcess, SandboxRemovePathOptions, SandboxSpawnOptions } from "#shared/sandbox-session.js";
export interface BashSandbox {
    captureState(): Promise<Record<string, unknown> | null>;
    dispose(): Promise<void>;
    readFileBytes(path: string): Promise<Buffer | null>;
    removePath(options: SandboxRemovePathOptions): Promise<void>;
    readonly rootPath: string;
    readonly sessionKey: string;
    spawn(options: SandboxSpawnOptions): Promise<SandboxProcess>;
    writeFiles(files: ReadonlyArray<{
        path: string;
        content: string | Uint8Array;
    }>): Promise<void>;
}
export declare function createBashSandbox(input: {
    readonly appRoot: string;
    readonly autoInstall: boolean;
    readonly filesystem?: JustBashSandboxCreateOptions["filesystem"];
    readonly rootPath: string;
    readonly sessionKey: string;
}): Promise<BashSandbox>;
/**
 * The just-bash engine cannot honor a run-time network policy: just-bash takes
 * its `NetworkConfig` only at sandbox creation (no live update) and runs no
 * `git` or other binaries, so credential brokering has nothing to act on.
 * Throw rather than silently no-op so brokering code surfaces the gap instead
 * of leaking.
 */
export declare function justBashSetNetworkPolicyUnsupported(): Promise<never>;
export declare function createJustBashHandle(sandbox: BashSandbox, backendName: string): SandboxBackendHandle;
