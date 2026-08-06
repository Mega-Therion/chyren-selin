import type { ResolvedToolDefinition } from "#runtime/types.js";
import type { ToolDefinition } from "#public/definitions/tool.js";
/**
 * Converter that strips internal identity fields from a framework
 * {@link ResolvedToolDefinition} so it can be re-exported as a public
 * {@link ToolDefinition}.
 *
 * Framework tools have the internal `(input, options) => output` signature.
 * The public {@link ToolDefinition.execute} expects `(input, ctx)`.
 * This wrapper bridges the gap — the public `ctx` is mapped back onto the
 * internal execute options.
 */
export declare function toPublicToolDefinition(definition: ResolvedToolDefinition): ToolDefinition;
