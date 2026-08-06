import type { BootstrapPrompt } from "#runtime/agent/bootstrap-model-utils.js";
interface AvailableBootstrapSkill {
    readonly description: string;
    readonly name: string;
}
export declare function getAvailableSkills(prompt: BootstrapPrompt): AvailableBootstrapSkill[];
export declare function findRelevantSkill(skills: readonly AvailableBootstrapSkill[], message: string): AvailableBootstrapSkill | null;
export declare function getActivatedSkillIds(prompt: BootstrapPrompt): string[];
export {};
