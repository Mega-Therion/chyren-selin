export declare function resolveEveDestinationPrefix(input: {
    readonly appRoot: string;
    readonly devServerTimeoutMs?: number;
    readonly logLabel?: string;
    readonly phase: string;
    readonly productionDestinationPrefix: string;
    readonly productionServerOrigin?: string;
}): Promise<string>;
