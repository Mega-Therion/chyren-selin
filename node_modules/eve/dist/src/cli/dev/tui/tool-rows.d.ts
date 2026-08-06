/**
 * Renders a tool block's terminal rows: the indented header (status glyph,
 * verb-bold title, summarized args), the `│`-railed detail region —
 * aggregated batch items or a write's diffed content — closed by a `└`
 * corner, and the settled result line. Split from `blocks.ts` so the block
 * model and its per-kind renderers stay separable concerns.
 */
import type { DisplayBlock, RenderBlockContext } from "./blocks.js";
import type { Theme } from "./theme.js";
export declare function renderTool(block: DisplayBlock, width: number, theme: Theme, context: RenderBlockContext): string[];
/**
 * An aggregated tool row lists at most this many member items; the rest
 * collapse into a single `… (N more)` line above the closing corner.
 */
export declare const maxVisibleToolGroupItems = 5;
