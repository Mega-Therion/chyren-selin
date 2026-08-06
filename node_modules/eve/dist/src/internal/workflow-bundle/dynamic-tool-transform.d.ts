/**
 * Compiler transform for dynamic tool files.
 *
 * Hoists inline `execute` functions from `defineDynamic`
 * event handler return values to module-scope named functions
 * registered in the global step registry. The workflow SDK then
 * handles serialization and replay.
 *
 * The walker enters nested functions (helpers, callbacks, IIFEs) so
 * patterns like `function buildTool(n) { return { execute() {} } }`
 * are supported. For each execute found, scope variables from every
 * enclosing function between the handler and the execute are
 * collected. Only variables the execute body actually references are
 * captured — this avoids TDZ errors from later declarations.
 *
 * At each call site the inline execute is replaced with:
 * - A wrapper that passes referenced scope values as `__vars`
 * - `__executeStepFn`: reference to the hoisted function
 * - `__closureVars`: snapshot for durable serialization
 *
 * Limitation: `execute` must be an inline function literal (function
 * expression, arrow, or method shorthand). Variable references
 * (`execute: myFn`) and call results (`execute: makeFn()`) are not
 * detected — the transform returns null and the tool works on the
 * first workflow step but is not replayable.
 */
/**
 * Transforms a dynamic tool file:
 * 1. Hoists execute functions to module scope with "use step"
 * 2. Captures handler-scope variables via __vars parameter
 * 3. Adds "use step" to event handlers so the workflow SDK caches
 *    the handler's return value (resolver runs once per scope)
 *
 * Returns null if the file doesn't contain a dynamic tool pattern.
 */
export declare function transformDynamicToolExecute(filename: string, source: string): Promise<{
    code: string;
} | null>;
export { transformDynamicToolExecute as transformDynamicToolAwait };
