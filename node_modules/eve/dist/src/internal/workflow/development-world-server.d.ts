/**
 * The application's one local Workflow World, owned by the CLI parent.
 *
 * Why the parent: run records, the queue, and stream state must outlive the
 * Nitro dev worker, which is disposed on every structural reload. The parent
 * is the only process whose lifetime matches the run data, so it holds the
 * real (stock, vendored) world-local instance and serves it to workers over
 * an RPC route on the public listener; workers hold only an
 * interface-faithful client. Deliveries are not served here — the queue
 * posts them through the public listener to the active worker like any
 * other request, so drained replacement covers them automatically.
 *
 * `handleRequest` must be reachable before `start()` runs: starting the
 * world begins queue redelivery immediately, and a delivery's first World
 * call arrives back on the listener within milliseconds.
 */
export interface ParentDevelopmentWorkflowWorld {
    close(): Promise<void>;
    handleRequest(request: Request): Promise<Response | undefined>;
    start(): Promise<void>;
}
export declare function createParentDevelopmentWorkflowWorld(input: {
    readonly agentName: string;
    readonly appRoot: string;
    readonly resolveActiveGenerationId: () => string;
    readonly transportSecret: string;
}): ParentDevelopmentWorkflowWorld;
