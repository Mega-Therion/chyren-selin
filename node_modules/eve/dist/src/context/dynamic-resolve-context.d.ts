import type { ModelMessage } from "ai";
import type { DynamicResolveContext } from "#shared/dynamic-tool-definition.js";
import type { AlsContext } from "#context/container.js";
type ReadableContext = Pick<AlsContext, "get">;
/**
 * Builds the {@link DynamicResolveContext} from the active ALS context.
 *
 * Shared by all three dynamic lifecycle dispatchers (tools, skills,
 * instructions) so resolver handlers receive a consistent context shape.
 */
export declare function buildResolveContext(ctx: ReadableContext, messages: readonly ModelMessage[]): DynamicResolveContext;
export {};
