import type { Prompter } from "./prompter.js";
/**
 * Thrown when the headless create flow reaches a decision that no flag
 * answered. Surfaced to the caller as a structured error event so an AI
 * agent driving `--json` learns exactly which flag is missing.
 */
export declare class HeadlessPromptError extends Error {
    readonly promptMessage: string;
    constructor(promptMessage: string);
}
/** Sink for human-readable progress lines emitted during a headless run. */
export type HeadlessLogSink = (text: string) => void;
/**
 * A {@link Prompter} that never blocks on input. Every interactive method
 * rejects with {@link HeadlessPromptError}; log output is forwarded to `sink`.
 * Used by non-interactive setup callers so an AI agent can
 * drive the create flow non-interactively: when a flag is missing the run
 * fails fast with a precise message instead of hanging on a TTY prompt.
 */
export declare function createHeadlessPrompter(sink: HeadlessLogSink): Prompter;
export interface HeadlessNextStep {
    command: string;
}
/** A structured lifecycle event emitted as one NDJSON line on stdout in `--json` mode. */
export type HeadlessEvent = {
    type: "done";
    projectPath: string;
    channels: string[];
    model: string;
} | {
    type: "action-required";
    status: "action_required";
    kind: string;
    reason: string;
    message: string;
    command: string;
    next: HeadlessNextStep[];
} | {
    type: "error";
    status: "error";
    reason: string;
    message: string;
    hint?: string;
};
/** Serializes one event as a single NDJSON line. */
export declare function formatHeadlessEvent(event: HeadlessEvent): string;
