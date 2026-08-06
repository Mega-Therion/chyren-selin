import { type DiscoverDiagnostic } from "#discover/diagnostics.js";
import { type SkillSourceRef } from "#discover/manifest.js";
import { type ProjectSource } from "#discover/project-source.js";
/**
 * Diagnostics emitted by skill discovery.
 */
export declare const DISCOVER_SKILLS_DIRECTORY_INVALID = "discover/skills-directory-invalid";
export declare const DISCOVER_SKILL_COLLISION = "discover/skill-collision";
export declare const DISCOVER_SKILL_ENTRY_NOT_DIRECTORY = "discover/skill-entry-not-directory";
export declare const DISCOVER_SKILL_FRONTMATTER_INVALID = "discover/skill-frontmatter-invalid";
export declare const DISCOVER_SKILL_MARKDOWN_MISSING = "discover/skill-markdown-missing";
/**
 * Input for discovering authored skills.
 */
interface DiscoverSkillsInput {
    agentRoot: string;
    /**
     * Optional {@link ProjectSource} used for all filesystem reads. Defaults to
     * a disk-backed source so disk callers keep their current behaviour.
     */
    source?: ProjectSource;
    skillsDirectoryPath?: string;
    skillsLogicalPath?: string;
}
/**
 * Result of discovering authored skills.
 */
interface DiscoverSkillsResult {
    diagnostics: DiscoverDiagnostic[];
    skills: SkillSourceRef[];
}
/**
 * Discovers authored skills from either flat
 * `skills/<name>.md|ts|cts|mts|js|cjs|mjs`
 * entries or Agent Skills packages rooted at `skills/<name>/SKILL.md`.
 */
export declare function discoverSkills(input: DiscoverSkillsInput): Promise<DiscoverSkillsResult>;
export {};
