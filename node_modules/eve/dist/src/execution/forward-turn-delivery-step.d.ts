import type { TurnInboxPayload } from "#execution/turn-control-protocol.js";
/** Forwards one accepted public delivery to the private inbox of its requesting turn. */
export declare function forwardTurnDeliveryStep(input: {
    readonly inboxToken: string;
    readonly payload: TurnInboxPayload;
}): Promise<void>;
