/**
 * The empty prompt's rotating invitation, written in the agent's own voice
 * ("my capabilities") since the prompt is a message to it. Messages point at
 * things an eve agent can actually do out of the box, so an idle prompt
 * doubles as a hint surface. The caret-blink repaint keeps the rotation
 * moving without its own timer.
 */
export declare const PROMPT_PLACEHOLDER_MESSAGES: readonly string[];
/** How long each message holds before the rotation advances. */
export declare const promptPlaceholderCycleMs = 6000;
/** Picks the message for the given time since the renderer started. */
export declare function promptPlaceholder(elapsedMs: number): string;
