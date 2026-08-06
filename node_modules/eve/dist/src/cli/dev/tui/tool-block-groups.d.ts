import type { Block, DisplayBlock } from "./blocks.js";
export interface ToolBlockDisplayGroup {
    readonly members: readonly Block[];
    readonly display: DisplayBlock;
}
/**
 * Coalesces presentation only; each member keeps its call id and lifecycle.
 *
 * A contiguous run of equivalent tool calls is partitioned by status, so a
 * batch with interleaved outcomes renders as one succeeded aggregate and one
 * failed aggregate instead of fragmenting on every status flip. A contiguous
 * run of same-named subagent calls coalesces the repeated headers into one
 * counted header, reorders the interleaved children call by call, and elides
 * all but the newest {@link maxVisibleSubagentRunChildren} children behind a
 * `… +N more` row. Captured log writes coalesce per
 * {@link GroupToolBlocksOptions.logCoalescing}. Because of all this, a
 * group's members are not always contiguous in the input: callers that
 * consume a group must remove its members by identity, never by prefix
 * length.
 */
export interface GroupToolBlocksOptions {
    /**
     * How captured log writes coalesce. `"window"` (the default, for the live
     * block window) merges every write of one source across the whole input
     * into a single section appended after the rest — a process stream is
     * continuous, so interleaved activity must not fragment it — and the
     * section commits as one cluster at the turn boundary. `"runs"` (for
     * committed-transcript rebuilds) merges only contiguous writes, so a
     * `/loglevel` toggle re-renders history at its committed positions instead
     * of relocating every past write to the end.
     */
    readonly logCoalescing?: "window" | "runs";
}
export declare function groupToolBlocksForDisplay(blocks: readonly Block[], options?: GroupToolBlocksOptions): ToolBlockDisplayGroup[];
/**
 * A live subagent section shows only its most recently active child row;
 * everything earlier collapses into a single `… (N more)` line under the
 * header. The completed section's counted footnote carries the full story.
 */
export declare const maxVisibleSubagentRunChildren = 1;
