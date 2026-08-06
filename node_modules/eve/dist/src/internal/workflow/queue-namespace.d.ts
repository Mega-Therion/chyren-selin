export declare const WORKFLOW_QUEUE_NAMESPACE_ENV = "WORKFLOW_QUEUE_NAMESPACE";
/** Derives a stable Workflow queue namespace from an eve agent's unique name. */
export declare function deriveEveWorkflowQueueNamespace(agentName: string): string;
/** Derives the queue prefix consumed by an eve agent's workflow handler. */
export declare function deriveEveWorkflowQueuePrefix(agentName: string): string;
/** Derives the queue topic registered for an eve agent's workflow handler. */
export declare function deriveEveWorkflowQueueTopic(agentName: string): string;
/** Builds the Vercel queue trigger that invokes an eve agent's flow function. */
export declare function createEveWorkflowQueueTrigger(agentName: string): {
    type: "queue/v2beta";
    topic: string;
    consumer: string;
    retryAfterSeconds: number;
    initialDelaySeconds: number;
};
/** Installs the agent-scoped namespace used by Workflow runtime operations. */
export declare function installEveWorkflowQueueNamespace(agentName: string): string;
