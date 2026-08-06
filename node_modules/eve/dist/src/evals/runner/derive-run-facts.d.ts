import type { MessageStreamEvent } from "#protocol/message.js";
import type { EveEvalDerivedFacts } from "#evals/types.js";
/**
 * Options for {@link deriveRunFacts}.
 */
export interface DeriveRunFactsOptions {
    /** Session id stamped onto every derived tool and subagent call. */
    readonly sessionId?: string;
}
/**
 * Extracts derived execution facts from a completed run's stream events.
 *
 * Tool calls pair each `actions.requested` entry with its matching
 * `action.result` by call id; subagent calls join `subagent.called` /
 * `subagent.started` with `subagent.completed` the same way. These facts
 * power checks, scorers, and reporters.
 */
export declare function deriveRunFacts(events: readonly MessageStreamEvent[], options?: DeriveRunFactsOptions): EveEvalDerivedFacts;
/**
 * Returns empty derived facts, used when a case produced no events
 * (execution errors, transport failures).
 */
export declare function createEmptyDerivedFacts(): EveEvalDerivedFacts;
