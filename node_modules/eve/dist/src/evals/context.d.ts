import { EvalSessionManager } from "#evals/session.js";
import { AssertionCollector } from "#evals/assertions/collector.js";
import type { EveEvalContext, EveEvalJudgeConfig, EveEvalTargetHandle } from "#evals/types.js";
/**
 * Builds the `EveEvalContext` (`t`) for one eval run, wiring the session
 * manager (driving), the assertion collector (recording), and the judge
 * namespace. Returns the collector so the runner can {@link
 * AssertionCollector.finalize} it against the completed task result.
 */
export declare function createEvalContext(deps: {
    readonly manager: EvalSessionManager;
    readonly collector: AssertionCollector;
    readonly target: EveEvalTargetHandle;
    readonly signal: AbortSignal;
    readonly judge: EveEvalJudgeConfig | undefined;
    readonly log: (message: string) => void;
}): {
    readonly context: EveEvalContext;
    readonly collector: AssertionCollector;
};
