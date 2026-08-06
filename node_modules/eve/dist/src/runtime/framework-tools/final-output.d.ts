import type { Tool } from "ai";
import type { JsonObject } from "#shared/json.js";
/**
 * Stable model-visible name for the framework structured-output tool.
 */
export declare const FINAL_OUTPUT_TOOL_NAME = "final_output";
/**
 * Builds the model-facing `final_output` tool from a lowered output schema.
 *
 * The tool has no `execute`: calling it is the terminal signal the harness
 * intercepts to surface the structured result. Its input is provider-constrained
 * to the schema during generation, exactly like every other eve tool input.
 */
export declare function buildFinalOutputTool(schema: JsonObject): Tool;
