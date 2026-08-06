export declare const EVE_SHARED_SERVER_FUNCTION_PATH = "eve/__server.func";
/** Route Nitro's Vercel preset emits as the queue-triggered workflow function. */
export declare const EVE_WORKFLOW_FLOW_ROUTE_PATH = "/.well-known/workflow/v1/flow";
export declare function isEveVercelFunctionPath(path: string): boolean;
export declare function normalizeEveVercelRoutes(routes: readonly unknown[], _servicePrefix: string | undefined): unknown[];
