import { generateText, type LanguageModel, type ModelMessage, type TelemetryOptions } from "ai";
import type { RuntimeModelReference } from "#runtime/agent/bootstrap.js";
import type { CompactionConfig, ToolLoopHarnessConfig } from "#harness/types.js";
/**
 * Best available input-token count: the model-reported count from the last
 * step, plus a rough character-based estimate of whatever messages have been
 * appended since.
 */
export declare function getInputTokenCount(messages: readonly ModelMessage[], config: CompactionConfig): number;
/**
 * Returns true when the message history and fixed compaction-prompt envelope
 * exceed the compaction threshold.
 */
export declare function shouldCompact(messages: readonly ModelMessage[], config: CompactionConfig): boolean;
/**
 * Resolves the model used to summarize older context during compaction.
 *
 * Reuses the active turn model when compaction should summarize with the same
 * reference, and resolves the authored compaction model only when configured.
 */
export declare function resolveCompactionModel(input: {
    readonly compactionModelReference?: RuntimeModelReference;
    readonly model: LanguageModel;
    readonly modelReference: RuntimeModelReference;
    readonly resolveModel: ToolLoopHarnessConfig["resolveModel"];
}): Promise<{
    readonly model: LanguageModel;
    readonly providerOptions: Parameters<typeof generateText>[0]["providerOptions"];
}>;
/**
 * Compacts messages by escalation: try each {@link CompactionHeuristic} in
 * order, then fall back to summarizing the older region with the compaction
 * model — keeping the recent tail verbatim when it fits, degrading it to
 * text-only, then shrinking the window.
 */
export declare function compactMessages(messages: ModelMessage[], model: LanguageModel, config: CompactionConfig, providerOptions?: Parameters<typeof generateText>[0]["providerOptions"], telemetry?: TelemetryOptions, headers?: Record<string, string>, abortSignal?: AbortSignal, forceSummary?: boolean): Promise<ModelMessage[]>;
