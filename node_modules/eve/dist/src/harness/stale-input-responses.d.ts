import type { ModelMessage, UserContent } from "ai";
import type { StepInput } from "#harness/types.js";
type StaleResponseConversion = {
    readonly kind: "unchanged";
    readonly stepInput?: StepInput;
} | {
    readonly displayMessage: string | UserContent;
    readonly kind: "converted";
    readonly stepInput: StepInput;
};
/**
 * Filter pass: removes stale answers to session-limit continuation prompts
 * from the step input before any stale handling runs.
 *
 * These are dropped rather than converted: surfacing a stale "Stop" as
 * conversational prose would read fail-open, and a stale grant must not
 * extend any budget — a currently pending prompt (if any) stays parked and
 * re-raises. Stripping the responses also keeps them from resolving (and
 * clearing) a pending batch they never answered. Answers to a currently
 * pending continuation prompt pass through untouched.
 */
export declare function dropStaleSessionLimitContinuationResponses(input: {
    readonly pendingRequestIds: ReadonlySet<string>;
    readonly stepInput?: StepInput;
}): StepInput | undefined;
/**
 * Transformation pass: a response is stale when its request ID is not in
 * the currently pending HITL batch — the request was already answered,
 * cleared by a follow-up message, or cancelled.
 *
 * Responses for pending requests stay structured; stale responses become
 * plain user-message text. A stale response never reaches structured HITL
 * processing, so a stale approval cannot authorize an earlier tool call.
 * Request details recovered from history are best-effort model context.
 *
 * Assumes {@link dropStaleSessionLimitContinuationResponses} already ran:
 * stale continuation answers must never reach this conversion.
 */
export declare function convertStaleResponsesToUserMessage(input: {
    readonly history: readonly ModelMessage[];
    readonly pendingRequestIds: ReadonlySet<string>;
    readonly stepInput?: StepInput;
}): StaleResponseConversion;
export {};
