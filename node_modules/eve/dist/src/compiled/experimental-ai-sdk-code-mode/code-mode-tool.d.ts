import type { Tool } from "ai";
import type { CodeModeOptions, CodeModeToolInput, CodeModeToolSet } from "./types.js";
/**
 * Creates an AI SDK tool that executes code-mode TypeScript in an isolated
 * sandbox.
 *
 * The generated tool description includes sandbox rules, available host tool
 * signatures, return types when an AI SDK output schema is present, call
 * examples, and fetch policy details when fetch is enabled.
 *
 * @param tools - Host tools that sandboxed code can call through `tools.name(input)`.
 * @param options - Runtime, fetch, and approval options for every invocation of this tool.
 * @returns An AI SDK tool whose input is `{ js: string }` and whose output is the sandbox return value.
 */
export declare function createCodeModeTool(tools: CodeModeToolSet, options?: CodeModeOptions): Tool<CodeModeToolInput, unknown>;
//# sourceMappingURL=code-mode-tool.d.ts.map