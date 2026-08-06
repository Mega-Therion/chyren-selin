import { type Client } from "#client/index.js";
import type { RemoteConnectionState } from "./remote-connection-types.js";
export type RemoteProbeResult = Extract<RemoteConnectionState, {
    state: "ready" | "auth-required" | "unavailable";
}>;
export type RemoteProbePhase = "connection-check" | "authentication-verification";
export declare function classifyRemoteError(error: unknown, phase: RemoteProbePhase): RemoteProbeResult;
export declare function probeRemoteInfo(input: {
    readonly client: Client;
    readonly phase: RemoteProbePhase;
}): Promise<RemoteProbeResult>;
