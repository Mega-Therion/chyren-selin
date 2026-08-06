import type { SandboxProcess } from "#shared/sandbox-session.js";
import type { ExecHandle as MicrosandboxExecHandle } from "microsandbox";
export declare function adaptMicrosandboxExecToSandboxProcess(command: MicrosandboxExecHandle): SandboxProcess;
