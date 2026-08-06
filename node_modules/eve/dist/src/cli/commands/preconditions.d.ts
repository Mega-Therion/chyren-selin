/**
 * Refusal shown by agent-scoped commands (`eve link`, `eve deploy`,
 * `eve channels …`) when the working directory holds no eve agent.
 */
export declare const NOT_AN_AGENT_MESSAGE = "No eve agent in this directory. Run `eve init <name>`, then run this command from inside the new project.";
/** True when stdin and stdout are both TTYs — the default interactivity gate. */
export declare function hasInteractiveTerminal(): boolean;
