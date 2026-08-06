import type { SessionTimeoutWorkflowInput } from "#execution/session-timeout-workflow.js";
/** Starts the durable timer that signals one session deadline. */
export declare function startSessionTimeoutStep(input: SessionTimeoutWorkflowInput): Promise<{
    readonly runId: string;
}>;
/** Resumes the owning driver when its durable timer elapses. */
export declare function signalSessionTimeoutStep(input: {
    readonly token: string;
}): Promise<void>;
/** Cancels a timer whose session reached another terminal outcome first. */
export declare function cancelSessionTimeoutStep(input: {
    readonly runId: string;
}): Promise<void>;
