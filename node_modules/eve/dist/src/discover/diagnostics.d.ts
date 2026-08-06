import { z } from "#compiled/zod/index.js";
/**
 * Structured discovery diagnostic severity.
 */
export type DiscoverDiagnosticSeverity = z.infer<typeof discoverDiagnosticSeveritySchema>;
/**
 * Zod schema for structured discovery diagnostic severities.
 */
export declare const discoverDiagnosticSeveritySchema: z.ZodUnion<readonly [z.ZodLiteral<"error">, z.ZodLiteral<"warning">]>;
/**
 * Structured discovery diagnostic emitted while classifying authored sources.
 */
export type DiscoverDiagnostic = z.infer<typeof discoverDiagnosticSchema>;
/**
 * Zod schema for one structured discovery diagnostic.
 */
export declare const discoverDiagnosticSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    severity: z.ZodUnion<readonly [z.ZodLiteral<"error">, z.ZodLiteral<"warning">]>;
    sourcePath: z.ZodString;
}, z.core.$strict>;
/**
 * Summary counts emitted alongside discovery manifests and CLI output.
 */
export type DiscoverDiagnosticsSummary = z.infer<typeof discoverDiagnosticsSummarySchema>;
/**
 * Zod schema for discovery diagnostic summary counts.
 */
export declare const discoverDiagnosticsSummarySchema: z.ZodObject<{
    errors: z.ZodNumber;
    warnings: z.ZodNumber;
}, z.core.$strict>;
/**
 * Root-resolution error code emitted when discovery cannot locate an eve agent.
 */
export declare const DISCOVER_PROJECT_NOT_FOUND = "discover/project-not-found";
/**
 * Creates an error-level discovery diagnostic.
 */
export declare function createDiscoverErrorDiagnostic(input: Omit<DiscoverDiagnostic, "severity">): DiscoverDiagnostic;
/**
 * Creates a warning-level discovery diagnostic.
 */
export declare function createDiscoverWarningDiagnostic(input: Omit<DiscoverDiagnostic, "severity">): DiscoverDiagnostic;
/**
 * Summarizes discovery diagnostics into error and warning counts.
 */
export declare function summarizeDiscoverDiagnostics(diagnostics: readonly DiscoverDiagnostic[]): DiscoverDiagnosticsSummary;
/**
 * Returns whether discovery diagnostics include at least one error.
 */
export declare function hasDiscoverErrors(diagnostics: readonly DiscoverDiagnostic[]): boolean;
