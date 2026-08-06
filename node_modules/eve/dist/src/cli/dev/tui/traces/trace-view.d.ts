/**
 * Pure frame renderer for the `/traces` conversation viewer: state in,
 * styled rows out. The layout is a header (trace identity), a body (the
 * conversation cards, plus the optional details drawer on the right), and a
 * footer (key hints + position/notice). Every row is clipped to the
 * terminal width so the alt-screen painter can write rows verbatim.
 */
import type { LocalTraceSpan } from "#tracing/local-trace-reader.js";
import type { Theme } from "../theme.js";
import type { TraceViewerSurfaces } from "./trace-surfaces.js";
import type { TextSelectionRange, TraceViewerState } from "./trace-viewer-state.js";
export interface TraceViewerFrame {
    readonly rows: readonly string[];
    /** Detail rows the panel has for the selected span — fed back into key handling. */
    readonly panelTotalRows: number;
    /** Body rows available to the conversation. */
    readonly timelineViewportRows: number;
    /** Body rows available to the panel. */
    readonly panelViewportRows: number;
    /** Column width the body renders at (expandability is width-dependent). */
    readonly contentWidth: number;
}
export interface RenderTraceViewerOptions {
    readonly width: number;
    readonly height: number;
    readonly theme: Theme;
    /** The viewed trace received spans recently — the window extends to "now". */
    readonly activeWindowEndNs?: bigint;
    /** Tracing is disabled via `EVE_TRACES=off` (empty-state copy). */
    readonly tracingDisabled?: boolean;
    /** Transient confirmation shown in the header's top-right corner. */
    readonly toast?: string;
    /**
     * Card surfaces derived from the terminal's background (OSC 11 probe).
     * Absent when the terminal never answered — cards fall back to rails.
     */
    readonly surfaces?: TraceViewerSurfaces;
}
export declare function renderTraceViewer(state: TraceViewerState, options: RenderTraceViewerOptions): TraceViewerFrame;
export declare function renderSpanDetail(span: LocalTraceSpan, innerWidth: number, theme: Theme, options?: {
    readonly excludeKeys?: ReadonlySet<string>;
    readonly surfaces?: TraceViewerSurfaces;
}): string[];
/**
 * Plain text covered by a drag selection over the conversation, extracted
 * from the same rendered lines the user saw.
 */
export declare function conversationSelectionText(state: TraceViewerState, width: number, theme: Theme, selection: TextSelectionRange, surfaces?: TraceViewerSurfaces): string;
/**
 * Plain text covered by a drag selection over the details drawer, extracted
 * from the same detail lines the frame painted. `totalWidth` is the full
 * terminal width — the drawer's width derives from it exactly as rendering
 * does, so columns map to the same cells the user selected.
 */
export declare function panelSelectionText(state: TraceViewerState, totalWidth: number, theme: Theme, selection: TextSelectionRange): string;
