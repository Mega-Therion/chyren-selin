import type { VercelCreateOptions } from "#execution/sandbox/bindings/vercel-sdk-types.js";
export declare function getVercelSandboxFetch(createOptions: VercelCreateOptions): typeof globalThis.fetch;
export declare function getVercelSandboxCredentials(createOptions: VercelCreateOptions): Promise<VercelSandboxCredentials>;
export interface VercelSandboxCredentials {
    readonly projectId: string;
    readonly teamId: string;
    readonly token: string;
}
