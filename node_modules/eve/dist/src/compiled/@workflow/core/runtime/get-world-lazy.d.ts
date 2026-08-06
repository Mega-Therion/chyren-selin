/**
 * Lazy accessor for the World singleton via globalThis symbols.
 *
 * This module exists to break the static import chain from step-side
 * modules (serialization, run, helpers, start) to world.ts. Without it,
 * esbuild bundles world.ts (and its transitive deps: world-local,
 * world-vercel, process.cwd(), etc.) into the step registrations bundle,
 * which triggers Turbopack NFT tracing errors in the V2 combined flow route.
 *
 * Resolution order, in priority:
 *
 * 1. `globalThis[WorldCacheKey]` — populated by a successful prior
 *    `getWorld()` call. This is the steady-state hot path.
 * 2. `globalThis[GetWorldFnKey]` — populated by the module-load side
 *    effect at the bottom of `./world.ts`. Fires on every server bundle
 *    that reaches this file via `workflow` or `workflow/api` (which import
 *    `./world-init.ts` for its side effect; see that file for the full
 *    rationale). This is the cold-start path for routes that consume host
 *    helpers without any prior workflow run.
 */
import type { World } from '#compiled/@workflow/world/index.js';
export declare function getWorldLazy(): Promise<World>;
//# sourceMappingURL=get-world-lazy.d.ts.map