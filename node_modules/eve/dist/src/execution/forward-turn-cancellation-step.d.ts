import type { TurnCancelPayload } from "#execution/turn-cancellation-token.js";
/** Forwards an inbox cancellation command to one private active-turn hook. */
export declare function forwardTurnCancellationStep(input: {
    readonly payload: TurnCancelPayload;
    readonly token: string;
}): Promise<boolean>;
