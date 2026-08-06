type CliMessageTone = "accent" | "danger" | "default" | "info" | "muted" | "subagent" | "success" | "warning";
/**
 * Shared color palette used by the eve CLI.
 */
export interface CliTheme {
    readonly color: boolean;
    accent(text: string): string;
    danger(text: string): string;
    heading(text: string): string;
    info(text: string): string;
    label(text: string): string;
    muted(text: string): string;
    plain(text: string): string;
    subagent(text: string): string;
    success(text: string): string;
    warning(text: string): string;
}
/**
 * One labeled value rendered inside a CLI section.
 */
export interface CliRow {
    readonly label: string;
    readonly tone?: CliMessageTone;
    readonly value: string;
}
export declare function sanitizeForTerminal(input: string): string;
/**
 * Creates the theme used by CLI commands and the interactive REPL.
 */
export declare function createCliTheme(input?: {
    color?: boolean;
}): CliTheme;
/**
 * Renders a CLI banner with an optional subtitle.
 */
export declare function renderCliBanner(theme: CliTheme, input: {
    readonly subtitle?: string;
    readonly title: string;
}): string;
/**
 * Renders one labeled section with aligned values.
 */
export declare function renderCliSection(theme: CliTheme, input: {
    readonly rows: readonly CliRow[];
    readonly title: string;
}): string;
/**
 * Renders one prefixed line used by the interactive dev REPL.
 */
export declare function renderCliTaggedLine(theme: CliTheme, input: {
    readonly message: string;
    readonly tag: string;
    readonly tone?: CliMessageTone;
}): string;
/**
 * Renders one speaker-prefixed line such as `agent>`.
 */
export declare function renderCliSpeakerLine(theme: CliTheme, input: {
    readonly message: string;
    readonly speaker: string;
    readonly tone?: CliMessageTone;
}): string;
export {};
