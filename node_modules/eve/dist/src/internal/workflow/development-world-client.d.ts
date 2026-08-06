import type { World } from "#compiled/@workflow/world/index.js";
/**
 * Raised when a delivery's recorded generation no longer exists on disk.
 * This never heals on retry, so the queue handler acknowledges and drops
 * the delivery instead of letting the queue redeliver it for its full
 * retry budget.
 */
export declare class MissingDevelopmentGenerationError extends Error {
    constructor(generationId: string, cause?: unknown);
}
/**
 * Worker-side Workflow World: an interface-faithful shim whose every method
 * forwards to the real local World in the CLI parent process.
 *
 * Why: a dev worker is disposed on every structural reload, so nothing with
 * run lifetime may live inside it. The `World` interface is already fully
 * async because production Worlds are remote services — inserting HTTP
 * between the runtime and the World changes topology, not semantics, and
 * makes development match production's compute/state split. The runtime
 * cannot observe the difference, so `@workflow/core` needs no changes and
 * this file is deletable the day a multi-process local World ships upstream.
 *
 * Two members are not simple forwards. `streams.get` must return a live
 * `ReadableStream`, so it uses a dedicated route and hands back the response
 * body. `createQueueHandler` points the other way entirely: it returns the
 * HTTP handler that the parent's queue posts deliveries into, and is where a
 * delivery gets pinned to the generation its run started on.
 */
export declare function createDevelopmentWorkflowWorld(): World;
