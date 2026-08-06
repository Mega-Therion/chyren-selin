export interface SessionTimeoutWorkflowInput {
    readonly deadline: Date;
    readonly token: string;
}
/** Sleeps until the session deadline, then signals its driver. */
export declare function sessionTimeoutWorkflow(input: SessionTimeoutWorkflowInput): Promise<void>;
