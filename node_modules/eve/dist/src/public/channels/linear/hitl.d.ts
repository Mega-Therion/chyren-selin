import type { InputRequest } from "#runtime/input/types.js";
import type { JsonObject } from "#shared/json.js";
/** Renders eve input requests as one user-visible Linear elicitation body. */
export declare function renderLinearInputRequests(requests: readonly InputRequest[]): string;
/** Builds native Linear select metadata for a single input request with options. */
export declare function linearInputRequestSignal(requests: readonly InputRequest[]): {
    readonly signal?: "select";
    readonly signalMetadata?: JsonObject;
};
