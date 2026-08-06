import type { DockerCommandResult } from "#execution/sandbox/bindings/docker-cli.js";
export declare function expectDockerSuccess(result: DockerCommandResult, action: string): void;
