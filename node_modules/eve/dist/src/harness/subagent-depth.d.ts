import type { HarnessSession } from "#harness/types.js";
import type { RuntimeActionRequest, RuntimeRemoteAgentCallActionRequest, RuntimeSubagentCallActionRequest } from "#runtime/actions/types.js";
export type DelegatedRuntimeActionRequest = RuntimeRemoteAgentCallActionRequest | RuntimeSubagentCallActionRequest;
export type ResolvedSubagentDepth = {
    readonly currentDepth: number;
    readonly nextChildDepth: number;
};
export declare function resolveSubagentDepth(session: Pick<HarnessSession, "subagentDepth">): ResolvedSubagentDepth;
export declare function readSerializedSubagentDepth(serializedContext: Readonly<Record<string, unknown>>): number | undefined;
export declare function isSubagentDelegationAction(action: RuntimeActionRequest): action is DelegatedRuntimeActionRequest;
export declare function getSubagentDelegationName(action: DelegatedRuntimeActionRequest): string;
