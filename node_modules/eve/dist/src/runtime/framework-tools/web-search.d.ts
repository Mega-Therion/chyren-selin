import type { ResolvedToolDefinition } from "#runtime/types.js";
import type { JsonObject } from "#shared/json.js";
/**
 * Output schema for OpenAI's provider-managed `webSearch` tool.
 */
export declare const WEB_SEARCH_OPENAI_OUTPUT_SCHEMA: JsonObject;
/**
 * Output schema for Anthropic's stable provider-managed `webSearch_20250305` tool.
 */
export declare const WEB_SEARCH_ANTHROPIC_OUTPUT_SCHEMA: JsonObject;
/**
 * Output schema for Google's provider-managed `googleSearch` grounding tool.
 */
export declare const WEB_SEARCH_GOOGLE_OUTPUT_SCHEMA: JsonObject;
/**
 * Output schema for AI Gateway's provider-managed `exaSearch` tool.
 */
export declare const WEB_SEARCH_EXA_OUTPUT_SCHEMA: JsonObject;
/**
 * Output schema for AI Gateway's provider-managed `parallelSearch` tool.
 */
export declare const WEB_SEARCH_PARALLEL_OUTPUT_SCHEMA: JsonObject;
/**
 * Framework-provided web search tool definition.
 *
 * Omits `execute` — the execution layer skips executor creation for tools
 * without it, and the harness injects the real provider-managed tool at
 * step time.
 */
export declare const WEB_SEARCH_TOOL_DEFINITION: ResolvedToolDefinition;
