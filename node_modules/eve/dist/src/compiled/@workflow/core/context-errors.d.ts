import { ContextViolationError, type DocsUrl, NotInStepContextError, NotInWorkflowContextError, NotInWorkflowOrStepContextError } from './context-violation-error.js';
export { ContextViolationError, NotInStepContextError, NotInWorkflowContextError, NotInWorkflowOrStepContextError, };
/**
 * Thrown when an API that MUST NOT run inside a workflow function is called
 * from one (e.g. `resumeHook()`, which would cause determinism issues).
 * The message names the specific workflow that made the offending call.
 */
export declare class UnavailableInWorkflowContextError extends ContextViolationError {
    name: string;
    constructor(functionName: string, docsUrl: DocsUrl);
}
/**
 * Throw a {@link NotInWorkflowContextError} whose stack trace points at the
 * user code that called `stackStartFn`, not at our framework internals.
 *
 * Prefer this over `throw new NotInWorkflowContextError(...)` so tooling
 * (Next.js error overlay, VS Code terminal linkifier, Sentry, etc.) shows
 * the user's call site as the relevant frame.
 */
export declare function throwNotInWorkflowContext(functionName: string, docsUrl: DocsUrl, stackStartFn: Function): never;
/** See {@link throwNotInWorkflowContext}. */
export declare function throwNotInStepContext(functionName: string, docsUrl: DocsUrl, stackStartFn: Function): never;
/** See {@link throwNotInWorkflowContext}. */
export declare function throwNotInWorkflowOrStepContext(functionName: string, docsUrl: DocsUrl, stackStartFn: Function): never;
/** See {@link throwNotInWorkflowContext}. */
export declare function throwUnavailableInWorkflowContext(functionName: string, docsUrl: DocsUrl, stackStartFn: Function): never;
//# sourceMappingURL=context-errors.d.ts.map