import type { World } from "#compiled/@workflow/world/index.js";
export interface ValidateWorkflowWorldInput {
    /**
     * Package name of the configured world, used to resolve its package manifest
     * for the boot-time compatibility check.
     */
    readonly packageName?: string;
    readonly world: unknown;
}
/**
 * Validates a Workflow world before eve installs it as the runtime singleton.
 */
export declare function validateWorkflowWorld(input: ValidateWorkflowWorldInput): asserts input is {
    readonly packageName?: string;
    readonly world: World;
};
