import { AssertionCollector } from "#evals/assertions/collector.js";
import type { EveEvalAssertionSubject } from "#evals/assertions/run.js";
import type { EveEvalAssertions, EveEvalOutputAssertions, EveEvalTaskResult } from "#evals/types.js";
type AssertionScope = {
    readonly timing: "final";
    select(result: EveEvalTaskResult): EveEvalAssertionSubject;
} | {
    readonly timing: "snapshot";
    select(): EveEvalAssertionSubject;
};
/** Binds the shared assertion vocabulary to one aggregate, session, or turn scope. */
export declare function createScopedAssertions(collector: AssertionCollector, scope: AssertionScope): EveEvalAssertions;
/** Binds output-only assertions to a session or immutable turn snapshot. */
export declare function createOutputAssertions(collector: AssertionCollector, scope: Extract<AssertionScope, {
    timing: "snapshot";
}>): EveEvalOutputAssertions;
export {};
