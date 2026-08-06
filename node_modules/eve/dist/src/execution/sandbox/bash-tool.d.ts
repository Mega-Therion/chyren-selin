import type { SandboxSession } from "#shared/sandbox-session.js";
/**
 * Typed input accepted by {@link executeBashOnSandbox}.
 */
export interface BashInput {
    readonly command: string;
}
/**
 * Structured result returned from {@link executeBashOnSandbox}.
 */
export interface BashResult {
    readonly exitCode: number;
    readonly stderr: string;
    readonly stdout: string;
    /** True when stdout or stderr was shortened to fit within output limits. */
    readonly truncated: boolean;
}
/**
 * Executes one shell command inside the agent's sandbox via `SandboxKey`
 * on the active runtime context.
 *
 * Both stdout and stderr are tail-truncated to keep the end of the output
 * (where errors and final results typically appear) within the shared
 * {@link MAX_OUTPUT_LINES} / {@link MAX_OUTPUT_BYTES} limits.
 *
 * Used by the framework `bash` tool and by author tools constructed via
 * `defineBashTool`. Centralizing the executor here keeps the error
 * messages and result shape identical across all bash-style tools.
 */
export declare function executeBashOnSandbox(sandbox: SandboxSession, args: BashInput): Promise<BashResult>;
