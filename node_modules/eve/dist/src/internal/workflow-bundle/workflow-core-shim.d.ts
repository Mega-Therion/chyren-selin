export declare class RetryableError extends Error {
}
export declare class FatalError extends Error {
}
interface WorkflowHook<T> extends AsyncIterable<T> {
    readonly token: string;
    getConflict(): Promise<{
        readonly runId: string;
    } | null>;
}
/**
 * Creates a Workflow hook from inside a durable workflow body.
 */
export declare function createHook<T = unknown>(options?: unknown): WorkflowHook<T>;
/**
 * Returns metadata for the current durable workflow body.
 */
export declare function getWorkflowMetadata(): Record<string, unknown>;
/**
 * Creates a Workflow writable stream handle from inside a durable workflow body.
 */
export declare function getWritable<T = unknown>(options?: {
    namespace?: string;
}): WritableStream<T>;
/**
 * Creates a Workflow webhook from inside a durable workflow body.
 */
export declare function createWebhook<T = unknown>(options?: unknown): WorkflowHook<T> & {
    url?: string;
};
/**
 * Defines a Workflow hook factory for workflow-body code.
 */
export declare function defineHook<T = unknown>(): {
    readonly create: (options?: unknown) => WorkflowHook<T>;
    readonly resume: () => never;
};
/**
 * Sleeps from inside workflow-body code.
 */
export declare function sleep(duration: string | number | Date): Promise<void>;
/**
 * `resumeHook()` is an external/runtime API and must not run in workflow bodies.
 */
export declare function resumeHook(): never;
/**
 * Step metadata is only available in step functions.
 */
export declare function getStepMetadata(): never;
/**
 * Options accepted by {@link setAttributes}.
 *
 * Mirrors `SetAttributesOptions` from `@workflow/core` so the
 * eve workflow-body bundle does not have to pull the real type in.
 */
export interface SetAttributesOptions {
    /**
     * Permit attribute keys that start with the reserved `$` prefix. eve
     * framework code passes `true` so it can write the `$eve.*` namespace;
     * authored agent code never calls this shim directly.
     */
    allowReservedAttributes?: boolean;
}
/**
 * Workflow-body implementation of `setAttributes` for the eve
 * bundle. Mirrors the dispatch path of `@workflow/core`'s workflow-body
 * export (`dist/workflow/set-attributes.js`):
 *
 * 1. Convert the attribute map into the `AttributeChange[]` shape the
 *    runtime expects (`undefined` -> `null` to clear a key).
 * 2. Resolve the workflow runtime's step dispatcher from
 *    `globalThis[Symbol.for("WORKFLOW_USE_STEP")]` (the same global symbol
 *    eve already relies on to materialize `"use step"` proxies).
 * 3. Invoke the builtin `__builtin_set_attributes` step with the changes,
 *    which the runtime records on the active workflow run.
 *
 * Validation is intentionally skipped here. The only caller, `setEveAttributes`,
 * already normalizes keys/values and is the sole entry point for the
 * `$eve.*` reserved namespace; bouncing through the runtime's full
 * validator would require pulling `@workflow/world` into the workflow body
 * bundle.
 */
export declare function setAttributes(attrs: Record<string, string | undefined>, options?: SetAttributesOptions): Promise<void>;
export {};
