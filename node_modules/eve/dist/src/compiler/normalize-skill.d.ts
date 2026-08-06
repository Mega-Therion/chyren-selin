import type { SkillSourceRef } from "#discover/manifest.js";
import type { CompiledDynamicSkillDefinition, CompiledSkillDefinition } from "#compiler/manifest.js";
import { type ModuleBackedDefinitionLoadOptions } from "#compiler/normalize-helpers.js";
/**
 * Compiled skill entry produced from one authored `skills/*` file.
 *
 * Either a real skill definition or a dynamic skill resolver that
 * produces skills at runtime.
 */
export type CompiledSkillEntry = {
    readonly kind: "skill";
    readonly definition: CompiledSkillDefinition;
} | {
    readonly kind: "dynamic-skill";
    readonly definition: CompiledDynamicSkillDefinition;
};
/**
 * Compiles one authored skill source (markdown, module, or skill
 * package directory) into the normalized shape stored on the compiled
 * agent manifest.
 */
export declare function compileSkillSource(agentRoot: string, source: SkillSourceRef, options?: ModuleBackedDefinitionLoadOptions): Promise<CompiledSkillEntry>;
