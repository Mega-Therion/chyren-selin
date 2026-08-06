import type { MessageStreamEvent } from "#protocol/message.js";
import type { RuntimeHookRegistry } from "#runtime/hooks/registry.js";
import type { ContextContainer } from "./container.js";
/**
 * Fans one runtime stream event out to every matching subscriber.
 * Errors propagate — harness error paths convert them into the
 * recoverable `turn.failed` cascade. Caller must hold an active ALS
 * scope so hooks see the same context as the rest of the step.
 */
export declare function dispatchStreamEventHooks(input: {
    readonly ctx: ContextContainer;
    readonly registry: RuntimeHookRegistry;
    readonly event: MessageStreamEvent;
}): Promise<void>;
