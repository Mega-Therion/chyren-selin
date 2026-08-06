/**
 * Builds the model-facing description for the `Workflow` orchestration tool.
 *
 * Dynamic in the agent's callable agents:
 * - lists every callable agent by name (the built-in `agent` plus one per
 *   declared subagent and remote agent);
 * - the worked example uses only the built-in `agent`, so it is valid for any
 *   agent;
 * - a single simple subagent example is appended *only when* the agent has a
 *   declared subagent or remote agent (i.e. an agent other than `agent`).
 *
 * The sandbox package's generated input signatures are appended after this
 * framing.
 *
 * @param toolNames - Names of the agent functions callable inside the sandbox.
 * @param options - `maxSubagents`: the invocation's subagent-call budget
 *   (defaults to {@link DEFAULT_WORKFLOW_MAX_SUBAGENTS}), surfaced so the
 *   model sizes its fan-out to fit.
 */
export declare function workflowToolDescription(toolNames: readonly string[], options?: {
    readonly maxSubagents?: number;
}): string;
