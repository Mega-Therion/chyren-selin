import type { SandboxSession } from "#public/definitions/sandbox.js";
/**
 * Resolves the active sandbox session from the runtime context.
 *
 * Shared preamble for every sandbox-backed tool executor (`bash`,
 * `read_file`, `write_file`, `glob`, `grep`). Centralizes the context
 * lookup, null checks, and error messages so each executor does not
 * duplicate them.
 *
 * Binds the returned session to `abortSignal` when provided.
 */
export declare function requireSandboxSession(abortSignal?: AbortSignal): Promise<SandboxSession>;
/**
 * Resolves a model-supplied `$HOME` prefix and validates that the resulting
 * sandbox file path is absolute.
 */
export declare function resolveAbsoluteFilePath(sandbox: SandboxSession, filePath: string): Promise<string>;
