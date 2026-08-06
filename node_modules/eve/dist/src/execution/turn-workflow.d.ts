import { type TurnWorkflowInput } from "#execution/durable-session-migrations/turn-workflow.js";
export type { TurnWorkflowInput };
/**
 * Runs one complete logical turn, including child-agent waits when supported.
 *
 * The turn-owned path also owns turn cancellation: resuming the
 * turn-private cancel hook (`{completionToken}:cancel`) mid-turn aborts the
 * signal serialized into every `turnStep` and settles the turn as
 * `turn.cancelled` → `session.waiting` — never as a failure. A late or
 * guard-mismatched cancel is a benign no-op.
 */
export declare function turnWorkflow(rawInput: unknown): Promise<void>;
