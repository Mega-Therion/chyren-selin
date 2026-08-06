import type { RuntimeActionRequest, RuntimeActionResult } from "#runtime/actions/types.js";
import type { InputRequest } from "#runtime/input/types.js";
import type { EveDynamicToolPart, EveMessageInputRequest, EveMessageToolMetadata } from "#client/message-reducer-types.js";
/**
 * Normalized tool descriptor derived from a runtime action request or result.
 *
 * The default message reducer projects load-skill, subagent, remote-agent, and
 * plain tool calls onto a single `dynamic-tool` UI part; this descriptor is the
 * shared shape those variants collapse to before rendering.
 */
export interface ActionDescriptor {
    readonly kind: "load-skill" | "subagent-call" | "tool-call";
    readonly name: string;
    readonly toolName: string;
}
/** Projects a runtime input request onto its UI-facing subset. */
export declare function toMessageInputRequest(request: InputRequest): EveMessageInputRequest;
/** Builds tool metadata for a freshly projected tool part. */
export declare function createToolMetadata(descriptor: ActionDescriptor, extra?: {
    readonly inputRequest?: EveMessageInputRequest;
}): EveMessageToolMetadata;
/**
 * Merges freshly derived tool metadata over any metadata already attached to a
 * tool part, preferring the new values while preserving earlier request and
 * response context.
 */
export declare function mergeToolMetadata(current: EveMessageToolMetadata | undefined, next: EveMessageToolMetadata): EveMessageToolMetadata;
/**
 * Derives the approved-approval descriptor a resolved tool result carries
 * forward, or `undefined` when the tool part never had an approval.
 */
export declare function approvedApproval(part: EveDynamicToolPart | undefined): {
    readonly id: string;
    readonly approved: true;
    readonly reason?: string;
    readonly isAutomatic?: boolean;
} | undefined;
/** Maps a runtime action request onto its normalized tool descriptor. */
export declare function normalizeActionRequest(action: RuntimeActionRequest): ActionDescriptor;
/** Maps a runtime action result onto its normalized tool descriptor. */
export declare function normalizeActionResult(result: RuntimeActionResult): ActionDescriptor;
/** Best-effort string rendering of an unknown tool output for error display. */
export declare function stringifyUnknown(value: unknown): string;
