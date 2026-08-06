/**
 * Built-in Workflow response body steps used by eve-owned workflow bundles.
 *
 * These mirror Workflow's tiny `workflow/internal/builtins` module without
 * requiring eve to depend on Workflow's umbrella package.
 */
export declare function __builtin_response_array_buffer(this: Request | Response): Promise<ArrayBuffer>;
export declare function __builtin_response_json(this: Request | Response): Promise<unknown>;
export declare function __builtin_response_text(this: Request | Response): Promise<string>;
/**
 * Step bridge for `setAttributes`.
 *
 * Mirrors the `__builtin_set_attributes` step from
 * `@workflow/workflow/internal/builtins`. The workflow-body shim's
 * `setAttributes` (in `internal/workflow-bundle/workflow-core-shim.ts`)
 * dispatches into the workflow runtime with the step id
 * `"__builtin_set_attributes"`; the runtime walks the deployment's step
 * registry to resolve it, so the step has to live inside an
 * eve-vendored builtins module that the registry visits. The eve bundler
 * already pulls this file in via `resolveWorkflowModulePath("workflow/internal/builtins")`,
 * so adding the function here is sufficient to register it.
 *
 * Implementation notes — kept intentionally close to the upstream:
 * - Reads world and run id directly from the runtime's `globalThis`
 *   symbols rather than importing `@workflow/core`. Importing the
 *   compiled core from a step file would re-introduce the bundling
 *   chain we want to keep out of step bodies.
 * - Treats missing world support as a silent best-effort no-op with a
 *   single process-wide warning, matching upstream behaviour and the
 *   contract on `setEveAttributes`.
 * - On any other error, retries up to `EVE_INTERNAL_ATTRIBUTES_MAX_ATTEMPTS - 1`
 *   times via the runtime's normal step retry path, then degrades to a
 *   `console.error` so failed attribute writes never escalate into a
 *   `FatalError` and tear down the user's agent run.
 */
export declare function __builtin_set_attributes(changes: Array<{
    key: string;
    value: string | null;
}>, options?: {
    allowReservedAttributes?: boolean;
}): Promise<void>;
