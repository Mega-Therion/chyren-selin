import type { SandboxSession } from "#public/definitions/sandbox.js";
/**
 * Returns `true` when `rg` is on PATH and supports the options used by eve,
 * `false` otherwise. Result is cached per session.
 *
 * Framework `grep` and `glob` tools call this to decide whether to use
 * ripgrep or the POSIX `grep`/`find` fallback.
 */
export declare function ripgrepIsAvailable(session: SandboxSession): Promise<boolean>;
