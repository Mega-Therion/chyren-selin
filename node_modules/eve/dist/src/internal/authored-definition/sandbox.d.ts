import type { SandboxBackend } from "#public/definitions/sandbox-backend.js";
import type { SandboxDefinition, SandboxRevalidationKeyFn } from "#public/definitions/sandbox.js";
type NormalizedSandboxDefinition = Readonly<Omit<SandboxDefinition, "backend">> & {
    readonly backend?: SandboxBackend;
    readonly description?: string;
    readonly revalidationKey?: SandboxRevalidationKeyFn;
};
/**
 * Normalizes one authored sandbox definition into the canonical internal
 * shape. If the author supplied a `backend` callback (e.g.
 * `backend: () => vercel({...})`), it is wrapped via
 * {@link lazyBackend} so downstream consumers always see a plain
 * `SandboxBackend` value — the callback fires exactly once on first
 * access and the resulting backend is memoized.
 */
export declare function normalizeSandboxDefinition(value: unknown, message: string): NormalizedSandboxDefinition;
export {};
