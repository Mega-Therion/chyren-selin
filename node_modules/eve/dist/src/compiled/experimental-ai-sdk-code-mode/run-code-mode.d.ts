import type { RunCodeModeInput } from "./types.js";
/**
 * Runs one code-mode invocation directly without wrapping it as an AI SDK tool.
 *
 * The source is executed in a fresh QuickJS context with the provided host tools,
 * execution limits, fetch policy, and approval policy.
 *
 * @param input - Source code, host tools, forwarded tool execution options, and code-mode options.
 * @returns The JSON-serializable value returned by the sandboxed program.
 */
export declare function runCodeMode(input: RunCodeModeInput): Promise<unknown>;
//# sourceMappingURL=run-code-mode.d.ts.map