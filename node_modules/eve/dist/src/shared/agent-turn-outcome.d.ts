import { z } from "#compiled/zod/index.js";
import type { JsonValue } from "#shared/json.js";
import { type TokenUsage } from "#shared/token-usage.js";
/**
 * What one delegated child turn produced, independent of whether the child
 * session survived it.
 */
export type AgentTurnResult = {
    readonly kind: "succeeded";
    readonly output: JsonValue;
} | {
    readonly kind: "failed";
    readonly error: JsonValue;
} | {
    readonly kind: "cancelled";
};
/**
 * How one delegated child turn settled.
 *
 * `parked` means the child session survived the turn and can accept another
 * delivery; `terminal` means the child session ended with this turn. The
 * lifecycle is carried explicitly: a failed turn can leave the child parked,
 * and a succeeded turn can be terminal (task mode). Consumers must never
 * infer lifecycle from success or error codes.
 *
 * `usageDelta` is the provider-reported usage this turn added to the child's
 * session subtree: the child captures its session totals at turn entry and
 * reports final-minus-entry when the turn settles. The parent folds each
 * delta exactly once, so repeated turns of a persistent child never re-report
 * earlier turns.
 */
export type AgentTurnOutcome = {
    readonly kind: "parked";
    readonly result: AgentTurnResult;
    readonly usageDelta: TokenUsage;
} | {
    readonly kind: "terminal";
    readonly result: AgentTurnResult;
    readonly usageDelta: TokenUsage;
};
/**
 * Zod schema for {@link AgentTurnOutcome}.
 *
 * Validates outcomes crossing the process boundary (remote session
 * callbacks). Local notification paths construct the type directly.
 */
export declare const agentTurnOutcomeSchema: z.ZodType<AgentTurnOutcome>;
