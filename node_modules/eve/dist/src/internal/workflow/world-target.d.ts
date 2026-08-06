/**
 * Maps a configured workflow world target to its package import specifier,
 * mirroring the Workflow DevKit's `WORKFLOW_TARGET_WORLD` normalization:
 * `"local"` and `"vercel"` are shorthands for the first-party world
 * packages; anything else is already a specifier.
 */
export declare function resolveWorkflowWorldImport(targetWorld: string): string;
