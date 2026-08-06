import type { AttributeChange } from '#compiled/@workflow/world/index.js';
import { type WorkflowOrchestratorContext } from '../private.js';
export declare function createSetAttributes(ctx: WorkflowOrchestratorContext): (changes: AttributeChange[], options?: {
    allowReservedAttributes?: boolean;
}) => Promise<void>;
//# sourceMappingURL=attribute-dispatcher.d.ts.map