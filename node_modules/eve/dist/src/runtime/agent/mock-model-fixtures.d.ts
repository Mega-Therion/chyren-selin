import type { BootstrapPrompt } from "#runtime/agent/bootstrap-model-utils.js";
export interface AvailableBootstrapTool {
    readonly description?: string;
    readonly inputSchema?: unknown;
    readonly name: string;
    readonly outputSchema?: unknown;
}
export declare function createMockAuthoredToolInput(tool: AvailableBootstrapTool, message: string, city: string): Record<string, unknown>;
export declare function resolveMockFixtureToken(prompt: BootstrapPrompt): string | null;
export declare function resolveWeatherCity(message: string): string;
export declare function formatToolOutput(output: unknown): string;
