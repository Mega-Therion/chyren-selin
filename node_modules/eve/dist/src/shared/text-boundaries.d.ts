/**
 * Shared grapheme-cluster boundaries for editable text. JavaScript offsets
 * stay UTF-16 offsets; segmentation defines which offsets are legal caret
 * positions and which spans editing operations may remove.
 */
interface GraphemeSpan {
    readonly text: string;
    readonly start: number;
    readonly end: number;
}
/** Splits text into grapheme clusters while preserving `String.slice` offsets. */
export declare function graphemes(text: string): GraphemeSpan[];
/** The nearest grapheme boundary strictly before `offset`. */
export declare function previousGraphemeBoundary(text: string, offset: number): number;
/** The nearest grapheme boundary strictly after `offset`. */
export declare function nextGraphemeBoundary(text: string, offset: number): number;
/** The nearest grapheme boundary at or after `offset`. */
export declare function graphemeBoundaryAtOrAfter(text: string, offset: number): number;
export {};
