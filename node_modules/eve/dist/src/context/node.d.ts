import type { ContextReader } from "#context/provider.js";
/**
 * Returns the active runtime node from the compiled bundle on the
 * context. The bundle is already resolved to the correct node (root or
 * subagent) at run start.
 */
export declare function getActiveRuntimeNode(ctx: ContextReader): import("../runtime/graph.ts").ResolvedRuntimeAgentNode;
