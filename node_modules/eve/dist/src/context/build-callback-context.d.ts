import type { SessionContext } from "#public/definitions/callback-context.js";
/**
 * Builds a {@link SessionContext} from the active ALS scope.
 *
 * Must be called inside a harness step (active `contextStorage.run`).
 * Throws when called outside an ALS scope.
 */
export declare function buildCallbackContext(): SessionContext;
