import type { Hook } from "#compiled/@workflow/core/index.js";
export declare function claimHookOwnership<T>(hook: Hook<T>): Promise<void>;
export declare function closeHookIterator<T>(iterator: AsyncIterator<T>): Promise<void>;
export declare function disposeHook(hook: {
    dispose?: () => unknown;
    [Symbol.dispose]?: () => unknown;
}): Promise<void>;
/** Recognizes hook conflicts across current and legacy Workflow World implementations. */
export declare function isHookConflictError(error: unknown): error is {
    readonly conflictingRunId?: unknown;
    readonly name: "HookConflictError";
    readonly token?: unknown;
};
