/** Returns whether an Eve server answers its health route successfully. */
export declare function isEveServerHealthy(serverUrl: string, options?: {
    readonly signal?: AbortSignal;
    readonly timeoutMs?: number;
}): Promise<boolean>;
