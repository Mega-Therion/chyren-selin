export type { SandboxBackendHandle, SandboxBackendSessionState, SandboxSeedFile, SandboxBackendTags, SandboxBackendRuntimeContext, SandboxBackendCreateInput, SandboxBackendPrewarmInput, SandboxBackendPrewarmResult, SandboxBackend, } from "#shared/sandbox-backend.js";
/**
 * Thrown by a backend's `create` when the requested template was never
 * provisioned. Run `eve build` or call `prewarmAppSandboxes()` before
 * serving traffic. `backendName` and `templateKey` identify the missing
 * template. Use {@link SandboxTemplateNotProvisionedError.is} to narrow.
 */
export declare class SandboxTemplateNotProvisionedError extends Error {
    readonly backendName: string;
    readonly templateKey: string;
    constructor(input: {
        readonly backendName: string;
        readonly templateKey: string;
    });
    /** Type guard for {@link SandboxTemplateNotProvisionedError}. */
    static is(error: unknown): error is SandboxTemplateNotProvisionedError;
}
