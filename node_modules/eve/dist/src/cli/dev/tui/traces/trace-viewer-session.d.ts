/**
 * Owns one open `/traces` viewer: the store poller, the navigation state, and
 * frame production. The terminal renderer wires it to the alt screen and the
 * keyboard; everything else lives here so `terminal-renderer.ts` stays small
 * and the poll/repaint lifecycle is testable without a TTY.
 */
import type { TerminalKey } from "../stream-format.js";
import type { RgbColor } from "../terminal-background.js";
import type { Theme } from "../theme.js";
import type { TraceStore } from "./trace-store.js";
export interface TraceViewerOpenOptions {
    readonly appRoot: string;
    /** Current chat session — its trace opens first. */
    readonly sessionId?: string;
    /** Optional trace id (prefix) from `/traces <trace>`. */
    readonly reference?: string;
}
/** The renderer capability the runner's `/traces` dispatch awaits. */
export interface TraceViewerRenderer {
    open(options: TraceViewerOpenOptions): Promise<void>;
}
export interface TraceViewerSessionOptions extends TraceViewerOpenOptions {
    readonly theme: Theme;
    readonly paint: (rows: readonly string[]) => void;
    readonly dimensions: () => {
        readonly width: number;
        readonly height: number;
    };
    readonly tracingDisabled?: boolean;
    readonly store?: TraceStore;
    /** Receives drag-selected text (wired to the clipboard by the renderer). */
    readonly copyText?: (text: string) => void;
    /**
     * The terminal's default background from an earlier OSC 11 reply, so a
     * reopened viewer paints its card surfaces on the first frame instead of
     * waiting for the terminal to answer the probe again.
     */
    readonly terminalBackground?: RgbColor;
}
export declare class TraceViewerSession {
    #private;
    constructor(options: TraceViewerSessionOptions);
    start(): void;
    /** Feeds one key through the reducer; returns `"close"` when the viewer should close. */
    handleKey(key: TerminalKey): "close" | undefined;
    /**
     * Applies the terminal's OSC 11 background reply: derives the card
     * surfaces from the user's own palette and repaints. No-color themes keep
     * the plain rail rendering.
     */
    setTerminalBackground(background: RgbColor): void;
    repaint(): void;
    dispose(): void;
}
