import type { EveEvalConfig, EveEvalConfigInput } from "#evals/types.js";
/**
 * Defines the run-wide configuration shared by every eval, authored as the
 * default export of `evals.config.ts` at the root of the `evals/` directory.
 *
 * Exactly one `evals.config.ts` is required. It supplies the optional default
 * `judge` model for `t.judge.*` assertions (so individual evals need not
 * repeat it), optional run-level `reporters`, a default `maxConcurrency`, and a
 * default `timeoutMs`. CLI flags (`--max-concurrency`, `--timeout`) and
 * per-eval values take precedence over the config defaults.
 *
 * Throws on invalid input: a `judge` without a `model`, a non-positive or
 * non-integer `maxConcurrency`, a negative or non-finite `timeoutMs`, or a
 * non-array `reporters`.
 */
export declare function defineEvalConfig(input: EveEvalConfigInput): EveEvalConfig;
