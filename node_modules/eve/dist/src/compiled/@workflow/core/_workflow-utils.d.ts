// Auto-generated stub for `@workflow/utils` types referenced by a vendored .d.ts.
// Emitted by scripts/vendor-compiled/@workflow/core.mjs.

export interface PromiseWithResolvers<T = unknown> {
  promise: Promise<T>;
  resolve(value: T | PromiseLike<T>): void;
  reject(reason?: unknown): void;
}
