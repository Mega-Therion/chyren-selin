import type { MicrosandboxSandboxCreateOptions } from "#public/sandbox/microsandbox-sandbox.js";
import type { SandboxNetworkPolicy } from "#shared/sandbox-network-policy.js";
export declare const MICROSANDBOX_DEFAULT_IMAGE = "ghcr.io/vercel/eve:latest";
export declare const MICROSANDBOX_DEFAULT_CPUS = 1;
export declare const MICROSANDBOX_DEFAULT_MEMORY_MIB = 1024;
export declare const MICROSANDBOX_DEFAULT_PULL_POLICY = "if-missing";
/** User every sandbox command runs as, mirroring hosted Vercel Sandbox. */
export declare const MICROSANDBOX_USER = "vercel-sandbox";
/**
 * Fully-defaulted microsandbox backend options consumed by the backend
 * implementation.
 */
export interface ResolvedMicrosandboxOptions {
    readonly cpus: number;
    readonly env: Readonly<Record<string, string>>;
    readonly image: string;
    readonly memoryMiB: number;
    readonly networkPolicy?: SandboxNetworkPolicy;
    readonly pullPolicy: "always" | "if-missing" | "never";
    readonly setup: {
        readonly autoInstall: boolean;
        readonly skipVerify: boolean;
    };
}
/**
 * Applies defaults to `microsandbox(opts)`.
 */
export declare function resolveMicrosandboxOptions(options: MicrosandboxSandboxCreateOptions | undefined): ResolvedMicrosandboxOptions;
/**
 * The subset of options that participates in template/session
 * compatibility hashing. Setup behavior intentionally stays out: how
 * the runtime got installed must not invalidate captured templates.
 */
export declare function microsandboxOptionsForHash(options: ResolvedMicrosandboxOptions): Record<string, unknown>;
