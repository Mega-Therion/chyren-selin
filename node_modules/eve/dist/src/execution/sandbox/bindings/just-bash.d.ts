import type { SandboxBackend } from "#public/definitions/sandbox-backend.js";
import type { JustBashSandboxCreateOptions } from "#public/sandbox/just-bash-sandbox.js";
/**
 * Stable backend name. Participates in template/session key derivation
 * and persisted reconnect state.
 */
export declare const JUST_BASH_BACKEND_NAME = "just-bash";
/**
 * Construction input for {@link createJustBashSandboxBackend}. Internal —
 * the public surface is the `justbash()` factory under
 * `eve/sandbox`.
 */
export interface CreateJustBashSandboxBackendInput {
    readonly createOptions?: JustBashSandboxCreateOptions;
}
/**
 * Creates the just-bash sandbox backend.
 *
 * The cache directory is derived from the runtime context's `appRoot`
 * on every `create` call so the backend stays stateless and matches
 * the framework's per-call dispatch contract.
 */
export declare function createJustBashSandboxBackend(input?: CreateJustBashSandboxBackendInput): SandboxBackend;
/**
 * Removes stale just-bash sandbox template directories for one
 * application's cache.
 */
export declare function pruneJustBashSandboxTemplates(input: {
    readonly appRoot: string;
    readonly now?: number;
    readonly recentWindowMs?: number;
    readonly retainCount?: number;
}): Promise<void>;
