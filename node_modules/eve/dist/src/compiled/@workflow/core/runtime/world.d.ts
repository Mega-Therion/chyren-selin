import type { World } from '#compiled/@workflow/world/index.js';
export type WorldFactoryModule = {
    createWorld?: () => World | Promise<World>;
    default?: (() => World | Promise<World>) | World;
};
/**
 * Create a World instance from a world factory module. Shared by
 * `createWorld()` (for the world package named by WORKFLOW_TARGET_WORLD) and
 * tooling that loads a world module dynamically (e.g. the Nitro dev
 * handler and `@workflow/world-testing`). World packages should export
 * `createWorld()`.
 */
export declare function createWorldFromModule(mod: WorldFactoryModule): World | Promise<World>;
/**
 * Create a new world instance based on environment variables.
 * WORKFLOW_TARGET_WORLD is used to determine the target world.
 *
 * Note: WORKFLOW_VERCEL_* env vars (PROJECT, TEAM, AUTH_TOKEN, etc.) are
 * intentionally NOT read here. Those are for CLI/observability tooling only
 * and should not affect runtime behavior. The Vercel runtime provides
 * authentication via OIDC tokens and project context via system env vars
 * (VERCEL_DEPLOYMENT_ID, VERCEL_PROJECT_ID). Tooling that needs these env
 * vars should call the Vercel world's createWorld() directly with an explicit
 * config and use setWorld() to inject the instance.
 */
export declare const createWorld: () => Promise<World>;
export type WorldHandlers = Pick<World, 'createQueueHandler' | 'specVersion'>;
/**
 * Some functions from the world are needed at build time, but we do NOT want
 * to cache the world in those instances for general use, since we don't have
 * the correct environment variables set yet. This is a safe function to
 * call at build time, that only gives access to non-environment-bound world
 * functions. The only binding value should be the target world.
 * Once we migrate to a file-based configuration (workflow.config.ts), we should
 * be able to re-combine getWorld and getWorldHandlers into one singleton.
 */
export declare const getWorldHandlers: () => Promise<WorldHandlers>;
export declare const getWorld: () => Promise<World>;
/**
 * Reset the cached world instance. This should be called when environment
 * variables change and you need to reinitialize the world with new config.
 */
export declare const setWorld: (world: World | undefined) => void;
//# sourceMappingURL=world.d.ts.map