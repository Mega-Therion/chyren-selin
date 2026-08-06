/**
 * The pinned todo panel: pure parsing and rendering for the task list the
 * model maintains through the framework `todo` tool. The tool writes the
 * whole list on every call, so the panel is driven entirely from tool-call
 * inputs — no protocol addition and no durable client state. The renderer
 * owns lifecycle (when a call updates the panel, when the finished list
 * commits to the transcript); this module only reads inputs and paints rows.
 */
import type { Theme } from "./theme.js";
/** One panel row parsed from the `todo` tool's replacement-write input. */
export interface TodoPanelItem {
    readonly content: string;
    readonly status: "pending" | "in_progress" | "completed" | "cancelled";
}
/**
 * Extracts the panel items from a tool call when — and only when — it is a
 * `todo` replacement write. Read-only calls (no `todos`) and malformed items
 * return `undefined` so they fall through to the ordinary tool block.
 */
export declare function readTodoToolItems(toolName: string, input: unknown): TodoPanelItem[] | undefined;
/** True when every item reached a terminal status (completed or cancelled). */
export declare function allTodoItemsSettled(items: readonly TodoPanelItem[]): boolean;
export interface TodoPanelRowsInput {
    readonly items: readonly TodoPanelItem[];
    readonly width: number;
    readonly theme: Theme;
    /** True while the turn is running: pulses the header and the active item. */
    readonly working: boolean;
    /** Current shared pulse frame (the glyph, or a space on the off beat). */
    readonly pulse: string;
}
/**
 * Paints the pinned panel, indented so its marks share the tool column.
 * Settled items ride a `│` rail under the header; the
 * first unsettled item closes the rail with `└` and everything after hangs
 * indented — the list reads as progress flowing through the corner.
 */
export declare function renderTodoPanelRows(input: TodoPanelRowsInput): string[];
/**
 * The transcript form of a finished list: every item checked on the rail,
 * closed by `└ Done`. Committed verbatim (pre-styled rows) once every item
 * settles.
 */
export declare function renderFinishedTodoRows(items: readonly TodoPanelItem[], width: number, theme: Theme): string[];
