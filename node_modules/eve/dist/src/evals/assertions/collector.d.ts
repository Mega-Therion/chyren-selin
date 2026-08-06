import type { AssertionEvaluation, AssertionHandle, AssertionResult, AssertionSeverity, EveEvalTaskResult } from "#evals/types.js";
import type { EveEvalAssertionSubject } from "#evals/assertions/run.js";
export type AssertionOutcome = AssertionEvaluation;
/**
 * A scoped assertion evaluated lazily after `test(t)` returns. The selected
 * subject may be the aggregate run, one session, or one immutable turn.
 */
export interface RunAssertion {
    readonly name: string;
    evaluate(result: EveEvalAssertionSubject): AssertionOutcome | Promise<AssertionOutcome>;
}
/**
 * Collects the assertions recorded by an eval's `test(t)`. Run-level
 * assertions register a deferred spec; value/judge assertions evaluate their
 * captured value immediately (the value is ephemeral) and register the pending
 * promise. {@link finalize} resolves everything against the final result and
 * produces the ordered {@link AssertionResult} list the verdict reads.
 */
export declare class AssertionCollector {
    #private;
    /** Whether the eval has already recorded an assertion. */
    get hasEntries(): boolean;
    /** Register a deferred assertion against a turn or session scope. */
    recordScoped(spec: RunAssertion, selectSubject: (result: EveEvalTaskResult) => EveEvalAssertionSubject, severity?: AssertionSeverity): AssertionHandle;
    /** Register a value/judge assertion, evaluating the captured value now. */
    recordValue(input: {
        readonly name: string;
        readonly severity: AssertionSeverity;
        readonly threshold?: number;
        readonly score: () => Promise<AssertionOutcome>;
    }): AssertionHandle;
    /** Record an already-computed assertion outcome and return whether it passed. */
    recordOutcome(input: {
        readonly name: string;
        readonly outcome: AssertionOutcome;
    }): boolean;
    /** Record and await a required value assertion, returning whether it passed. */
    recordRequirement(input: {
        readonly name: string;
        readonly threshold?: number;
        readonly score: () => Promise<AssertionOutcome>;
    }): Promise<boolean>;
    /**
     * Awaits every pending value/judge assertion, evaluates the deferred
     * run-level assertions against `result`, and returns the recorded results.
     */
    finalize(result: EveEvalTaskResult): Promise<readonly AssertionResult[]>;
}
