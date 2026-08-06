import type { Hook as HookEntity } from '#compiled/@workflow/world/index.js';
import type { Hook, HookOptions } from '../create-hook.js';
/**
 * NOTE: This is the implementation of `defineHook()` that is used in workflow contexts.
 */
export declare function defineHook<TInput, TOutput = TInput>(): {
    create(options?: HookOptions): Hook<TOutput>;
    resume: (_token: string, _payload: TInput) => Promise<HookEntity | null>;
};
//# sourceMappingURL=define-hook.d.ts.map