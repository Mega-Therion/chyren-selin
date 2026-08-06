import type { SandboxProcess } from "#shared/sandbox-session.js";
type OutputName = "stderr" | "stdout";
interface MultiplexedCommand<Log extends {
    readonly data: string;
}> {
    kill(): PromiseLike<void>;
    logs(): AsyncIterable<Log>;
    wait(): PromiseLike<{
        readonly exitCode: number;
    }>;
}
/**
 * Adapts a detached command with one tagged log iterator to a sandbox process
 * with independent stdout and stderr streams.
 */
export declare function adaptMultiplexedCommandToSandboxProcess<Log extends {
    readonly data: string;
}>(input: {
    readonly command: MultiplexedCommand<Log>;
    readonly getOutput: (log: Log) => OutputName;
}): SandboxProcess;
export {};
