/**
 * Formats tool-call inputs and outputs for the terminal UI.
 *
 * Two registers: a *compact* one-line summary used while streaming and once a
 * call resolves (`get_weather  city="San Francisco" → 73°F`), and a *full*
 * pretty-printed value used when the user opts into `--tools full`. Both are
 * plain strings — color is applied by the block renderer.
 */
/**
 * Summarizes a tool's input as a compact, single-line `key=value` list.
 * Shallow object fields are shown inline; nested values collapse to a type
 * hint (`{…}`, `[3]`). Non-object inputs are rendered as a short literal.
 */
export declare function summarizeToolArgs(input: unknown, maxLength?: number): string;
/**
 * Summarizes a tool's output as a compact, single-line result. Scalars render
 * directly; strings collapse to their first non-empty line; arrays and objects
 * collapse to a count / key hint.
 */
export declare function summarizeToolResult(output: unknown, maxLength?: number): string;
/**
 * Pretty-prints a value across multiple lines for the expanded `--tools full`
 * view. Strings render directly; everything else is JSON with 2-space
 * indentation.
 */
export declare function formatValuePretty(value: unknown): string;
/**
 * Truncates `text` to at most `maxLength` visible characters, appending an
 * ellipsis. Operates on plain text (no ANSI) by contract.
 */
export declare function truncate(text: string, maxLength: number): string;
