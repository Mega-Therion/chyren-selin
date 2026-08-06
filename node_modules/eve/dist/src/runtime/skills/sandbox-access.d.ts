import type { SandboxAccess } from "#sandbox/state.js";
import type { SkillHandle } from "#execution/skills/types.js";
/**
 * Validates a skill id before it is used as one path segment under
 * the sandbox skill root.
 */
export declare function assertSafeSkillId(id: string): asserts id is string;
/**
 * Reads one skill's instruction markdown from the current sandbox.
 *
 * Returns the SKILL.md body with any YAML frontmatter stripped, so the
 * model receives plain markdown as the tool result. Throws when the id
 * is unsafe or the file does not exist; the AI SDK forwards the error
 * to the model as a tool-error result. `availableNames`, when given, is
 * listed in the not-found error so the model can correct a wrong id.
 */
export declare function loadSkillFromSandbox(access: SandboxAccess, id: string, availableNames?: readonly string[]): Promise<string>;
/**
 * Creates the public runtime skill handle. Existence is checked lazily by
 * each file read against the sandbox.
 */
export declare function createSandboxSkillHandle(access: SandboxAccess, id: string): SkillHandle;
