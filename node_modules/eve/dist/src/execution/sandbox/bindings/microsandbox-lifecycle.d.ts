import type { ResolvedMicrosandboxOptions } from "#execution/sandbox/bindings/microsandbox-options.js";
import type { SandboxBackendCreateInput, SandboxBackendHandle, SandboxBackendPrewarmInput, SandboxBackendPrewarmResult } from "#public/definitions/sandbox-backend.js";
import type { MicrosandboxBootstrapUseOptions, MicrosandboxSessionUseOptions } from "#public/sandbox/microsandbox-sandbox.js";
export declare function prewarmMicrosandboxTemplate(input: {
    readonly backendName: string;
    readonly options: ResolvedMicrosandboxOptions;
    readonly optionsHash: string;
    readonly prewarmInput: SandboxBackendPrewarmInput<MicrosandboxBootstrapUseOptions>;
}): Promise<SandboxBackendPrewarmResult>;
export declare function createMicrosandboxHandle(input: {
    readonly backendName: string;
    readonly createInput: SandboxBackendCreateInput;
    readonly options: ResolvedMicrosandboxOptions;
    readonly optionsHash: string;
}): Promise<SandboxBackendHandle<MicrosandboxSessionUseOptions>>;
export declare function clearActiveMicrosandboxSessionHandlesForTest(): void;
