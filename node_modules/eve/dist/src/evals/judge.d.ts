import type { AssertionCollector } from "#evals/assertions/collector.js";
import type { EveEvalJudgeConfig, JudgeContext } from "#evals/types.js";
/**
 * Dependencies the judge namespace closes over: where to record assertions,
 * how to resolve the default graded value (`t.reply`) and the original prompt
 * (the autoevals `input`), and the eval/config judge model.
 */
export interface JudgeDeps {
    readonly collector: AssertionCollector;
    readonly getReply: () => unknown;
    readonly getInput: () => string;
    readonly judge: EveEvalJudgeConfig | undefined;
}
/**
 * Builds the `t.judge` namespace bound to the resolved judge model. Each
 * grader records a soft assertion (override with `.atLeast`/`.gate`) that
 * fires the model call immediately; the collector awaits it before the
 * verdict.
 */
export declare function buildJudgeContext(deps: JudgeDeps): JudgeContext;
