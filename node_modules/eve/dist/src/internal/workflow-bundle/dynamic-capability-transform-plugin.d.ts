export declare function createDynamicCapabilityTransformPlugin(options?: {
    readonly dynamicRemoteAgents?: boolean;
    readonly dynamicTools?: boolean;
}): {
    transform(code: string, id: string): Promise<{
        code: string;
        map: null;
    } | null>;
    name: string;
};
