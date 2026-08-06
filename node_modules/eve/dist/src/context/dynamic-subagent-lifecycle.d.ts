import type { ModelMessage } from "ai";
import type { ContextContainer } from "#context/container.js";
import type { ContextReader } from "#context/key.js";
import { type DurableDynamicSubagentSelection } from "#context/keys.js";
import type { HarnessToolDefinition } from "#harness/execute-tool.js";
import type { SessionStartedStreamEvent, UnstampedMessageStreamEvent } from "#protocol/message.js";
import type { ResolvedDynamicSubagentResolver } from "#runtime/subagents/registry.js";
export declare function dispatchDynamicSubagentEvent(input: {
    readonly ctx: ContextContainer;
    readonly event: UnstampedMessageStreamEvent;
    readonly messages: readonly ModelMessage[];
    readonly persistentSessions: boolean;
    readonly resolvers: readonly ResolvedDynamicSubagentResolver[];
}): Promise<void>;
export declare function refreshDynamicSessionSubagentsForRuntimeRevision(input: {
    readonly ctx: ContextContainer;
    readonly event: SessionStartedStreamEvent;
    readonly messages: readonly ModelMessage[];
    readonly persistentSessions: boolean;
    readonly resolvers: readonly ResolvedDynamicSubagentResolver[];
    readonly runtimeRevision: string;
}): Promise<void>;
export declare function buildDynamicSubagentTools(input: ContextReader): readonly HarnessToolDefinition[];
export declare function getDynamicSubagentSelection(input: ContextReader, nodeId: string): Exclude<DurableDynamicSubagentSelection, null> | undefined;
