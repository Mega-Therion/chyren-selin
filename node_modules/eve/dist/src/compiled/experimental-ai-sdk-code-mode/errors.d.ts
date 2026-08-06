import type { SerializableError } from "./types.js";
/**
 * Base class for errors raised by code mode.
 *
 * All package-specific errors include a stable `code` string and may include
 * structured `details` for diagnostics.
 */
export declare class CodeModeError extends Error {
    /**
     * Stable machine-readable error code.
     */
    code: string;
    /**
     * Optional structured diagnostic details.
     */
    readonly details?: unknown;
    constructor(message: string, code?: string, details?: unknown);
}
/**
 * Raised when a sandbox invocation exceeds its timeout.
 */
export declare class CodeModeTimeoutError extends CodeModeError {
    constructor(timeoutMs: number);
}
/**
 * Raised when the outer AI SDK abort signal aborts a code-mode invocation.
 */
export declare class CodeModeAbortedError extends CodeModeError {
    constructor();
}
/**
 * Raised when the process-global worker cap has been reached.
 *
 * Configure the cap with `setMaxWorkers`.
 */
export declare class CodeModeConcurrencyError extends CodeModeError {
    constructor(maxWorkers: number);
}
/**
 * Raised when the provided source exceeds `executionPolicy.maxSourceBytes`.
 */
export declare class CodeModeSourceTooLargeError extends CodeModeError {
    constructor(bytes: number, maxBytes: number);
}
/**
 * Raised when sandboxed code exceeds bridge request limits.
 *
 * Bridge requests include host tool calls and sandbox fetch calls.
 */
export declare class CodeModeBridgeLimitError extends CodeModeError {
    constructor(message: string, details?: unknown);
}
/**
 * Raised when sandboxed code starts host bridge work and returns without
 * awaiting or otherwise observing it.
 */
export declare class CodeModeDetachedBridgeRequestError extends CodeModeError {
    constructor(message: string, details?: unknown);
}
/**
 * Raised when the main thread and worker protocol observes an invalid or
 * mismatched message.
 */
export declare class CodeModeProtocolError extends CodeModeError {
    constructor(message: string, details?: unknown);
}
/**
 * Base class for failures caused by nested host tool execution.
 */
export declare class CodeModeToolError extends CodeModeError {
    constructor(message: string, details?: unknown);
}
/**
 * Raised when sandboxed code requests a tool that requires approval and no
 * approval callback approves it.
 */
export declare class CodeModeToolApprovalRequiredError extends CodeModeToolError {
    constructor(toolName: string, input: unknown, toolCallId: string);
}
/**
 * Raised when `approval.onApprovalRequired` denies a requested host tool call.
 */
export declare class CodeModeToolApprovalDeniedError extends CodeModeToolError {
    constructor(toolName: string, input: unknown, toolCallId: string, reason?: string);
}
/**
 * Raised when sandboxed `fetch` is unavailable, disallowed by policy, aborted,
 * too large, or otherwise fails during host fetch handling.
 */
export declare class CodeModeFetchError extends CodeModeError {
    constructor(message: string, details?: unknown);
}
/**
 * Converts an unknown thrown value into a worker-safe serializable shape.
 *
 * @internal
 */
export declare function serializeError(error: unknown): SerializableError;
/**
 * Converts host bridge failures into a sandbox-visible sanitized shape.
 *
 * This intentionally omits stack traces and diagnostic details. Full host
 * diagnostics should use `serializeError` through lifecycle hooks or telemetry.
 *
 * @internal
 */
export declare function serializeBridgeErrorForGuest(error: unknown, context: "tool" | "fetch" | "bridge"): SerializableError;
/**
 * Rehydrates a serialized worker error into an Error instance.
 *
 * @internal
 */
export declare function deserializeError(error: SerializableError): Error;
//# sourceMappingURL=errors.d.ts.map