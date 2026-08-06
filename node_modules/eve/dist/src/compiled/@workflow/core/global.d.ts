import type { AttributeChange } from '#compiled/@workflow/world/index.js';
import type { Serializable } from './schemas.js';
export interface StepInvocationQueueItem {
    type: 'step';
    correlationId: string;
    stepName: string;
    args: Serializable[];
    closureVars?: Record<string, Serializable>;
    thisVal?: Serializable;
    hasCreatedEvent?: boolean;
    /**
     * Inline step ownership, derived from the step's LATEST `step_started`
     * during replay: the queue message ID stamped by the invocation running
     * the step inline, or undefined when the latest start was unstamped (a
     * retry attempt driven by a queued step message, or an older runtime).
     * Latest start wins — an unstamped bare start clears a previous stamp; an
     * owner-recovery re-stamped start restores it.
     */
    ownerMessageId?: string;
    /**
     * `createdAt` (ms) of the step's latest observed `step_started`. Anchors
     * the ownership lease: `leaseRemaining = lastStartedAt + lease − now`.
     */
    lastStartedAt?: number;
    /**
     * Whether a `step_retrying` was observed for this step. From that point
     * the step is queue-owned (the delayed retry handoff or replay requeue),
     * so inline ownership is permanently lapsed for this correlation ID.
     */
    sawRetrying?: boolean;
}
export interface HookInvocationQueueItem {
    type: 'hook';
    correlationId: string;
    token: string;
    /** Earliest time the token can be reused after the run ends. */
    tokenRetentionUntil?: Date;
    metadata?: Serializable;
    hasCreatedEvent?: boolean;
    /** Whether the workflow is awaiting `hook.getConflict()` for this hook */
    hasConflictAwaiter?: boolean;
    disposed?: boolean;
    isWebhook?: boolean;
    isSystem?: boolean;
    abortRequested?: boolean;
    abortReason?: unknown;
}
export interface WaitInvocationQueueItem {
    type: 'wait';
    correlationId: string;
    resumeAt: Date;
    hasCreatedEvent?: boolean;
}
export interface AttributeInvocationQueueItem {
    type: 'attribute';
    correlationId: string;
    changes: AttributeChange[];
    allowReservedAttributes?: true;
}
export type QueueItem = StepInvocationQueueItem | HookInvocationQueueItem | WaitInvocationQueueItem | AttributeInvocationQueueItem;
/**
 * An error that is thrown when one or more operations (steps/hooks/etc.) are called but do
 * not yet have corresponding entries in the event log. The workflow
 * dispatcher will catch this error and push the operations
 * onto the queue.
 */
export declare class WorkflowSuspension extends Error {
    steps: QueueItem[];
    globalThis: typeof globalThis;
    stepCount: number;
    hookCount: number;
    waitCount: number;
    attributeCount: number;
    hookDisposedCount: number;
    abortCount: number;
    constructor(stepsInput: Map<string, QueueItem>, global: typeof globalThis);
    static is(value: unknown): value is WorkflowSuspension;
}
export declare function ENOTSUP(): never;
//# sourceMappingURL=global.d.ts.map