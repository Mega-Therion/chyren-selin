import { EVE_WORKFLOW_FLOW_ROUTE_PATH } from "#internal/workflow-bundle/eve-service-route-output.js";
export { EVE_WORKFLOW_FLOW_ROUTE_PATH };
/**
 * Builds eve's Vercel preset options.
 *
 * The flow route's `functionRules` entry makes Nitro emit a dedicated
 * `flow.func` from the same build output, carrying the agent's queue trigger,
 * an extended execution window, and the environment the deployed workflow
 * runtime needs. Every other function setting (runtime, memory, streaming) is
 * inherited from the base server function config.
 */
export declare function createEveVercelOptions(input: {
    agentName: string;
    enabled: boolean;
    publicRoutePrefix?: string;
}): {
    config: {
        version: 3;
        framework: {
            slug: string;
            version: string;
        };
    };
    functionRules: {
        "/.well-known/workflow/v1/flow": {
            maxDuration: "max";
            experimentalTriggers: {
                type: "queue/v2beta";
                topic: string;
                consumer: string;
                retryAfterSeconds: number;
                initialDelaySeconds: number;
            }[];
            environment: Record<string, string>;
        };
    };
} | undefined;
