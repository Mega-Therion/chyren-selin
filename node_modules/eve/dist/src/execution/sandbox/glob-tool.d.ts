import type { SandboxSession } from "#shared/sandbox-session.js";
/**
 * Typed input accepted by {@link executeGlobOnSandbox}.
 */
export interface GlobInput {
    readonly limit?: number;
    readonly path?: string;
    readonly pattern: string;
}
/**
 * Structured result returned from {@link executeGlobOnSandbox}.
 */
export interface GlobResult {
    readonly content: string;
    readonly count: number;
    readonly path: string;
    readonly truncated: boolean;
}
/**
 * Searches for files matching a glob pattern inside the sandbox.
 */
export declare function executeGlobOnSandbox(sandbox: SandboxSession, args: GlobInput): Promise<GlobResult>;
