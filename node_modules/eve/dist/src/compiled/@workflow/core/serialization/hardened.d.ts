/**
 * Hardened introspection for serializing values that may originate inside a
 * workflow VM (`node:vm`) sandbox realm.
 *
 * Serialization runs on the host, but the values it inspects were
 * constructed by workflow code — so a naive dynamic operation like
 * `value.toISOString()`, `Array.from(map)`, or `Object.prototype.toString`
 * dispatches into the sandbox realm and executes workflow code (patched
 * prototype methods, getters, proxy traps, `Symbol.toStringTag` accessors).
 * That is a determinism hazard: serialization happens exactly once per
 * payload (never again on replay), so any workflow-visible side effect it
 * triggers exists only on the live execution path and diverges from replay.
 *
 * This module makes serialization side-effect free wherever the data allows
 * it, and *observable* where it does not:
 *
 * - **Classification** uses engine-level brand checks (`node:util` `types`,
 *   internal-slot probes) instead of `instanceof` / `Object.prototype.toString`
 *   — immune to `Symbol.hasInstance`, `Symbol.toStringTag`, and reassigned
 *   globals.
 * - **Extraction** goes through intrinsics captured at module load (host
 *   boot, before any workflow code runs). Internal slots are realm-agnostic,
 *   so host intrinsics read VM-realm objects without touching the sandbox's
 *   (patchable) prototypes.
 * - **Property access** reads through descriptors, so plain data never
 *   invokes anything. Where workflow code *must* run because the data itself
 *   lives behind it — getters, proxies, custom `[WORKFLOW_SERIALIZE]`
 *   methods, `toString()` on toStringTag-branded objects (e.g. Temporal
 *   polyfills) — the execution is preserved for compatibility and recorded
 *   in the active {@link GuestCodeStats} sink, so callers (e.g. a retained-VM
 *   gate) can react.
 *
 * **Recording is not prevention.** For the recorded cases the determinism
 * hazard is still live: a getter that calls `Math.random()` advances the
 * run's seeded PRNG during serialization, and because serialization happens
 * exactly once and is never replayed, every subsequent draw — including the
 * correlation ids derived from that stream — shifts relative to replay. The
 * report is the only trace of that; acting on it (warning, demoting a
 * retained VM to replay) is left to the caller.
 *
 * The recorder is ambient module state, set for the duration of a
 * synchronous `stringify` call via {@link withGuestCodeStats}. devalue's
 * `stringify` is fully synchronous, so this is safe without async context.
 */
import type { StringifyOperations } from '../_devalue.js';
/**
 * A single instance of workflow (guest) code executing during serialization.
 */
export interface GuestCodeExecution {
    /**
     * What forced the execution:
     * - `getter`: an accessor property was invoked to read data
     * - `proxy`: a proxy was introspected, firing its traps. Note this also
     *   implies a **shape change**: brand checks answer "not that type" for a
     *   proxy, so a proxied `Map` serializes as a plain object rather than as a
     *   `Map`, and this report is the only evidence of it. (Such values were
     *   never serializable before — the internal-slot reads in the previous
     *   implementation threw on them — so the shape change replaces a crash,
     *   but it is silent.)
     * - `method`: a workflow-defined function was invoked (e.g. a custom
     *   `[WORKFLOW_SERIALIZE]` serializer, `toString()` on a
     *   `Symbol.toStringTag`-branded object, a duck-typed `getTime()`, or a
     *   `__closureVarsFn` this package did not generate)
     */
    kind: 'getter' | 'proxy' | 'method';
    /** Best-effort context: the property key, method name, or tag involved. */
    detail?: string;
}
/**
 * Mutable sink recording every workflow-code execution serialization could
 * not avoid. Pass via `CodecOptions.guestCodeStats`; consumers that retain
 * the VM across steps can use a non-empty `executions` array as a signal
 * that the VM state may have been perturbed by serialization.
 */
