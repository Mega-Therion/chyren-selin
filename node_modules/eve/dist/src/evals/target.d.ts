import { Client } from "#client/client.js";
import { EvalSessionManager } from "#evals/session.js";
import type { EveEvalTargetCapabilities, EveEvalTargetHandle } from "#evals/types.js";
export declare function resolveEvalTargetHandle(input: {
    readonly client: Client;
    readonly expectedAgentName?: string;
    readonly kind: "local" | "remote";
    readonly url: string;
}): Promise<EveEvalTargetHandle>;
export declare function createEvalTargetHandle(input: {
    readonly capabilities: EveEvalTargetCapabilities;
    readonly client: Client;
    readonly kind: "local" | "remote";
    readonly url: string;
}): EveEvalTargetHandle;
export declare function scopeEvalTargetHandle(target: EveEvalTargetHandle, input: {
    readonly sessions?: EvalSessionManager;
}): EveEvalTargetHandle;
