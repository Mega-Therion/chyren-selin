import type { ToolSourceRef } from "#discover/manifest.js";
import type { CompiledToolDefinition, CompiledDynamicToolDefinition } from "#compiler/manifest.js";
import { type ModuleBackedDefinitionLoadOptions } from "#compiler/normalize-helpers.js";
/**
 * Compiled tool entry produced from one authored `tools/*.ts` file.
 *
 * Either a real tool definition, a `disabled` marker that removes the
 * named framework default during graph resolution, or a dynamic tool
 * resolver that produces tools at runtime.
 */
export type CompiledToolEntry = {
    readonly kind: "tool";
    readonly definition: CompiledToolDefinition;
} | {
    readonly kind: "disabled";
    readonly name: string;
} | {
    readonly kind: "workflow-tool";
    readonly maxSubagents?: number;
} | {
    readonly kind: "web-search-tool";
    readonly provider: "exa" | "parallel";
} | {
    readonly kind: "dynamic-tool";
    readonly definition: CompiledDynamicToolDefinition;
};
/**
 * Compiles one authored tool module into the normalized tool entry
 * stored on the compiled agent manifest.
 *
 * The tool name is derived from the file path under `tools/` with the
 * extension stripped and any path separators flattened to dashes
 * (e.g. `tools/billing/refund.ts` → `"billing-refund"`). Path separators
 * cannot reach the model — most providers reject `/` in tool names — so
 * tools are the one path-derived primitive that flattens nested
 * directories into a slug-safe single segment. Authored `name` fields
 * are rejected by the normalizer.
 */
export declare function compileToolEntry(agentRoot: string, source: ToolSourceRef, options?: ModuleBackedDefinitionLoadOptions): Promise<CompiledToolEntry>;
