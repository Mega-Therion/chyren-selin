import { type DurableSessionState } from "#execution/durable-session-store.js";
/** Cancels every running delegated child recorded in the agent handle store. */
export declare function cancelDescendantTurnsStep(input: {
    readonly serializedContext: Record<string, unknown>;
    readonly sessionState: DurableSessionState;
}): Promise<void>;