export interface GuestCodeStats {
    executions: GuestCodeExecution[];
}
/**
 * Runs `fn` (synchronously) with `stats` as the active guest-code sink.
 * Nested calls stack correctly; a `null`/`undefined` sink disables
 * recording without disabling hardening.
 */
export declare function withGuestCodeStats<T>(stats: GuestCodeStats | undefined, fn: () => T): T;
/** Marks a function as having been passed to `useStep`. */
export declare function markUseStepClosureFn<T extends object>(fn: T): T;
/** Whether `fn` was marked by {@link markUseStepClosureFn}. */
export declare function isUseStepClosureFn(fn: unknown): boolean;
export declare function recordGuestCode(kind: GuestCodeExecution['kind'], detail?: string): void;
/** `Date.prototype.getDate`, for invalid-date checks. */
export declare const dateGetDate: (thisArg: unknown) => number;
/** `Date.prototype.getTime`. */
export declare const dateGetTime: (thisArg: unknown) => number;
/** `Date.prototype.toISOString`. */
export declare const dateToISOString: (thisArg: unknown) => string;
/** `RegExp.prototype.source` getter. */
export declare const regExpSource: (value: unknown) => string;
/** `RegExp.prototype.flags` getter. */
export declare const regExpFlags: (value: unknown) => string;
/** `ArrayBuffer.prototype.byteLength` getter (internal slot read). */
export declare const arrayBufferByteLength: (value: unknown) => number;
/**
 * Reads `value[key]` with `[[Get]]` semantics, but through descriptors:
 * plain data properties never invoke anything; accessor properties are
 * invoked (the data lives behind them) and recorded; proxies fall back to
 * a plain read (their traps are the only access path) and are recorded.
 */
export declare function readProperty(value: unknown, key: PropertyKey): unknown;
/**
 * `key in value` semantics without firing proxy traps for ordinary
 * objects. Proxies fall back to the `in` operator and are recorded.
 */
export declare function hasProperty(value: unknown, key: PropertyKey): boolean;
/**
 * `value instanceof C` semantics for a known `C.prototype`, without
 * consulting `Symbol.hasInstance` (which workflow code can define). Used
 * for host classes that are injected into the sandbox (Headers, URL,
 * URLSearchParams, DOMException), where the instances — from any realm the
 * host handed the class to — carry the host prototype in their chain.
 *
 * Proxies are walked rather than rejected: `Reflect.getPrototypeOf` fires
 * the proxy's `getPrototypeOf` trap, matching `instanceof` semantics, and
 * real values depend on that — Next.js hands the runtime a proxied
 * `NextRequest`, and answering "not a Request" for it would silently break
 * webhooks. The traps are guest-observable, so the proxy is recorded.
 */
export declare function isInstanceOfPrototype(value: unknown, prototype: object | undefined): boolean;
/** `URL.prototype.href` getter. */
export declare function urlHref(value: URL): string;
/** `URLSearchParams.prototype.toString` — returns `''` iff empty. */
export declare function urlSearchParamsToString(value: URLSearchParams): string;
/**
 * Iterates a Headers instance through the captured host iterator, so the
 * iterator object — and its `next` — are host-realm.
 */
export declare function headersToEntries(value: Headers): [string, string][];
/**
 * Iterates a genuine Map's entries entirely through host intrinsics: the
 * iterator object is created by the host `Map.prototype.entries`, so its
 * realm — and therefore its `next` — is the host's, not the sandbox's.
 */
export declare function mapToEntries(value: Map<unknown, unknown>): [unknown, unknown][];
/** See {@link mapToEntries}. */
export declare function setToValues(value: Set<unknown>): unknown[];
/**
 * The bytes of an `ArrayBufferView`, read via internal-slot getters —
 * own-property shadowing and prototype patches cannot change which bytes
 * are serialized.
 */
export declare function viewInfo(value: ArrayBufferView): {
    buffer: ArrayBufferLike;
    byteOffset: number;
    byteLength: number;
};
export declare const hardenedStringifyOperations: Partial<StringifyOperations>;
//# sourceMappingURL=hardened.d.ts.map