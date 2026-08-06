import type { DockerCli } from "#execution/sandbox/bindings/docker-cli.js";
import type { InternalSandboxSession } from "#shared/sandbox-session.js";
export declare function createDockerInternalSession(input: {
    readonly cli: DockerCli;
    readonly containerName: string;
    readonly id: string;
}): InternalSandboxSession;
