/**
 * The pinned message-queue panel: client-side state and pure rendering for
 * messages submitted while a turn is still streaming.
 *
 * Enter queues the draft (up to {@link MESSAGE_QUEUE_LIMIT}); each queued
 * message waits for the turn to end, where the whole queue coalesces into
 * the next turn's message. Esc or Ctrl+C pops the oldest message to steer the
 * conversation instead of waiting: the renderer requests cooperative turn
 * cancellation and the runner submits the popped message as the next turn.
 * `/cancel` requests cancellation directly. Either key on an empty queue
 * cancels the turn immediately without a replacement message.
 *
 * The renderer owns lifecycle (keys, cancel requests, when the runner drains
 * the queue); this module only holds the queue state machine and paints rows.
 */
import type { Theme } from "./theme.js";
/** Most messages the queue holds; Enter on a full queue keeps the draft. */
export declare const MESSAGE_QUEUE_LIMIT = 5;
/** What one Esc press did to the queue state. */
export type MessageQueueEscapeOutcome = 
/**
 * A message is (now) staged for steering — the caller should request
 * cooperative turn cancellation. Repeated presses pop further messages
 * into the same staged steer payload and re-request cancellation.
 */
"steer"
/** Empty queue — the caller should cancel the turn. */
 | "cancel";
/** Read-only projection consumed by {@link renderMessageQueueRows}. */
export interface MessageQueueView {
    readonly messages: readonly string[];
    readonly full: boolean;
    /** A popped message is staged and turn cancellation was requested. */
    readonly steering: boolean;
    /** A cancel key on an empty queue landed; cancellation was requested. */
    readonly cancelling: boolean;
}
export declare class MessageQueue {
    #private;
    get size(): number;
    get full(): boolean;
    /** True when nothing is queued, staged, or cancelling. */
    get idle(): boolean;
    /** Queues one message; returns false (draft stays put) when full. */
    enqueue(message: string): boolean;
    /**
     * Applies one Esc or Ctrl+C press. Pops the oldest queued message into the
     * staged steer payload while any remain; with an empty queue, requests
     * cancellation immediately.
     */
    handleEscape(): MessageQueueEscapeOutcome;
    /** Marks a direct cancellation request without consuming queued messages. */
    requestCancellation(): void;
    /** Clears per-turn Esc state when a new stream starts rendering. */
    beginTurn(): void;
    /**
     * The next prompt to submit after a turn boundary: the staged steer
     * message when one exists (remaining queued messages stay queued for the
     * steered turn), otherwise the whole queue coalesced into one message.
     */
    takePrompt(): string | undefined;
    /**
     * Everything still held — staged steer payload plus queued messages —
     * coalesced for restoring into the prompt editor when a turn ends without
     * a clean boundary (interrupt, transport failure). Clears the queue.
     */
    restoreDraft(): string | undefined;
    reset(): void;
    view(): MessageQueueView;
}
export interface MessageQueuePanelRowsInput {
    readonly view: MessageQueueView;
    readonly width: number;
    readonly theme: Theme;
    /** True while a turn streams — the only state in which keys steer. */
    readonly working: boolean;
}
/**
 * Paints the pinned queue panel, indented so its marks share the tool
 * column. Queued messages ride a `│` rail under the header (one clipped
 * line each) and the last closes it with `└`. The header carries the Esc
 * affordance — the panel is where steering and cancellation are taught.
 */
export declare function renderMessageQueueRows(input: MessageQueuePanelRowsInput): string[];
