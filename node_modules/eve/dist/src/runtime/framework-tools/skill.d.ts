import { z } from "#compiled/zod/index.js";
import type { ResolvedSkillDefinition, ResolvedToolDefinition } from "#runtime/types.js";
export declare const SKILL_INPUT_SCHEMA: z.ZodObject<{
    skill: z.ZodString;
}, z.core.$strict>;
export declare const SKILL_OUTPUT_SCHEMA: z.ZodString;
/**
 * Creates a node-specific `load_skill` definition with authored skills bound
 * into its executor.
 */
export declare function createSkillToolDefinition(authoredSkills: readonly ResolvedSkillDefinition[]): ResolvedToolDefinition;
export declare const SKILL_TOOL_DEFINITION: ResolvedToolDefinition;
