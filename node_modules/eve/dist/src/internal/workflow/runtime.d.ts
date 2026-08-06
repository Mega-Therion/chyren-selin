export * from "#compiled/@workflow/core/runtime.js";
export type { StartOptionsWithoutDeploymentId, WorkflowFunction, WorkflowMetadata, } from "#compiled/@workflow/core/runtime/start.js";
/** Installs a World across source and vendored Workflow package identities. */
export declare function setWorld(world: unknown): void;
