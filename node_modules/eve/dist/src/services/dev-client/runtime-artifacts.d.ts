/**
 * Reads the dev server's runtime-artifacts revision — an opaque token that
 * changes whenever the authored-source watcher recompiles (HMR). Consumers
 * compare successive values to detect "the agent changed under me" and
 * refresh the development UI before the next turn.
 *
 * Never throws: any transport failure, non-2xx response, or malformed body
 * resolves to `undefined`, so callers treat "unknown" and "unreachable" the
 * same way.
 */
export declare function readDevelopmentRuntimeArtifactsRevision(input: {
    readonly serverUrl: string;
}): Promise<string | undefined>;
export declare function suspendDevelopmentRuntimeArtifacts(input: {
    readonly serverUrl: string;
}): Promise<boolean>;
export declare function resumeDevelopmentRuntimeArtifacts(input: {
    readonly serverUrl: string;
    readonly silent?: boolean;
}): Promise<string | undefined>;
export declare function rebuildDevelopmentRuntimeArtifacts(input: {
    readonly force?: boolean;
    readonly serverUrl: string;
}): Promise<string | undefined>;
