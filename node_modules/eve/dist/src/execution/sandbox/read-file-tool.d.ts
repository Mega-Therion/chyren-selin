import type { SandboxSession } from "#shared/sandbox-session.js";
/**
 * Typed input accepted by {@link executeReadFileOnSandbox}.
 */
export interface ReadFileInput {
    readonly filePath: string;
    readonly limit?: number;
    readonly offset?: number;
}
/**
 * Structured result returned from {@link executeReadFileOnSandbox}.
 */
export interface ReadFileResult {
    readonly content: string;
    readonly nextOffset?: number;
    readonly path: string;
    readonly totalLines: number;
    readonly truncated: boolean;
}
/**
 * Reads one text file from the sandbox, applies output shaping
 * (offset, limit, line numbering, truncation), and persists a full-file
 * stamp into durable read-file state for stale-write detection.
 *
 * Used by the framework `read_file` tool and by author tools constructed
 * via `defineReadFileTool`.
 */
export declare function executeReadFileOnSandbox(sandbox: SandboxSession, args: ReadFileInput): Promise<ReadFileResult>;
