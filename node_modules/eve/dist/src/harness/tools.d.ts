import { type ToolApprovalConfiguration, type ToolSet } from "ai";
import type { SessionCapabilities } from "#channel/types.js";
import type { RuntimeModelReference } from "#runtime/agent/bootstrap.js";
import type { WebSearchProvider } from "#shared/web-search.js";
import type { HarnessToolDefinition } from "#harness/execute-tool.js";
import type { HarnessToolMap } from "#harness/types.js";
import type { ToolExecuteOptions } from "#shared/tool-definition.js";
/**
 * Builds an AI SDK `ToolSet` from unified harness tool definitions.
 *
 * Tools without `execute` are surfaced to the model as client-side tools
 * (no server execution).
 *
 * The framework's `ask_question` tool is only exposed to the model when
 * {@link SessionCapabilities.requestInput} is `true`. Sessions without
 * the HITL capability (scheduled task roots and any subagent chain
 * descending from one) never see the tool.
 *
 * Entries listed in `disabledProviderTools` are skipped entirely. Used
 * by the harness recovery path when a gateway fallback provider has
 * rejected a provider-specific tool — the tool is dropped for the
 * retry call so the request can proceed without it.
 */
export declare function buildToolSet(input: {
    readonly approvedTools?: ReadonlySet<string>;
    readonly capabilities?: SessionCapabilities;
    readonly disabledProviderTools?: ReadonlySet<string>;
    readonly tools: HarnessToolMap;
}): ToolSet;
/**
 * Builds a ToolSet from an ordered list of harness definitions.
 *
 * The first definition for a name wins, matching the dynamic-tool scope
 * ordering where step tools override turn/session tools.
 */
export declare function buildToolSetFromDefinitions(input: {
    readonly approvedTools?: ReadonlySet<string>;
    readonly capabilities?: SessionCapabilities;
    readonly disabledProviderTools?: ReadonlySet<string>;
    readonly tools: readonly HarnessToolDefinition[];
}): ToolSet;
/**
 * Wraps a tool's `execute` so a returned {@link AuthorizationSignal} is
 * stashed out-of-band ({@link stashToolInterrupt}) for the park detector while
 * the AI SDK records an opaque {@link AuthorizationPendingModelOutput} that
 * omits OAuth URLs, user codes, and hook URLs from model-facing history.
 * Returns `undefined` for client-side tools (no `execute`).
 */
export declare function wrapToolExecute(definition: HarnessToolDefinition): ((input: any, options: ToolExecuteOptions) => Promise<any> | AsyncIterable<any>) | undefined;
/**
 * Builds the AI SDK ToolSet for one harness step.
 *
 * Most tools have local executors and are assembled by {@link buildToolSet}.
 * Provider-managed tools (e.g. web_search) have no local `execute` — the
 * execution layer intentionally omits it. This function detects the gap and
 * injects the real AI SDK provider tool in their place.
 * If the current model cannot supply that provider tool, the framework
 * sentinel is removed instead of being exposed as an unexecutable tool.
 *
 * When a user overrides a provider-managed tool via `defineTool()`, their
 * tool has a real executor and flows through the normal path — no
 * replacement occurs.
 *
 * Tool names listed in `disabledProviderTools` are skipped entirely —
 * both the framework definition and the injected provider tool are
 * omitted from the returned set. Used by the harness recovery path when
 * a gateway fallback provider has rejected a provider-specific tool.
 */
export declare function buildToolSetWithProviderTools(input: {
    readonly approvedTools?: ReadonlySet<string>;
    readonly capabilities?: SessionCapabilities;
    readonly disabledProviderTools?: ReadonlySet<string>;
    readonly modelReference: RuntimeModelReference;
    readonly tools: HarnessToolMap;
    readonly webSearchProvider?: WebSearchProvider;
}): Promise<ToolSet>;
/** Builds the AI SDK 7 call-level approval policy for an assembled tool set. */
export declare function buildToolApproval(tools: ToolSet): ToolApprovalConfiguration<ToolSet, Record<string, unknown>>;
