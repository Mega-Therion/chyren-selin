import type { EveEvalDefinition, EveEvalInput } from "#evals/types.js";
/**
 * Defines one eve eval. Each eval file is exactly one case: an imperative
 * `test(t)` function that drives the agent (`t.send`, `t.respond`, …) and
 * asserts on what it produced (`t.succeeded()`, `t.check(...)`,
 * `t.judge.autoevals.*`). Organize related evals with directory nesting under
 * `evals/`, or default-export an array of evals to fan one file out over a
 * dataset.
 *
 * A `judge` is optional: `t.judge.*` assertions fall back to the `judge`
 * declared in `evals.config.ts` unless this eval overrides it. The judge model
 * is used solely for scoring, never for the agent under test. Eval identity is
 * derived from the `evals/<path>.eval.ts` file path by the discovery layer, so
 * authoring `id` or `name` throws.
 *
 * Throws on invalid input: a missing `test` function, a removed legacy key
 * (`input`/`run`/`checks`/`scores`/`expected`/`thresholds`/`parseOutput`/
 * `model`/`requires`), or a negative or non-finite `timeoutMs`.
 */
export declare function defineEval(input: EveEvalInput): EveEvalDefinition;
