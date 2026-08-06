/**
 * Builds the startup header the dev TUI commits to scrollback before the
 * first prompt: one `eve <agent name>` brand line, a discovery-diagnostics
 * line when the compiler reported problems, and a rotating tip for local
 * sessions. The resolved model is not repeated here — it lives on the
 * persistent status line at the bottom.
 */
import type { AgentInfoResult } from "#client/index.js";
import type { Theme } from "./theme.js";
export interface AgentHeaderInput {
    /** Resolved display name (e.g. "weather-agent"). */
    name: string;
    /** Agent inspection payload, or `undefined` when it could not be fetched. */
    info?: AgentInfoResult;
    theme: Theme;
    /** Available terminal width. */
    width: number;
    /** Message-of-the-day line rendered under the brand line, when present. */
    tip?: string;
}
/**
 * The header's message-of-the-day pool. All entries reference local-only
 * slash commands, so callers only attach a tip to local `eve dev` sessions.
 */
export declare const AGENT_HEADER_TIPS: readonly string[];
/** Picks one tip; `random` is a test seam over Math.random. */
export declare function pickAgentHeaderTip(random?: () => number): string;
/**
 * Returns the styled rows of the startup header (no trailing blank line is
 * added by callers other than the one separating it from the transcript).
 */
export declare function buildAgentHeader(input: AgentHeaderInput): string[];
