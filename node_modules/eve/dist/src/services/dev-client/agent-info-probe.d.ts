import { type AgentInfoResult, type Client } from "#client/index.js";
export type AgentInfoProbeResult = {
    readonly kind: "ready";
    readonly info: AgentInfoResult;
} | {
    readonly kind: "unavailable";
    readonly error: unknown;
};
/**
 * Reads best-effort inspection data from a server whose lifecycle belongs to
 * another process. Transient transport and server failures can occur while
 * that process reloads, but auth and schema failures cannot be fixed by retry.
 */
export declare function probeAgentInfo(input: {
    readonly client: Pick<Client, "info">;
}): Promise<AgentInfoProbeResult>;
