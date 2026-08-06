/**
 * Session token limit policy for the tool-loop harness.
 *
 * Two seams into the harness step:
 *
 * 1. {@link applySessionLimitContinuation} runs after pending-input
 *    resolution and acts on the user's answer to a continuation prompt —
 *    grant a fresh budget window, or cancel the in-flight turn tree.
 * 2. {@link enforceSessionTokenLimit} runs before each model call and, when
 *    the session is over budget, parks it on the deterministic continuation
 *    prompt (sessions that can reach a human) or fails it (task-mode sessions
 *    without HITL — nobody can answer the prompt).
 */
import type { ModelMessage } from "ai";
import { type HarnessEmissionState } from "#harness/emission.js";
import type { HarnessSession, StepResult, ToolLoopHarnessConfig } from "#harness/types.js";
interface SessionLimitPolicyInput {
    readonly config: ToolLoopHarnessConfig;
    readonly emit?: ToolLoopHarnessConfig["handleEvent"];
    readonly emissionState: HarnessEmissionState;
    readonly session: HarnessSession;
}
/**
 * Acts on a resolved session-limit continuation answer.
 *
 * Granted: bumps the runtime token limits via
 * {@link bumpSessionRuntimeTokenLimits} and lets the step continue
 * transparently.
 * Declined: a user decision, not an error — the decline cancels the
 * in-flight turn tree through the standard cancellation path, settling as
 * `turn.cancelled` → `session.waiting` with no failure surfaced anywhere.
 * The harness only declares the intent by throwing
 * {@link SessionLimitDeclinedError}; the execution layer detects it at the
 * step boundary and cancels the root turn, whose cancelled arm cascades to
 * every descendant, so the delegating parent never receives an error result
 * it could retry against a fresh budget share.
 *
 * Returns `result: null` when the step should continue with `session`.
 */
export declare function applySessionLimitContinuation(input: SessionLimitPolicyInput & {
    readonly limitContinuation: {
        readonly granted: boolean;
    } | undefined;
}): Promise<{
    readonly result: StepResult | null;
    readonly session: HarnessSession;
}>;
/**
 * Pre-model-call gate for the session token budget.
 *
 * Returns `null` when the session is within budget. Over budget, sessions
 * that can reach a human park on the deterministic continuation prompt;
 * task-mode sessions without HITL fail fast with
 * `SESSION_TOKEN_LIMIT_REACHED`.
 */
export declare function enforceSessionTokenLimit(input: SessionLimitPolicyInput & {
    readonly messages: readonly ModelMessage[];
}): Promise<StepResult | null>;
export {};
