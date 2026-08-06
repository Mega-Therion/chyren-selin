import type { ToolDefinition } from "#public/definitions/tool.js";
export type { ToolDefinition };
/**
 * Framework-provided shell execution tool. Spread or wrap to customize.
 */
export declare const bash: ToolDefinition;
/**
 * Framework-provided file search tool. Finds files by glob pattern. Spread
 * or wrap to customize.
 */
export declare const glob: ToolDefinition;
/**
 * Framework-provided content search tool. Searches file contents by regex
 * pattern. Spread or wrap to customize.
 */
export declare const grep: ToolDefinition;
/**
 * Framework-provided file reader tool (`read_file`). Spread or wrap to
 * customize. The framework resets the durable read-before-write stamps on
 * context compaction automatically, regardless of how the reader is defined.
 */
export declare const readFile: ToolDefinition;
/**
 * Framework-provided file writer tool. Spread or wrap to customize.
 * Enforces read-before-write for existing files and stale-read detection.
 */
export declare const writeFile: ToolDefinition;
/**
 * Framework-provided HTTP fetch tool. Spread or wrap to customize.
 */
export declare const webFetch: ToolDefinition;
/**
 * Framework-provided durable todo list tool. Spreading the default keeps its
 * closure-bound state behavior: the executor still reads and writes the
 * framework's internal todo state. Replace with a fully custom executor (and
 * your own `ContextKey`) if you need different state semantics.
 */
export declare const todo: ToolDefinition;
/**
 * Framework-provided skill loading tool (`load_skill`). Returns a named
 * authored skill's instructions directly; dynamic skills remain sandbox-backed.
 * It is only useful when the agent declares skills: with no skills available the
 * framework does not surface skill descriptions to the model, so the model has
 * nothing to load.
 */
export declare const loadSkill: ToolDefinition;
