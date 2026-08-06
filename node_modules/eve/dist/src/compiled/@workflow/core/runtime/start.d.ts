import type { World } from '#compiled/@workflow/world/index.js';
import { Run } from './run.js';
/**
 * Reset the `deploymentId: 'latest'` no-op warn-once guard. Test-only —
 * exported so unit tests can exercise the warn path across `start()` calls.
 *
 * @internal
 */
export declare function _resetLatestNoOpWarnForTests(): void;
export interface StartOptionsBase {
    /**
     * The world to use for the workflow run creation,
     * by default the world is inferred from the environment variables.
     */
    world?: World;
    /**
     * The spec version to use for the workflow run. Defaults to the latest version.
     */
    specVersion?: number;
    /**
     * Optional region identifier for the new run. Currently consumed only
     * by `@workflow/world-vercel`, which embeds the region into the tagged
     * run ID and routes the initial workflow message to the matching
     * regional queue. When omitted, the world falls back to its own
     * default (for `world-vercel`: the `VERCEL_REGION` environment
     * variable, then the server-side default region `iad1` — a concrete,
     * routable region is always chosen).
     *
     * Worlds without a regional dimension ignore this field.
     */
    region?: string;
    /**
     * Plaintext attributes to seed on the run as it is created.
     *
     * Available for native-attributes runs (spec version 4 and later).
     */
    attributes?: Record<string, string>;
    /**
     * Permit reserved `$`-prefixed keys in `attributes`. The `$` namespace
     * is reserved for framework/library code built on top of the workflow
     * SDK (telemetry, agent metadata, platform-emitted tags, etc.); user
     * code MUST NOT write keys in it, and validation rejects them so
     * accidental collisions with tooling-owned keys can't slip through.
     *
     * Only flip this to `true` if your caller is itself a framework or
     * library that owns a `$`-prefixed sub-namespace and knows the
     * conventions of any other tools writing into it. Same semantics as
     * the `setAttributes` option of the same name.
     */
    allowReservedAttributes?: boolean;
    /**
     * The ID of an existing run this run is being replayed from, if any.
     *
     * Recorded on the new run's `executionContext` as `replayedFromRunId` so
     * tooling (e.g. the dashboard runs list) can show that a run originated as
     * a replay and link back to its source. Set automatically by
     * {@link recreateRunFromExisting}; there's usually no reason to pass it
     * directly.
     *
     * Must be a run ID: `wrun_` followed by a 26-char ULID. It's a foreign key
     * to the source run, so `start()` validates the exact shape and rejects
     * anything else rather than persist a lineage link that points at garbage.
     */
    replayedFromRunId?: string;
    /**
     * Queue namespace of the target deployment. Scopes the workflow queue
     * topic to `__{namespace}_wkf_workflow_*` (e.g. `'eve'`) instead of the
     * default `__wkf_workflow_*`, and is also used for the cross-deployment
     * capability probe. Falls back to `WORKFLOW_QUEUE_NAMESPACE` in the
     * calling process.
     *
     * Within a deployment the env fallback is correct. Cross-context callers
     * (e.g. the observability dashboard replaying a run) must pass the
     * TARGET deployment's namespace explicitly: the env fallback resolves in
     * the caller's process, and a run enqueued to a topic the target has no
     * consumer for is never picked up.
     */
    namespace?: string;
}
export interface StartOptionsWithDeploymentId extends StartOptionsBase {
    /**
     * The deployment ID to use for the workflow run.
     *
     * By default, this is automatically inferred from environment variables
     * when deploying to Vercel.
     *
     * Set to `'latest'` to automatically resolve the most recent deployment
     * for the current environment (same production target or git branch).
     * This is only meaningful in worlds with atomic, immutable deployments
     * (currently Vercel). In other worlds (local dev, Postgres) there is no
     * notion of multiple deployments to resolve between, so `'latest'` has no
     * effect — a warning is logged and the run targets the current deployment.
     *
     * **Note:** When `deploymentId` is provided, the argument and return types become `unknown`
     * since there is no guarantee the types will be consistent across deployments.
     */
    deploymentId: 'latest' | (string & {});
}
export interface StartOptionsWithoutDeploymentId extends StartOptionsBase {
    deploymentId?: undefined;
}
/**
 * Options for starting a workflow run.
 */
export type StartOptions = StartOptionsWithDeploymentId | StartOptionsWithoutDeploymentId;
/**
 * Represents an imported workflow function.
 */
export type WorkflowFunction<TArgs extends unknown[], TResult> = (...args: TArgs) => Promise<TResult>;
/**
 * Represents the generated metadata of a workflow function.
 */
export type WorkflowMetadata = {
    workflowId: string;
};
/**
 * Starts a workflow run.
 *
 * @param workflow - The imported workflow function to start.
 * @param args - The arguments to pass to the workflow (optional).
 * @param options - The options for the workflow run (optional).
 * @returns The unique run ID for the newly started workflow invocation.
 */
export declare function start<TArgs extends unknown[], TResult>(workflow: WorkflowFunction<TArgs, TResult> | WorkflowMetadata, args: unknown[], options: StartOptionsWithDeploymentId): Promise<Run<unknown>>;
export declare function start<TResult>(workflow: WorkflowFunction<[], TResult> | WorkflowMetadata, options: StartOptionsWithDeploymentId): Promise<Run<unknown>>;
export declare function start<TArgs extends unknown[], TResult>(workflow: WorkflowFunction<TArgs, TResult> | WorkflowMetadata, args: TArgs, options?: StartOptionsWithoutDeploymentId): Promise<Run<TResult>>;
export declare function start<TResult>(workflow: WorkflowFunction<[], TResult> | WorkflowMetadata, options?: StartOptionsWithoutDeploymentId): Promise<Run<TResult>>;
//# sourceMappingURL=start.d.ts.map