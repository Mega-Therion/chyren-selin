import type { RuntimeToolCallActionRequest } from "#runtime/actions/types.js";
import type { HarnessEmitFn } from "#harness/types.js";
interface ActionEventCoordinates {
    readonly sequence: number;
    readonly stepIndex: number;
    readonly turnId: string;
}
interface ProviderStreamActionBatch {
    cancel(): Promise<void>;
    flush(): Promise<void>;
    observe(action: RuntimeToolCallActionRequest): void;
}
/** Batches provider-managed calls that arrive in one streamed model response. */
export declare function createProviderStreamActionBatch(input: {
    readonly emitFn: HarnessEmitFn;
    readonly state: ActionEventCoordinates;
}): ProviderStreamActionBatch;
export {};
