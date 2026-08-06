/**
 * Navigation state for the `/traces` conversation viewer — a pure reducer in
 * the style of `select-state.ts`: keys go in, a new state (plus an optional
 * `close` effect) comes out, and rendering lives elsewhere. Data updates
 * from the store poller arrive through {@link applyTraceList}/
 * {@link applyLoadedTrace} so a live trace can grow underneath an open
 * viewer without losing the user's selection.
 */
import type { LocalTrace, LocalTraceSpan } from "#tracing/local-trace-reader.js";
import type { ConversationItem } from "#cli/dev/tui/traces/trace-conversation.js";
import type { TraceStoreEntry } from "#cli/dev/tui/traces/trace-store.js";
import type { TerminalKey } from "#cli/dev/tui/stream-format.js";
/**
 * Rows above the conversation body (padding, title, padding). Lives here
 * rather than in the renderer because the mouse handlers need the same
 * offset to map terminal rows to conversation lines.
 */
export declare const TRACE_VIEWER_HEADER_ROWS = 3;
export interface TraceViewerState {
    /** Stored traces, most recent activity first. */
    readonly traces: readonly TraceStoreEntry[];
    /** Index into `traces` of the trace being viewed. */
    readonly traceIndex: number;
    /** The loaded trace, or `undefined` while it has no readable spans. */
    readonly trace?: LocalTrace;
    /** The trace re-told as conversation items (system/user/assistant/tool cards). */
    readonly conversationItems: readonly ConversationItem[];
    /** Conversation cards toggled open (the system card starts collapsed). */
    readonly expandedItems: ReadonlySet<number>;
    /** Index into `conversationItems` of the highlighted card. */
    readonly selectedRow: number;
    /** First conversation line painted (line-level scroll offset). */
    readonly scrollRow: number;
    readonly panelOpen: boolean;
    /** Whether ↑/↓ scroll the details drawer instead of moving the selection. */
    readonly panelFocus: boolean;
    readonly panelScroll: number;
    /** One-line status for edge cases (trace pruned, tracing disabled, …). */
    readonly notice?: string;
    /** Mouse drag selection over the conversation or drawer, in line/column cells. */
    readonly textSelection?: TextSelectionRange;
}
/**
 * One end of a text selection: line index + 0-based column, both relative
 * to the selection's region — absolute conversation lines for the cards,
 * absolute detail lines (and panel-content columns) for the drawer.
 */
export interface TextSelectionPoint {
    readonly line: number;
    readonly column: number;
}
/** A drag selection from anchor (press) to head (latest drag position). */
export interface TextSelectionRange {
    readonly anchor: TextSelectionPoint;
    readonly head: TextSelectionPoint;
    /** The pointer moved off the anchor cell — release copies instead of clicking. */
    readonly dragging: boolean;
    /** Where the drag started; the selection stays in that region. */
    readonly region: "conversation" | "panel";
}
/** Selection endpoints ordered top-to-bottom for rendering and extraction. */
export declare function orderedTextSelection(selection: TextSelectionRange): {
    start: TextSelectionPoint;
    end: TextSelectionPoint;
};
/** Viewport metrics the controller measures so scrolling math stays pure. */
export interface TraceViewerKeyEnvironment {
    /** Body rows available to the conversation. */
    readonly timelineViewportRows: number;
    /** Body rows available to the detail panel. */
    readonly panelViewportRows: number;
    /** Total detail rows the panel would paint for the selected span. */
    readonly panelTotalRows: number;
    /** Body column width — card expandability is width-dependent. */
    readonly contentWidth: number;
    /**
     * Rendered height of each conversation card. The conversation viewport
     * scrolls by lines, not items — without these, long conversations overflow
     * the screen with no way to reach lower cards.
     */
    readonly conversationLineCounts?: readonly number[];
}
export interface TraceViewerKeyResult {
    readonly state: TraceViewerState;
    readonly effect?: "close";
    /** A completed drag selection to copy — the controller extracts and copies the text. */
    readonly copySelection?: TextSelectionRange;
}
export declare function createTraceViewerState(): TraceViewerState;
export declare function selectedTraceViewerSpan(state: TraceViewerState): LocalTraceSpan | undefined;
/** The number of selectable cards. */
export declare function traceViewerItemCount(state: TraceViewerState): number;
/**
 * Applies a fresh trace listing. The viewed trace is kept by identity across
 * reorders (a live trace climbs the list as spans land); when it disappears,
 * selection falls back to the newest trace. `preferTraceId` wins on first
 * load — the viewer opens on the current chat session's trace.
 */
export declare function applyTraceList(state: TraceViewerState, entries: readonly TraceStoreEntry[], options?: {
    readonly preferTraceId?: string;
}): TraceViewerState;
/**
 * Applies a freshly read trace. Selection follows the previously selected
 * card (span id + kind — cards can share spans) so live growth never jumps
 * the cursor; a pruned trace clears the view with a notice instead of
 * pretending stale data is current.
 */
export declare function applyLoadedTrace(state: TraceViewerState, trace: LocalTrace | undefined): TraceViewerState;
/** The one key handler: navigation, expansion, the details drawer, closing. */
export declare function reduceTraceViewerKey(state: TraceViewerState, key: TerminalKey, environment: TraceViewerKeyEnvironment): TraceViewerKeyResult;
