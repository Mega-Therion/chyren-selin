/**
 * Typing-indicator labels for requested actions. The Slack indicator is
 * plain text (`assistant.threads.setStatus` renders no markdown), so the
 * label is the action's name plus its most telling argument — `grep useEve`
 * or `read_file agent/agent.ts` instead of `Running grep...`.
 */
import type { RuntimeActionRequest } from "#runtime/actions/types.js";
/**
 * One action's typing-indicator label: `grep useEveAgent` for tool calls,
 * the subagent or remote-agent name for dispatched calls, and
 * `load_skill <name>` for skill loads.
 */
export declare function describeActionRequest(action: RuntimeActionRequest): string;
/**
 * Typing-indicator text for one requested batch: the first action's
 * {@link describeActionRequest} label, plus `+N more` when the model
 * requested several actions at once.
 */
export declare function describeActionRequests(actions: readonly RuntimeActionRequest[]): string;
