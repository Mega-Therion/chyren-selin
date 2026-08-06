import type { DevBootProgressReporter } from "#internal/dev-boot-progress.js";
import type { CommandLifecycle } from "#cli/shutdown.js";
import { type DevelopmentTuiTarget } from "./target.js";
import type { TuiDisplayOptions } from "./types.js";
export type { DevelopmentTuiTarget } from "./target.js";
export interface RunDevelopmentTuiInput extends TuiDisplayOptions {
    /** The local server or remote URL used by this TUI session. */
    readonly target: DevelopmentTuiTarget;
    /** Additional request headers sent by this TUI client. */
    readonly headers?: Readonly<Record<string, string>>;
    /**
     * Text to seed the prompt input with after the UI launches. A bare local
     * `/model` starts fresh-agent onboarding. Applies to the first prompt only.
     */
    readonly initialInput?: string;
    /** Reports local CLI boot phases. Omitted for remote and programmatic TUI runs. */
    readonly onBootProgress?: DevBootProgressReporter;
    /** Gives setup subprocesses exclusive terminal and development-host ownership. */
    withExclusiveTerminal?: <T>(task: () => Promise<T>) => Promise<T>;
    readonly lifecycle?: CommandLifecycle;
}
/**
 * Runs the `eve dev` terminal UI against the given server URL until the
 * user exits.
 *
 * The configured client is handed to the runner so its subagent
 * child-session streams inherit the same auth. Turn-dispatch failures —
 * including the Vercel Deployment Protection challenge — are formatted into
 * the inline error region rather than crashing the command.
 */
export declare function runDevelopmentTui(input: RunDevelopmentTuiInput): Promise<void>;
