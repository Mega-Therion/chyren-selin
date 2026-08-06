import type { InternalToolDefinitionWithExecuteFn } from "#shared/tool-definition.js";
import { type DynamicToolEventName } from "#shared/dynamic-tool-definition.js";
/**
 * Canonical normalized shape of one authored tool default export.
 *
 * Identity is path-derived — the compiler stamps the filename slug onto
 * the compiled entry. This shape never carries an authored `name`.
 */
type NormalizedAuthoredTool = Readonly<Omit<InternalToolDefinitionWithExecuteFn, "name">>;
/**
 * Result of normalizing one authored tool default export. Either a real tool
 * definition, a sentinel that disables a framework default, or a dynamic
 * tool resolver. In all cases the disable target / runtime name is the
 * authored file's slug, supplied by the compiler — this layer never sees
 * a name.
 */
type NormalizedToolEntry = {
    readonly kind: "tool";
    readonly definition: NormalizedAuthoredTool;
} | {
    readonly kind: "disabled";
} | {
    readonly kind: "workflow-tool";
    readonly maxSubagents?: number;
} | {
    readonly kind: "web-search-tool";
    readonly provider: "exa" | "parallel";
} | {
    readonly kind: "dynamic-tool";
    readonly eventNames: readonly DynamicToolEventName[];
};
/**
 * Normalizes one authored tool default export. Recognizes real tool
 * definitions (`defineTool(...)`), disable sentinels (`disableTool()`), and the
 * experimental `Workflow` tool definition.
 *
 * Authored `name` fields are rejected — tool identity is path-derived.
 */
export declare function normalizeToolDefinition(value: unknown, message: string): NormalizedToolEntry;
export {};
