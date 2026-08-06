/**
 * Read-only view over the active context.
 *
 * Used by context providers and codec deserialization to read values
 * without mutating durable context.
 */
export interface ContextReader {
    get<T>(key: ContextKey<T>): T | undefined;
    require<T>(key: ContextKey<T>): T;
    has<T>(key: ContextKey<T>): boolean;
}
/**
 * Read/write view over the active context.
 *
 * Extends {@link ContextReader} with durable write operations. This is
 * the narrow contract shared by {@link AlsContext} and the channel-facing
 * `ContextAccessor`.
 */
export interface ContextAccessor extends ContextReader {
    set<T>(key: ContextKey<T>, updater: T | ((current: T | undefined) => T)): T;
    ensure<T>(key: ContextKey<T>, create: () => T): T;
}
/**
 * Serialization hooks for one context key.
 *
 * `deserialize` receives the already-hydrated durable context so codecs can
 * depend on earlier durable keys such as the compiled runtime bundle.
 */
export interface ContextKeyCodec<T> {
    serialize(value: T): unknown;
    deserialize(data: unknown, ctx: ContextReader): T | Promise<T>;
}
export interface ContextKeyOptions<T> {
    readonly codec?: ContextKeyCodec<T>;
}
/**
 * Typed key that identifies a named context slot.
 */
export declare class ContextKey<T> {
    readonly name: string;
    readonly codec?: ContextKeyCodec<T>;
    constructor(name: string, options?: ContextKeyOptions<T>);
}
/**
 * Looks up a registered key by name. Returns `undefined` for unknown names.
 */
export declare function resolveKey(name: string): ContextKey<unknown> | undefined;
