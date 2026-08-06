/** Workflow-body handle that targets a durable deadline at the stable command inbox. */
export interface SessionTimeoutControl {
    dispose(): Promise<void>;
    start(): Promise<void>;
}
/** Creates a timer controller for one stable session command inbox. */
export declare function createSessionTimeoutControl(input: {
    readonly deadline: Date;
    readonly token: string;
}): SessionTimeoutControl;
