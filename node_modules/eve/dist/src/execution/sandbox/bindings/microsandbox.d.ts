import type { SandboxBackend } from "#public/definitions/sandbox-backend.js";
import type { MicrosandboxBootstrapUseOptions, MicrosandboxSandboxCreateOptions, MicrosandboxSessionUseOptions } from "#public/sandbox/microsandbox-sandbox.js";
export { pruneMicrosandboxTemplates } from "#execution/sandbox/bindings/microsandbox-templates.js";
/**
 * Stable backend name. Participates in template/session key derivation
 * and persisted reconnect state.
 */
export declare const MICROSANDBOX_BACKEND_NAME = "microsandbox";
/**
 * Construction input for {@link createMicrosandboxSandboxBackend}.
 * Internal — the public surface is the `microsandbox()` factory
 * under `eve/sandbox`.
 */
export interface CreateMicrosandboxSandboxBackendInput {
    readonly createOptions?: MicrosandboxSandboxCreateOptions;
}
/**
 * Creates the microsandbox sandbox backend: lightweight local VMs with
 * snapshot-backed templates, running each command as the
 * `vercel-sandbox` user for parity with hosted Vercel Sandbox.
 */
export declare function createMicrosandboxSandboxBackend(input?: CreateMicrosandboxSandboxBackendInput): SandboxBackend<MicrosandboxBootstrapUseOptions, MicrosandboxSessionUseOptions>;
