import type { Prompter } from "#setup/prompter.js";
import type { SetupFlowPrompterRenderer } from "./setup-flow.js";
/**
 * The renderer slice the TUI-native prompter drives: the bordered setup
 * panel for questions, the footer status for ephemeral loading, and toned
 * transcript lines for persistent output. Same members as the optional
 * methods on {@link AgentTUIRenderer}, required here.
 */
export type TuiPrompterRenderer = SetupFlowPrompterRenderer;
/**
 * A {@link Prompter} implemented by the TUI itself: questions render as the
 * bordered setup panel (an input-region variant, clearly not chat content),
 * spinners become the footer's ephemeral status line, and log output lands
 * as toned transcript lines. A cancelled panel throws
 * {@link WizardCancelledError}, which the setup flows already fold.
 *
 * `intro`/`outro` are no-ops — the command's elbow-connected outcome line is
 * the opening and closing of a TUI flow.
 */
export declare function createTuiPrompter(renderer: TuiPrompterRenderer): Prompter;
