import type { ModelMessage } from "ai";
/**
 * Converts provider-executed tool outcomes into replay-safe model messages.
 *
 * Provider SDKs can return a tool call and its result inside one assistant
 * message. When the result is provider-executed but the call lacks the matching
 * marker, each matching call is rewritten as a normal call and consecutive
 * results are moved into a tool message at their original position. Native
 * provider-owned call/result pairs remain untouched. Text before a result
 * remains before it; text after a result remains after it.
 */
export declare function normalizeProviderToolHistory(input: {
    readonly messages: readonly ModelMessage[];
    readonly providerExecutedOutcomeIds: ReadonlySet<string>;
}): {
    readonly messages: ModelMessage[];
    readonly outcomeEndsResponse: boolean;
};
