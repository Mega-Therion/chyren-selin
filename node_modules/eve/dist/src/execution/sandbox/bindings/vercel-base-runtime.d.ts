import type { VercelCreateOptions, VercelSandbox } from "#execution/sandbox/bindings/vercel-sdk-types.js";
/**
 * Prepares a fresh Vercel sandbox for use by the framework.
 */
export declare function ensureVercelSandboxBaseRuntime(sandbox: VercelSandbox): Promise<void>;
export declare function applyInitialVercelNetworkPolicy(sandbox: VercelSandbox, networkPolicy: VercelCreateOptions["networkPolicy"]): Promise<void>;
