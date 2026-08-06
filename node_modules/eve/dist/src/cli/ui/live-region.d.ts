/**
 * The inline scrollback engine.
 *
 * Unlike a full-screen alt-buffer UI, the dev TUI streams its transcript into
 * the terminal's *native* scrollback so the user keeps real scrolling, copy /
 * paste, and a persistent transcript after exit. Two regions are maintained:
 *
 * - **Committed scrollback** — finalized rows printed once and owned by the
 *   terminal thereafter (never repainted).
 * - **Live region** — the still-streaming rows plus the sticky footer, redrawn
 *   in place on every update.
 *
 * Redrawing moves the cursor to the top of the previous live region, clears to
 * the end of the screen, and reprints. {@link flush} additionally writes a run
 * of newly-finalized rows above the live region so they scroll away for good.
 *
 * Writes go through the terminal's original `write` captured at construction,
 * so the renderer's foreign-output capture (which monkeypatches
 * `process.stdout.write`) never mistakes the engine's own paint for agent log
 * output.
 */
export interface LiveRegionOutput {
    write(chunk: string): boolean;
}
export interface LiveRegionOptions {
    /** Wrap each paint in synchronized-update markers to avoid flicker. */
    synchronized?: boolean;
}
export declare class LiveRegion {
    #private;
    constructor(output: LiveRegionOutput, options?: LiveRegionOptions);
    /** Hides the hardware cursor; the renderer draws its own caret. */
    hideCursor(): void;
    showCursor(): void;
    /** Toggles bracketed paste through the original write, bypassing foreign-output capture. */
    emitBracketedPaste(enabled: boolean): void;
    /** Writes a newline through the bound (original) write. */
    newline(): void;
    /**
     * Repaints the live region in place from `liveRows`. Each row must already
     * be styled and fit within the terminal width (one row == one screen line).
     */
    update(liveRows: readonly string[]): void;
    /**
     * Commits `committedRows` to scrollback above the live region, then repaints
     * `liveRows`. Committed rows are permanent and scroll with the terminal.
     */
    flush(committedRows: readonly string[], liveRows: readonly string[]): void;
    /**
     * Erases the live region, leaving the cursor at its former top. Committed
     * scrollback is untouched. Used on teardown before restoring the cursor.
     */
    clear(): void;
    /** Clears the visible transcript and, where supported, terminal scrollback. */
    clearAll(): void;
    /**
     * Forgets the live-region row count without moving the cursor. Call after
     * the cursor position is known to be a fresh column-0 line that the engine
     * did not itself paint (e.g. immediately after teardown).
     */
    reset(): void;
}
