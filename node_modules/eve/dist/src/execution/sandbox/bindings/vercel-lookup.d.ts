import type { VercelCreateOptions, VercelModule, VercelSandbox } from "#execution/sandbox/bindings/vercel-sdk-types.js";
export declare function getNamedVercelSandbox(input: {
    readonly createOptions: VercelCreateOptions;
    readonly sandboxModule: VercelModule;
    readonly sandboxName: string;
}): Promise<VercelSandbox | null>;
