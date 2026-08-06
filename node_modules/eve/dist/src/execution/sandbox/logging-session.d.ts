import type { SandboxSession } from "#shared/sandbox-session.js";
export declare function createLoggingSandboxSession(input: {
    readonly log?: (message: string) => void;
    readonly session: SandboxSession;
}): SandboxSession;
