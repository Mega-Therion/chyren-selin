/**
 * Shared output truncation utilities for framework tool executors.
 *
 * Every framework tool that can return unbounded text output (bash,
 * grep, glob, read_file, web_fetch) uses these helpers to enforce
 * consistent size limits inside its executor before the result enters
 * conversation history. Authored tools are expected to do the same —
 * bounding at the source keeps the contract simple: whatever `execute`
 * returns is what the model sees.
 */
/**
 * Maximum number of lines kept after truncation.
 */
export declare const MAX_OUTPUT_LINES = 2000;
/**
 * Maximum byte size of the truncated output.
 */
export declare const MAX_OUTPUT_BYTES: number;
/**
 * Maximum length of a single line before it is truncated.
 */
export declare const MAX_LINE_LENGTH = 2000;
/**
 * Suffix appended to lines exceeding {@link MAX_LINE_LENGTH}.
 */
export declare const LINE_TRUNCATION_SUFFIX = " [truncated]";
/**
 * Result of a {@link truncateTail} or {@link truncateHead} call.
 */
export interface TruncationResult {
    /** The truncated output text. */
    readonly output: string;
    /** True when the output was shortened. */
    readonly truncated: boolean;
    /** Total number of lines in the original input. */
    readonly totalLines: number;
    /** Number of lines included in the truncated output. */
    readonly outputLines: number;
}
/**
 * Keeps the **first** lines of `text` that fit within the line and byte
 * budgets. This is the default shape of tool-result truncation — most
 * tool output (file contents, grep results, web fetches) is more
 * informative at the beginning.
 *
 * Each included line is individually capped at {@link MAX_LINE_LENGTH}
 * characters. Iteration starts from the beginning and stops when either
 * the line count reaches {@link MAX_OUTPUT_LINES} or cumulative byte
 * size would exceed {@link MAX_OUTPUT_BYTES}.
 */
export declare function truncateHead(text: string): TruncationResult;
/**
 * Keeps the **last** lines of `text` that fit within the line and byte
 * budgets. Useful for bash output where errors and results appear at
 * the end.
 *
 * Each included line is individually capped at {@link MAX_LINE_LENGTH}
 * characters. Iteration starts from the end and stops when either the
 * line count reaches {@link MAX_OUTPUT_LINES} or cumulative byte size
 * would exceed {@link MAX_OUTPUT_BYTES}.
 */
export declare function truncateTail(text: string): TruncationResult;
/**
 * Caps a single line at {@link MAX_LINE_LENGTH} characters, appending
 * {@link LINE_TRUNCATION_SUFFIX} when truncated.
 *
 * Exported for tools that build their own output line-by-line (e.g.
 * `read_file` prepends line numbers, `grep` counts matches) so they
 * share the same per-line cap as {@link truncateHead} / {@link truncateTail}
 * without re-implementing the slice+suffix pattern.
 */
export declare function capLineLength(line: string): string;
