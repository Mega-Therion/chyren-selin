export interface EnsureVercelOutputConfigResult {
    readonly agents: readonly EnsureVercelOutputConfigAgentResult[];
}
export interface EnsureVercelOutputConfigAgentInput {
    readonly appRoot: string;
    readonly buildCommand: string;
    readonly name?: string;
    readonly publicRoutePrefix: string;
    readonly servicePrefix: string;
}
export interface EnsureVercelOutputConfigAgentResult {
    readonly name?: string;
    readonly servicePrefix: string;
}
export declare function ensureEveVercelOutputConfig(input: {
    readonly agents: readonly EnsureVercelOutputConfigAgentInput[];
    readonly nextRoot: string;
}): Promise<EnsureVercelOutputConfigResult>;
