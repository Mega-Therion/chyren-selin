export interface WorkflowMetadata {
    /**
     * The name of the workflow.
     */
    workflowName: string;
    /**
     * Unique identifier for the workflow run.
     */
    workflowRunId: string;
    /**
     * Timestamp when the workflow run started.
     */
    workflowStartedAt: Date;
    /**
     * The URL where the workflow can be triggered.
     */
    url: string;
    /**
     * Feature flags indicating which capabilities are active for this workflow run.
     */
    features: {
        /**
         * Whether encryption is enabled for this workflow run.
         * When `true`, step inputs, outputs, and other serialized data
         * are encrypted at rest.
         */
        encryption: boolean;
    };
}
export declare const WORKFLOW_CONTEXT_SYMBOL: unique symbol;
export declare function getWorkflowMetadata(): WorkflowMetadata;
//# sourceMappingURL=get-workflow-metadata.d.ts.map