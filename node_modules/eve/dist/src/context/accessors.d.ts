import type { ContextKey } from "#context/key.js";
export type { Session, SessionAuth, SessionAuthContext, SessionParent, SessionTurn, } from "#context/keys.js";
/**
 * Returns the current value of a context key, or `undefined` when unset.
 *
 * @throws When called outside of a managed step execution.
 */
export declare function getContext<T>(key: ContextKey<T>): T | undefined;
/**
 * Returns the current value of a context key, throwing when unset.
 *
 * @throws When the key is not set or when called outside of a managed
 *   step execution.
 */
export declare function requireContext<T>(key: ContextKey<T>): T;
/**
 * Returns whether the key is currently set in the active context.
 *
 * @throws When called outside of a managed step execution.
 */
export declare function hasContext<T>(key: ContextKey<T>): boolean;
/**
 * Sets the durable value of a context key in the active context.
 *
 * Accepts either a direct value or an updater function that receives the
 * current value (or `undefined` if unset) and returns the next value.
 *
 * The new durable value is serialized at the end of the step and survives
 * future workflow steps and turns.
 *
 * @throws When called outside of a managed step execution.
 */
export declare function setContext<T>(key: ContextKey<T>, valueOrUpdater: T | ((current: T | undefined) => T)): T;
/**
 * Returns the current value of a context key or initializes and stores a
 * durable value when the key is unset.
 *
 * @throws When called outside of a managed step execution.
 */
export declare function ensureContext<T>(key: ContextKey<T>, create: () => T): T;
