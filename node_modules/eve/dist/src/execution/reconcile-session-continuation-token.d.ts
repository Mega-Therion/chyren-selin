import type { ContextAccessor } from "#context/key.js";
import type { HarnessSession } from "#harness/types.js";
/** Re-stamps a session after a channel handler changes its continuation token. */
export declare function reconcileSessionContinuationToken(ctx: ContextAccessor, session: HarnessSession): HarnessSession;
