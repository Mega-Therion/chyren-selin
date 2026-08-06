import type { HarnessSession } from "#harness/types.js";
import type { WorkflowSandboxContinuationSecurity } from "#shared/workflow-sandbox.js";
export declare function ensureWorkflowContinuationSecurity(session: HarnessSession): HarnessSession;
export declare function readWorkflowContinuationSecurity(session: HarnessSession): WorkflowSandboxContinuationSecurity | undefined;
export declare function getWorkflowContinuationSecurity(session: HarnessSession): WorkflowSandboxContinuationSecurity;
