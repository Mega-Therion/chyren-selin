import type { RunInput } from "#channel/types.js";
/**
 * Serializable workflow-entry input. All runtime state travels via
 * `serializedContext`, which is produced by `serializeContext(ctx)`
 * and deserialized at each `"use step"` boundary.
 */
export interface WorkflowEntryInput {
    readonly input: RunInput["input"];
    readonly limits?: RunInput["limits"];
    readonly sessionTimeoutMs?: number | false;
    readonly serializedContext: Record<string, unknown>;
}
export interface WorkflowEntryResult {
    readonly output: unknown;
}
/**
 * Long-lived workflow entrypoint. Handles both root sessions and
 * delegated child sessions: root sessions expose only parent
 * control-plane events; delegated children publish their full progress
 * on a child stream and resume the parked parent with a
 * `subagent-result` on completion.
 *
 * Owns the stable command inbox, its channel alias, and the session lifecycle; each turn-owned
 * turn resolves its own runtime actions in-line and reports back only
 * `done`/`park` via the closed-contract {@link NextDriverAction}. The
 * only session-shape flag the driver reads (besides identity) is
 * `hasProxyInputRequests`, the documented short-circuit for hook-payload
 * routing to any descendant still active when the parent parks.
 */
export declare function workflowEntry(input: WorkflowEntryInput): Promise<WorkflowEntryResult>;
