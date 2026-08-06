import type { SetAttributesOptions } from './workflow/set-attributes.js';
export type { SetAttributesOptions };
/**
 * Host-side implementation for `setAttributes`. Workflow bodies resolve
 * to `./workflow/set-attributes.ts` via the `workflow` package-exports
 * condition; step bodies resolve here and can perform the world write
 * directly because they already run in host context.
 *
 * Plain application code still has no active workflow run, so it throws
 * a clear `FatalError`.
 */
export declare function setAttributes(attrs: Record<string, string | undefined>, options?: SetAttributesOptions): Promise<void>;
//# sourceMappingURL=set-attributes.d.ts.map