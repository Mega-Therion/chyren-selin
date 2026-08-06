import type { StandardSchemaV1 } from "#compiled/@standard-schema/spec/index.js";
import type { Assertion } from "#evals/types.js";
export type { Assertion, AssertionEvaluation, AssertionHandle, AssertionSeverity, } from "#evals/types.js";
/**
 * Passes when the value (coerced to a string) contains a substring or matches
 * a RegExp. A hard gate by default.
 */
export declare function includes(substring: string | RegExp): Assertion;
/** Passes when `predicate` returns true for the supplied value. */
export declare function satisfies<T = unknown>(predicate: (value: T) => boolean, label: string): Assertion;
/**
 * Passes when the value deep-equals `expected` (exact structural equality).
 * A hard gate by default.
 */
export declare function equals(expected: unknown): Assertion;
/**
 * Passes when the value validates against a Standard Schema (e.g. a Zod
 * schema). A hard gate by default.
 */
export declare function matches(schema: StandardSchemaV1): Assertion;
/**
 * Scores normalized character-level Levenshtein similarity between the value
 * and `expected` (1 = identical, 0 = entirely different). Soft by default —
 * tracked unless you set a bar with `.atLeast(...)`. Use it for fuzzy
 * comparison when exact match is too strict but a judge model is overkill.
 */
export declare function similarity(expected: string): Assertion;
