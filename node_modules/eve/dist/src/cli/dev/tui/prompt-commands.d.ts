export type PromptCommandExtensionName = "model" | "add" | "deploy" | "vc:install" | "vc:login";
type PromptCommandTarget = "local" | "remote";
/** The slash commands the prompt accepts. */
export type PromptCommand = {
    type: "reset";
} | {
    type: "cancel";
} | {
    type: "clear";
} | {
    type: "compact";
} | {
    type: "exit";
} | {
    type: "help";
} | {
    type: "loglevel";
    argument: string;
} | {
    type: "traces";
    argument: string;
} | {
    type: "extension";
    name: PromptCommandExtensionName;
    argument: string;
};
/**
 * Metadata for one slash command. The registry describes commands — their
 * names, aliases, and discovery copy — it never executes them: dispatch stays
 * with the runner and the prompt-command handler.
 */
export interface PromptCommandSpec {
    /** Canonical name without the slash, e.g. "model". */
    readonly name: string;
    readonly aliases: readonly string[];
    /** One-line discovery copy shown by the typeahead. */
    readonly description: string;
    /** Argument shape shown dim after the name, e.g. "[provider/model]". */
    readonly argumentHint?: string;
    /** Accepts a trailing argument (enables `/name <arg>` parsing). */
    readonly takesArgument: boolean;
    /** Maps a recognized invocation to its parsed command. */
    readonly build: (argument: string) => PromptCommand;
}
export declare const PROMPT_COMMANDS: readonly PromptCommandSpec[];
export declare function promptCommandsFor(target: PromptCommandTarget): readonly PromptCommandSpec[];
/** Whether a command runs against this target — the one authority dispatch shares with discovery. */
export declare function isPromptCommandAvailableFor(name: PromptCommandExtensionName, target: PromptCommandTarget): boolean;
/**
 * Recognizes the slash commands the prompt accepts. `/reset` clears the
 * session and transcript; `/cancel` stops the running turn; `/clear` (and
 * `/new`) clears context; `/compact` queues context compaction; `/exit` (and
 * `/quit`) terminate the TUI like Ctrl+C; extension commands are dispatched
 * outside the runner. Anything else — including unknown `/text` — is a normal
 * message.
 */
export declare function parsePromptCommand(prompt: string): PromptCommand | null;
/** True for prompts that are commands, which never echo as user messages. */
export declare function isPromptControlCommand(prompt: string): boolean;
/**
 * The table `/help` prints: one line per command — slash name, argument
 * hint, and aliases padded into a column, description after.
 */
export declare function formatPromptCommandHelp(commands?: readonly PromptCommandSpec[]): string;
export {};
