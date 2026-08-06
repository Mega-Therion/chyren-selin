import type { DockerCli } from "#execution/sandbox/bindings/docker-cli.js";
import type { ResolvedDockerSandboxOptions } from "#execution/sandbox/bindings/docker-options.js";
import type { SandboxBackendTags } from "#public/definitions/sandbox-backend.js";
import type { DockerSandboxNetworkPolicy } from "#public/sandbox/docker-sandbox.js";
export declare const DOCKER_SANDBOX_LABEL = "eve.sandbox";
export declare function startDockerContainer(input: {
    readonly cli: DockerCli;
    readonly containerName: string;
    readonly image: string;
    readonly initialNetworkPolicy: DockerSandboxNetworkPolicy;
    readonly options: ResolvedDockerSandboxOptions;
    readonly role: "session" | "template-build";
    readonly tags?: SandboxBackendTags;
}): Promise<void>;
export declare function runDockerBaseSetup(cli: DockerCli, containerName: string): Promise<void>;
export declare function stopDockerContainerIfRunning(cli: DockerCli, containerName: string): Promise<void>;
