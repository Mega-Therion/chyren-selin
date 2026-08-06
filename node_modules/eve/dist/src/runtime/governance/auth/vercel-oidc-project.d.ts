import type { CurrentVercelProject } from "#runtime/governance/auth/types.js";
type VercelOidcProjectResolver = () => CurrentVercelProject | undefined | Promise<CurrentVercelProject | undefined>;
/**
 * Binds the current local project only to one request. The global symbol makes
 * the binding visible to both Nitro-inlined and disk-imported eve modules.
 */
export declare function withVercelOidcProjectResolver<T>(input: {
    readonly request: Request;
    readonly resolveCurrentProject: VercelOidcProjectResolver;
}, callback: () => Promise<T> | T): Promise<T>;
export declare function resolveVercelOidcCurrentProject(request: Request): Promise<CurrentVercelProject | undefined>;
export {};
