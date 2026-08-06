import type { RuntimeRemoteAgentCallActionRequest, RuntimeSubagentCallActionRequest, RuntimeSubagentDispatchFailure } from "#runtime/actions/types.js";
export declare function createUnavailableDynamicSubagentResult(action: RuntimeSubagentCallActionRequest | RuntimeRemoteAgentCallActionRequest): RuntimeSubagentDispatchFailure;
export declare function getSubagentName(action: RuntimeSubagentCallActionRequest | RuntimeRemoteAgentCallActionRequest): string;
export declare function createRemoteAgentStartFailureResult(input: {
    readonly action: RuntimeRemoteAgentCallActionRequest;
    readonly error: unknown;
}): RuntimeSubagentDispatchFailure;
export declare function createRecursiveAgentRootOnlyResult(action: RuntimeSubagentCallActionRequest): RuntimeSubagentDispatchFailure;
