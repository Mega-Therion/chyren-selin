/**
 * Typed handle returned by {@link defineState}. Reads and updates a
 * named context slot.
 *
 * All operations require an active eve context (ALS scope) and throw
 * when called outside one.
 */
export interface StateHandle<T> {
    /** Read the current value. Returns `initial()` on first access within a context. */
    get(): T;
    /** Update the value with a function that receives the current value. */
    update(fn: (current: T) => T): void;
}
/**
 * Creates a typed, named state slot backed by a durable `ContextKey`.
 * `initial()` produces the value on first access within a context.
 *
 * The name must not start with the reserved `"eve."` prefix (reserved
 * for framework context keys); doing so throws.
 *
 * All operations require an active eve context. Calling `get()` or
 * `update()` outside of tools, hooks, or other framework-managed code
 * throws.
 *
 * State is durable: values survive across workflow step boundaries.
 * To reset per-turn, call `update(() => freshValue)` in a lifecycle
 * hook.
 *
 * ```ts
 * const budget = defineState("my-agent.budget", () => ({ count: 0, cap: 25 }));
 *
 * // In a tool or hook:
 * budget.update((s) => ({ ...s, count: s.count + 1 }));
 * const current = budget.get();
 * ```
 */
export declare function defineState<T>(name: string, initial: () => T): StateHandle<T>;
