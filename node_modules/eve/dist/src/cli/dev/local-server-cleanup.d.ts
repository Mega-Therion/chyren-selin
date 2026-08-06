export declare function recordCleanupIntent(appRoot: string, input: {
    readonly ownerPid: number;
    readonly runId: string;
}): Promise<() => Promise<void>>;
export declare function reconcileCleanupIntents(appRoot: string): Promise<void>;
