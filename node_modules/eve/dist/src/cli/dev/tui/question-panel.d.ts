/**
 * Pure rendering for the HITL question panel — the overlay the agent's
 * `ask_question` tool opens above the input area. A full-width rule separates
 * it from the transcript, options render as numbered rows with their
 * descriptions always visible, and the trailing "Type your own answer" row
 * carries an inline elbow editor that receives focus the moment the cursor
 * rests on it (the provider-key grammar from the setup panel). The renderer
 * hosts lifecycle and keys; this module only paints rows.
 */
import type { AgentTUIInputOption } from "./runner.js";
import { type LineState } from "./line-editor.js";
import type { Theme } from "./theme.js";
export interface QuestionPanelState {
    readonly prompt: string;
    readonly options: readonly AgentTUIInputOption[];
    /** Row index under the cursor; `options.length` is the freeform row. */
    readonly cursor: number;
    /** Whether the trailing freeform row exists. */
    readonly allowFreeform: boolean;
    /** The freeform row's inline editor; focused while the cursor rests on it. */
    readonly editor: LineState;
    readonly caretVisible: boolean;
}
export declare function renderQuestionPanel(state: QuestionPanelState, theme: Theme, width: number): string[];
