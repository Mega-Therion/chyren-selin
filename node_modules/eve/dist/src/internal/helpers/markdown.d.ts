import { type ScheduleDefinition } from "#public/definitions/schedule.js";
import { type SkillDefinition } from "#public/definitions/skill.js";
import type { InstructionsDefinition } from "#public/definitions/instructions.js";
/**
 * Lowers authored instructions prompt markdown into the shared public
 * definition shape. Instructions identity is path-derived, so the lowered
 * definition never carries a `name`.
 */
export declare function lowerInstructionsMarkdown(markdown: string): InstructionsDefinition;
/**
 * Optional input for {@link lowerSkillMarkdown}.
 *
 * `slug` is the path-derived skill identifier (the directory name for a
 * skill package, or the filename for a flat skill); it is used only to
 * derive a sensible default description when the markdown body has none.
 * Skill identity itself comes from the file path — the lowered definition
 * never carries a `name`.
 */
interface LowerSkillMarkdownInput {
    readonly description?: string;
    readonly slug?: string;
}
/**
 * Lowers an authored schedule markdown file into the shared public
 * definition shape. The frontmatter must contain `cron`. The body
 * becomes the schedule's `markdown` (the fire-and-forget prompt the
 * agent runs when the cron fires). Markdown-form schedules cannot
 * declare a `run` handler — use the `.ts` form for handler-based
 * schedules. Schedule identity is path-derived, so the lowered
 * definition never carries a `name`.
 */
export declare function lowerScheduleMarkdown(source: string): ScheduleDefinition;
/**
 * Lowers authored skill markdown into the shared public definition shape.
 *
 * Supports both packaged skill files (`SKILL.md` inside a skill directory;
 * description comes from frontmatter) and flat skill files (`<name>.md` next
 * to other skills; description may be derived from the markdown body).
 * Identity is path-derived, and frontmatter that eve does not use is a no-op.
 */
export declare function lowerSkillMarkdown(source: string, input?: LowerSkillMarkdownInput): SkillDefinition;
export {};
