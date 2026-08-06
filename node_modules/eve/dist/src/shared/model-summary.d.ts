/**
 * The one-line model summary grammar shared by the dev TUI's status line and
 * the /model menu's Change model hint: `slug@level ↯`. One implementation so
 * the two surfaces cannot drift.
 */
export declare function formatModelSummary(input: {
    model: string;
    /** Authored reasoning level; omitted renders the bare slug. */
    reasoning?: string;
    /** The Fast mode marker glyph, present only when the priority tier is on. */
    fastGlyph?: string;
}): string;
