import { type WorkspaceRuntimeSpec } from "#runtime/workspace/types.js";
/**
 * Creates the authored-workspace prompt section that advertises the authored
 * paths visible at the workspace root.
 */
export declare function createWorkspacePromptSection(spec: WorkspaceRuntimeSpec): string | undefined;
