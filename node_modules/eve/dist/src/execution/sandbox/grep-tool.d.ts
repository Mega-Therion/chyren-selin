import type { SandboxSession } from "#shared/sandbox-session.js";
/**
 * Typed input accepted by {@link executeGrepOnSandbox}.
 */
export interface GrepInput {
    readonly context?: number;
    readonly glob?: string;
    readonly ignoreCase?: boolean;
    readonly limit?: number;
    readonly literal?: boolean;
    readonly path?: string;
    readonly pattern: string;
}
/**
 * Structured result returned from {@link executeGrepOnSandbox}.
 */
export interface GrepResult {
    readonly content: string;
    readonly matchCount: number;
    readonly path: string;
    readonly truncated: boolean;
}
/**
 * Searches file contents for a pattern inside the sandbox.
 */
export declare function executeGrepOnSandbox(sandbox: SandboxSession, args: GrepInput): Promise<GrepResult>;
