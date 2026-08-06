export { checkAgentConfigSource } from "./agent-config-ast.js";
export type AgentConfigStringPathPatch = {
    readonly kind: "set";
    readonly value: string;
} | {
    readonly kind: "remove";
    readonly removable?: (value: string) => boolean;
};
export type AgentConfigStringPathEdit = {
    readonly kind: "applied";
    readonly nextSource: string;
} | {
    readonly kind: "bail";
    readonly reason: string;
    readonly line: number;
};
/** Safely applies one literal string leaf below `defineAgent({ ... })`. */
export declare function applyAgentConfigStringPath(sourceText: string, path: readonly [string, ...string[]], patch: AgentConfigStringPathPatch): Promise<AgentConfigStringPathEdit>;
