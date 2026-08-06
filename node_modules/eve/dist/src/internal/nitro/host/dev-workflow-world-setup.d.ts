import type { PreparedDevelopmentApplicationHost } from "#internal/nitro/host/types.js";
import { type ParentDevelopmentWorkflowWorld } from "#internal/workflow/development-world-server.js";
export declare function createDevelopmentWorkflowWorld(input: {
    readonly appRoot: string;
    readonly preparedHost: PreparedDevelopmentApplicationHost;
    readonly transportSecret: string;
}): ParentDevelopmentWorkflowWorld | undefined;
export declare function installWorkflowTransportEnvironment(appRoot: string, secret: string): () => void;
export declare function installWorkflowLocalQueueEnvironment(serverUrl: string): () => void;
