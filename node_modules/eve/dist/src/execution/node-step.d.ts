import type { Runtime, SessionCapabilities } from "#channel/types.js";
import type { HandleEventFn, HarnessToolMap, StepFn } from "#harness/types.js";
import type { RuntimeIdentity } from "#protocol/message.js";
import type { RunMode } from "#shared/run-mode.js";
import { type RuntimeModelResolutionScope } from "#runtime/agent/resolve-model.js";
import type { RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
import type { ResolvedRuntimeAgentNode } from "#runtime/graph.js";
/**
 * Factory that creates a {@link Runtime} for the given compiled
 * artifacts source and optional node id. Matches the signature of
 * `createWorkflowRuntime`, so callers pass the constructor directly —
 * no wrapper needed.
 */
export type CreateRuntime = (config: {
    readonly compiledArtifactsSource: RuntimeCompiledArtifactsSource;
    readonly nodeId?: string;
}) => Runtime;
/**
 * Input for building a harness step for one resolved runtime node.
 */
export interface CreateExecutionNodeStepInput {
    /** Cancellation signal forwarded to the tool-loop harness. */
    readonly abortSignal?: AbortSignal;
    /**
     * Session-level capabilities propagated from the runtime. The
     * harness passes this through to `buildToolSet` so `ask_question`
     * registration and any other capability-gated behavior tracks the
     * current run.
     */
    readonly capabilities?: SessionCapabilities;
    /** Runs only a context clear and returns to the parked session. */
    readonly clearOnly?: boolean;
    /** Runs only a forced context compaction and returns to the parked session. */
    readonly compactOnly?: boolean;
    /**
     * Runtime constructor used by the subagent tool executor to start
     * delegated child runs on the same workflow runtime as the parent.
     */
    readonly createRuntime: CreateRuntime;
    readonly handleEvent?: HandleEventFn;
    readonly mode: RunMode;
    readonly modelResolutionScope: RuntimeModelResolutionScope;
    readonly node: ResolvedRuntimeAgentNode;
    /**
     * Effective `maxSubagents` cap configured by the experimental Workflow tool
     * definition and materialized on the session at creation.
     */
    readonly workflowMaxSubagents?: number;
}
/**
 * Builds a harness step for one resolved runtime node using the execution-owned
 * tool, sandbox, and subagent wiring.
 */
export declare function createExecutionNodeStep(input: CreateExecutionNodeStepInput): StepFn;
/**
 * Builds a {@link RuntimeIdentity} from the resolved runtime agent node
 * and the current eve package installation.
 */
export declare function buildRuntimeIdentity(node: ResolvedRuntimeAgentNode): RuntimeIdentity;
/**
 * Resolves unified {@link HarnessToolDefinition}s from the node's registries.
 *
 * For authored tools: copies all lifecycle fields from the resolved definition.
 * For subagent tools: surfaces runtime-owned subagent-call metadata and leaves
 * execution to the runtime layer.
 * Tools without `execute` (provider-managed) get entries with schema but no execute.
 */
export declare function createNodeHarnessTools(input: {
    readonly node: ResolvedRuntimeAgentNode;
}): HarnessToolMap;
