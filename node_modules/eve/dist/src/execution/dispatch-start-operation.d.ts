import { type AgentIdentity, type StartOperation } from "#harness/handles/store.js";
/**
 * Mints deterministic parent-controlled ownership data before the child exists,
 * so durable step replays derive the same handle record.
 */
export declare function mintStartOperation(input: {
    readonly callId: string;
    readonly name: string;
    readonly nodeId: string;
    readonly parentSessionId: string;
    readonly parentTurnId: string;
}): {
    readonly identity: AgentIdentity;
    readonly operation: StartOperation;
};
