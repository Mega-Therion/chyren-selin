export declare function stopDevelopmentSandboxResources(input: {
    readonly appRoot: string;
    readonly devRunId: string;
    readonly log?: (message: string) => void;
}): Promise<void>;
