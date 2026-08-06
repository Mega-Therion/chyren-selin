export declare function stripAnsi(input: string): string;
export declare function stripTerminalControls(input: string): string;
export declare function visibleLength(input: string): number;
export declare function sliceVisible(input: string, width: number): string;
/** Clips text styled only at grapheme boundaries, resetting any truncated style. */
export declare function clipVisible(input: string, width: number): string;
/** Terminal-cell width of editor text, measured one grapheme cluster at a time. */
export declare function inputTextWidth(input: string): number;
/** Expands editor tabs to the same fixed four cells used by {@link inputTextWidth}. */
export declare function renderInputText(input: string): string;
interface BlockCursorInput {
    readonly before: string;
    readonly under: string;
    readonly after: string;
    readonly visible: boolean;
    readonly inverse: (text: string) => string;
    readonly render?: (text: string) => string;
}
/** Renders a blinking block cursor without inserting or removing a terminal cell. */
export declare function renderInputWithBlockCursor(input: BlockCursorInput): string;
/**
 * Returns the UTF-16 offset at or immediately before a terminal column.
 * Graphemes stay intact even when the requested column falls inside a wide one.
 */
export declare function offsetAtVisibleColumn(input: string, column: number): number;
/**
 * Word-wraps a single logical line to `width` visible columns, preserving
 * ANSI styling and never splitting inside an escape sequence. Breaks on the
 * last space that fits; falls back to a hard cut for unbreakable runs.
 *
 * Tokenizes once and walks the units with a cursor, so a long unbroken
 * payload wraps in linear time instead of re-measuring the remainder on
 * every emitted row.
 */
export declare function wrapVisibleLine(line: string, width: number): string[];
export {};
