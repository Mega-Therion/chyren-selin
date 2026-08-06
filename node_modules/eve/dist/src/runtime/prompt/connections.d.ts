import type { ResolvedConnectionDefinition } from "#runtime/types.js";
/**
 * Formats the "Connections" system prompt section listing all available
 * connections and their descriptions.
 *
 * Called at graph resolution time so the section is part of the turn
 * agent's static instructions rather than injected per-step.
 */
export declare function formatConnectionsSection(connections: readonly ResolvedConnectionDefinition[]): string;
