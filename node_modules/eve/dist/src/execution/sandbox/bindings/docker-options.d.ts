import type { DockerSandboxCreateOptions, DockerSandboxNetworkPolicy, DockerSandboxPullPolicy } from "#public/sandbox/docker-sandbox.js";
/**
 * Default base image for the Docker backend: eve's published sandbox
 * runtime image.
 */
export declare const DEFAULT_DOCKER_SANDBOX_IMAGE = "ghcr.io/vercel/eve:latest";
/**
 * Fully-defaulted Docker backend options consumed by the backend
 * implementation.
 */
export interface ResolvedDockerSandboxOptions {
    readonly env: Readonly<Record<string, string>>;
    readonly image: string;
    readonly networkPolicy: DockerSandboxNetworkPolicy;
    readonly pullPolicy: DockerSandboxPullPolicy;
}
/**
 * Applies defaults to `docker(opts)`.
 */
export declare function resolveDockerSandboxOptions(options?: DockerSandboxCreateOptions): ResolvedDockerSandboxOptions;
export declare function createDockerSandboxOptionsHash(options: ResolvedDockerSandboxOptions): string;
