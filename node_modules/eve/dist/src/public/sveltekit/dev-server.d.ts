import { type ChildProcess } from "node:child_process";
export declare const EVE_BASE_URL_ENV = "EVE_BASE_URL";
export interface EveProcessHandle {
    readonly origin: string;
    readonly process?: ChildProcess;
}
export interface EveDevServerRegistry {
    readonly appRoot: string;
    readonly origin: string;
    readonly pid: number | null;
    readonly updatedAt: string;
}
/**
 * Parse and validate a persisted dev-server registry record. Returns
 * `undefined` for anything that is not a well-formed registry so callers fall
 * back to spawning a fresh server.
 */
export declare function normalizeDevServerRegistry(value: unknown): EveDevServerRegistry | undefined;
/**
 * Resolve a shared eve dev server for {@link appRoot}, reusing a healthy
 * registered server when one exists and otherwise spawning a new one behind a
 * cross-process lock so concurrent SvelteKit processes don't each boot eve.
 */
export declare function resolveSharedEveDevServer(appRoot: string): Promise<EveProcessHandle>;
