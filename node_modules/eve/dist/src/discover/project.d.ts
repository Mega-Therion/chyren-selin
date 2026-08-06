import { type DiscoverDiagnostic } from "#discover/diagnostics.js";
import { type ProjectSource } from "#discover/project-source.js";
/**
 * Supported project layouts for filesystem-based agents.
 */
export type DiscoveryProjectLayout = "flat" | "nested";
/**
 * Resolved discovery roots for the current application.
 */
export interface ResolvedDiscoveryProject {
    agentRoot: string;
    appRoot: string;
    layout: DiscoveryProjectLayout;
}
/**
 * Error raised when discovery cannot resolve an eve agent root from a
 * {@link ProjectSource}.
 */
export declare class DiscoveryProjectResolutionError extends Error {
    readonly diagnostic: DiscoverDiagnostic;
    constructor(diagnostic: DiscoverDiagnostic);
}
/**
 * Resolves the nearest eve app root and agent root from an arbitrary
 * starting path.
 *
 * By default the resolver walks the real filesystem. Callers that want to
 * run discovery against an in-memory tree can pass a {@link ProjectSource}
 * created via `createMemoryProjectSource(...)`.
 */
export declare function resolveDiscoveryProject(startPath?: string, options?: {
    source?: ProjectSource;
}): Promise<ResolvedDiscoveryProject>;
