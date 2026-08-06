import type { CodeModeFetchPolicy } from "./types.js";
export interface HostFetchRequest {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: string;
}
export interface HostFetchResponse {
    url: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
}
export declare function executeHostFetch({ request, fetch, policy, signal, }: {
    request: HostFetchRequest;
    fetch: typeof globalThis.fetch | undefined | false;
    policy: CodeModeFetchPolicy;
    signal?: AbortSignal;
}): Promise<HostFetchResponse>;
//# sourceMappingURL=fetch-policy.d.ts.map