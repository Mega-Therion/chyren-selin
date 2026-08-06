import { type ToolDetailLine } from "./line-diff.js";
/** Renderer-ready copy derived from a tool call without owning its lifecycle. */
export interface ToolPresentation {
    readonly title: string;
    readonly subtitle: string;
    readonly summarizeResult: (output: unknown) => string | undefined;
    readonly group?: ToolGroupPresentation;
    /** Past-tense title used once the call settles successfully. */
    readonly doneTitle?: string;
    /** Salient body lines shown behind the `│` rail under the header. */
    readonly detail?: readonly ToolDetailLine[];
    /** When true, `detail` stays visible after the call settles (writes). */
    readonly keepDetailWhenDone?: boolean;
}
/**
 * Renderer-owned knowledge a presentation may fold in: what a write replaced
 * (from the session's file-content cache) and whether the file existed (from
 * the call's result, once it arrives).
 */
export interface ToolPresentationContext {
    readonly previousContent?: string;
    readonly existed?: boolean;
    /**
     * True when the tool dispatches a named subagent (each subagent exposes a
     * tool bearing its own name). The presentation reads as a delegation —
     * `Delegate stock-price` — instead of a generic tool call.
     */
    readonly isSubagent?: boolean;
}
/** Copy needed to aggregate equivalent calls without merging their state. */
export interface ToolGroupPresentation {
    readonly verb: string;
    readonly pastVerb: string;
    readonly singularNoun: string;
    readonly pluralNoun: string;
    readonly item: string;
}
/**
 * Extracts a write tool call's full-replacement payload. Exported so the
 * renderer can feed its file-content cache from the same contract the
 * presentation reads.
 */
export declare function readWriteFileInput(toolName: string, input: unknown): {
    path: string;
    content: string;
} | undefined;
/**
 * Turns known tool contracts into concise activity copy. Unknown or malformed
 * calls keep the generic formatter, so presentation can never break execution.
 */
export declare function presentTool(toolName: string, input: unknown, context?: ToolPresentationContext): ToolPresentation;
/**
 * Placeholder copy for a call whose input is still streaming from the model
 * (`action.preparing`). Known tools lead with their activity verb so the row
 * already reads as intent (`Fetch …`); unknown tools keep their name with a
 * quiet hint. The full presentation replaces this once the input arrives.
 */
export declare function presentPreparingTool(toolName: string, context?: ToolPresentationContext): ToolPresentation;
/**
 * Tools whose whole story renders through a dedicated surface — the pinned
 * todo panel, the question overlay — instead of a transcript tool block.
 * Both the preparing announcement and the full call must agree on this
 * set, or a panel-routed tool ghosts as a preparing block.
 */
export declare function isPanelRoutedTool(toolName: string): boolean;
/** The tool's short name with any connection/server namespace stripped. */
export declare function toolBaseName(toolName: string): string;
