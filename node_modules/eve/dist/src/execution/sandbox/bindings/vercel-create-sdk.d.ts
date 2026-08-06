import type { VercelCreateOptions, VercelModule, VercelSandbox } from "#execution/sandbox/bindings/vercel-sdk-types.js";
export type VercelSandboxCreateParams = VercelCreateOptions & {
    readonly name: string;
    readonly persistent: boolean;
    readonly source?: VercelCreateOptions["source"];
    tags?: Record<string, string> | undefined;
} & VercelSandboxInternalCreateOptions;
type VercelSandboxInternalCreateOptions = {
    readonly [key: `__${string}`]: unknown;
};
export type CreateVercelSandbox = (input: {
    readonly createOptions: VercelSandboxCreateParams;
    readonly sandboxModule: VercelModule;
}) => Promise<VercelSandbox>;
export declare function createVercelEveImageSandbox(input: {
    readonly createOptions: VercelSandboxCreateParams;
    readonly sandboxModule: VercelModule;
}): Promise<VercelSandbox>;
export {};
