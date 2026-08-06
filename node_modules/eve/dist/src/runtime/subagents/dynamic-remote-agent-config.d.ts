import type { JsonObject } from "#shared/json.js";
export interface DynamicRemoteAgentConfig {
    readonly credentialsStepId?: string;
    readonly description: string;
    readonly forwardPrincipal?: boolean;
    readonly outputSchema?: JsonObject;
    readonly path: string;
    readonly url: string;
}
export declare function normalizeDynamicRemoteAgentConfig(input: {
    readonly name: string;
    readonly value: unknown;
}): Promise<DynamicRemoteAgentConfig>;
