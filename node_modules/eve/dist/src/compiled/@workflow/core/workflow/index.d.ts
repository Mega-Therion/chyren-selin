import type { StepMetadata } from '../step/get-step-metadata.js';
export { FatalError, RetryableError, type RetryableErrorOptions, } from '#compiled/@workflow/errors/index.js';
export type { Hook, HookOptions } from '../create-hook.js';
export { sleep } from '../sleep.js';
export { createHook, createWebhook } from './create-hook.js';
export { defineHook } from './define-hook.js';
export { getWorkflowMetadata } from './get-workflow-metadata.js';
export { type SetAttributesOptions, setAttributes, } from './set-attributes.js';
export { getWritable } from './writable-stream.js';
export declare function getStepMetadata(): StepMetadata;
export declare function resumeHook(): void;
//# sourceMappingURL=index.d.ts.map