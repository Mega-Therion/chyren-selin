import type { CodeModeInterruptPayload } from "./types.js";
declare const CODE_MODE_HOST_INTERRUPT_SIGNAL: unique symbol;
interface CodeModeHostInterruptSignal extends Error {
    readonly [CODE_MODE_HOST_INTERRUPT_SIGNAL]: true;
    readonly payload: CodeModeInterruptPayload;
}
/**
 * Interrupts the current nested host tool call and returns control to the host.
 *
 * Host tools can call this when they need an external pause, such as connection
 * OAuth. Code mode returns a serializable `CodeModeInterrupt` with an opaque
 * continuation instead of treating the pause as a tool failure.
 *
 * @param payload - JSON-serializable interruption payload with a stable `kind`.
 */
export declare function requestCodeModeInterrupt<TPayload extends CodeModeInterruptPayload>(payload: TPayload): never;
/**
 * Returns true when an unknown thrown value is the internal host-interrupt
 * signal thrown by `requestCodeModeInterrupt`.
 *
 * @internal
 */
export declare function isCodeModeHostInterruptSignal(value: unknown): value is CodeModeHostInterruptSignal;
export {};
//# sourceMappingURL=host-interrupt.d.ts.map