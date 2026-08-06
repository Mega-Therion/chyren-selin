import { type WorkflowOrchestratorContext } from '../private.js';
import { ABORT_HOOK_TOKEN, ABORT_STREAM_NAME } from '../symbols.js';
/**
 * A lightweight AbortSignal implementation for the workflow VM context.
 *
 * `signal.aborted` and listeners are updated in two scenarios:
 * 1. On first-run: when `abort()` is called in the workflow code
 * 2. On replay: when the events consumer processes the `hook_received`
 *    event (chained through promiseQueue for deterministic ordering)
 *
 * On replay, `abort()` in the workflow code becomes a no-op since
 * `_setAborted` was already called by the events consumer.
 */
export declare class WorkflowAbortSignal {
    #private;
    aborted: boolean;
    reason: unknown;
    readonly [ABORT_STREAM_NAME]: string;
    readonly [ABORT_HOOK_TOKEN]: string;
    get onabort(): ((this: WorkflowAbortSignal) => void) | null;
    set onabort(handler: ((this: WorkflowAbortSignal) => void) | null);
    constructor(streamName: string, hookToken: string);
    /**
     * @internal Sets aborted state and fires listeners.
     * Called by abort() on first-run, or by the events consumer on replay.
     * Idempotent — second call is a no-op.
     */
    _setAborted(reason?: unknown): void;
    addEventListener(type: string, listener: () => void): void;
    removeEventListener(type: string, listener: () => void): void;
    throwIfAborted(): void;
}
/**
 * Creates a workflow-context `AbortController` class that uses hooks for
 * durable state and streams for real-time step propagation.
 *
 * Follows the same pattern as `createCreateHook()` in `workflow/hook.ts`:
 * - Registers a hook in the invocations queue on construction
 * - Subscribes to the events consumer for hook_created/hook_received events
 * - `abort()` calls `_setAborted` + marks the hook for resumption
 * - The suspension handler processes the abort (creates event + writes stream)
 * - On replay, the events consumer calls `_setAborted` when hook_received
 *   is processed, and `abort()` in the workflow code becomes a no-op
 */
export declare function createCreateAbortController(ctx: WorkflowOrchestratorContext): {
    new (): {
        readonly signal: WorkflowAbortSignal;
        abort(reason?: unknown): void;
        readonly [ABORT_STREAM_NAME]: string;
        readonly [ABORT_HOOK_TOKEN]: string;
    };
};
/**
 * Creates a workflow-context `AbortSignal` object with static methods.
 */
export declare function createAbortSignalStatics(): {
    abort: (reason?: unknown) => WorkflowAbortSignal;
    any: (signals: Iterable<{
        aborted: boolean;
        reason?: unknown;
        addEventListener?: Function;
    }>) => WorkflowAbortSignal;
    timeout: () => never;
};
//# sourceMappingURL=abort-controller.d.ts.map