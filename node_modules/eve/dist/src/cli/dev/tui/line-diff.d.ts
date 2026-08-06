/**
 * Pure line diffing for the write block's rail. The TUI computes diffs
 * client-side from content it has already seen (write inputs, full-file read
 * results) — putting prior content into the tool's output would feed it
 * straight back into model context, paying tokens for something only the
 * terminal needs.
 */
/** One rail row under a tool header. `kind` is unset for plain/context text. */
export interface ToolDetailLine {
    readonly text: string;
    readonly kind?: "added" | "removed" | "gap";
}
/**
 * Builds the write rail for `content` against what it replaced.
 *
 * - `previous` known → a windowed line diff (changes with two context lines,
 *   unchanged stretches collapsed behind `gap` rows); identical content
 *   yields no rows.
 * - `previous` unknown but the file provably did not exist → every line is
 *   an addition.
 * - otherwise → plain content rows, because inventing `+` markers for an
 *   overwrite would misread as "everything changed".
 */
export declare function diffWriteDetail(previous: string | undefined, content: string, existed?: boolean): ToolDetailLine[];
