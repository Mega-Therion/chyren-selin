/**
 * Per-step holding pen for the full interrupt signal a tool returns from
 * `execute`.
 *
 * A tool signals a park (e.g. connection OAuth) by *returning* an
 * {@link AuthorizationSignal}. The AI SDK records that return value as the
 * tool-result `output`, which `experimental_telemetry`'s `recordOutputs`
 * exports to OTel spans. So the {@link "#harness/tools.js"} wrapper hands the
 * AI SDK a `resume`-redacted copy of the signal and stashes the full signal
 * here; the park detector reads it back so the journaled challenges keep
 * their `resume` value.
 *
 * Virtual context: never serialized, wiped each step. Set during `execute`
 * and read post-step within the same `runStep` scope, so the slot always
 * outlives the read and never crosses a boundary.
 */
import type { AlsContext } from "#context/container.js";
import type { AuthorizationSignal } from "#harness/authorization.js";
/** Stashes a tool's full interrupt signal under its `toolCallId` for the current step. */
export declare function stashToolInterrupt(ctx: AlsContext, toolCallId: string, signal: AuthorizationSignal): void;
/** Reads the full interrupt signal stashed for `toolCallId`, if any. */
export declare function readToolInterrupt(ctx: AlsContext, toolCallId: string): AuthorizationSignal | undefined;
