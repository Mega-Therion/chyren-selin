import type { ModelMessage } from "ai";
export declare const COMPACTION_CHECKPOINT_MARKER = "Summary of our conversation so far:";
/** Synthetic resumption prompt used when no real user message can be replayed. */
export declare const COMPACTION_RESUMPTION_MESSAGE = "Continue.";
/**
 * Label line of the framework-injected todo preservation message. Owned here
 * so compaction can recognize the message as synthetic when picking a user
 * message to replay after compaction.
 */
export declare const TODO_COMPACTION_PRESERVATION_LABEL = "[Your task list was preserved across context compaction]";
export interface CompactionPrompt {
    readonly prompt: string;
    readonly system: string;
}
/** Static prompt text added around checkpoint and conversation content. */
export declare const COMPACTION_PROMPT_ENVELOPE: {
    prompt: string;
    system: string;
};
/**
 * Builds the compaction model input from framework-owned checkpoint state and
 * older messages.
 *
 * Conversational text is rendered verbatim. When `transcriptBudgetTokens` is
 * set and the rendered prompt exceeds it, conversational text is capped at
 * {@link DEGRADED_TEXT_LIMIT} starting from the oldest entries until the
 * prompt fits; the previous checkpoint is never truncated.
 */
export declare function createCompactionPrompt(input: {
    readonly messages: readonly ModelMessage[];
    readonly previousCheckpoint: string | undefined;
    readonly transcriptBudgetTokens?: number;
}): CompactionPrompt;
export declare const TRANSCRIPT_PAYLOAD_LIMIT = 2000;
/**
 * Replaces the file parts of a `content` tool output with their text stubs,
 * leaving every other output shape untouched. History capping uses this so a
 * capped content output can never carry — or truncate into — a raw payload;
 * the stub matches the one the summarizer transcript renders.
 */
export declare function stubContentOutputFileParts(output: unknown): unknown;
