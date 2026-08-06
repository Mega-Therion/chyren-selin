export interface AvailableSkillDescription {
    readonly description: string;
    readonly name: string;
}
interface FormatAvailableSkillsSectionOptions {
    readonly skillRoot?: string;
}
/**
 * Formats the "Available skills" system prompt section.
 *
 * All skills are always listed regardless of activation state. Active skill
 * instructions are never injected into the system prompt — the model already
 * has them from the `load_skill` tool result. Without an active sandbox root,
 * the formatter uses the canonical symbolic skill root so supporting files
 * remain discoverable without provisioning a sandbox.
 *
 * Authored skills call this at graph resolution time so the section is
 * part of the turn agent's static instructions. Dynamic skills
 * (`defineDynamic` in `agent/skills/`) reuse the same formatter for
 * durable context announcements.
 */
export declare function formatAvailableSkillsSection(skills: readonly AvailableSkillDescription[], options?: FormatAvailableSkillsSectionOptions): string | null;
export {};
