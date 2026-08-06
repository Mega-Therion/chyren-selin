import type { SandboxSession } from "#shared/sandbox-session.js";
/**
 * Typed input accepted by {@link executeWriteFileOnSandbox}.
 */
export interface WriteFileInput {
    readonly content: string;
    readonly filePath: string;
}
/**
 * Structured result returned from {@link executeWriteFileOnSandbox}.
 */
export interface WriteFileResult {
    readonly existed: boolean;
    readonly path: string;
}
/**
 * Writes one text file to the sandbox with read-before-write
 * enforcement and stale-read detection for existing files.
 *
 * Used by the framework `write_file` tool and by author tools
 * constructed via `defineWriteFileTool`.
 */
export declare function executeWriteFileOnSandbox(sandbox: SandboxSession, args: WriteFileInput): Promise<WriteFileResult>;
