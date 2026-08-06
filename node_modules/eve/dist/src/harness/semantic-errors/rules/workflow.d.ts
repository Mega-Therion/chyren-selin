import { type SemanticErrorRule } from "../rule.js";
/**
 * Error class names verified against the vendored `@workflow/errors` and
 * `@workflow/world-local` source: every class assigns `this.name`
 * explicitly in its constructor (`this.name = 'ReplayDivergenceError'`,
 * `'DataDirVersionError'`, …), so the discriminator is stable and
 * survives structured clone across workflow step boundaries.
 */
export declare const WORKFLOW_RULES: readonly SemanticErrorRule[];
