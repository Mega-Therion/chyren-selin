import { detectProjectResolution, type ProjectResolution } from "../project-resolution.js";
import type { Prompter } from "../prompter.js";
import { type SetupState } from "../state.js";
import type { SetupBox } from "../step.js";
import { linkProject, unresolvedProject } from "../vercel-project.js";
/** Injected for tests; defaults to the real Vercel project helpers. */
export interface LinkProjectDeps {
    linkProject: typeof linkProject;
    detectProjectResolution: typeof detectProjectResolution;
    unresolvedProject: typeof unresolvedProject;
}
export interface LinkProjectOptions {
    /** Streams link progress and, in interactive runs, may confirm ambiguous framework detection. */
    prompter: Prompter;
    /** Headless runs must not ask follow-up questions after the plan is fixed. */
    headless?: boolean;
    deps?: LinkProjectDeps;
}
/**
 * Executes the resolved Vercel project plan after scaffolding, once the project
 * directory exists. Gather prompts for nothing: the team/project decision was
 * made in the resolve-provisioning box. Interactive runs may still confirm
 * ambiguous host framework detections; headless runs resolve those
 * deterministically inside `linkProject`.
 *
 * The plan is authoritative: the box always re-links to the planned project so
 * a stale or mismatched `.vercel` link can't silently win. Re-linking the same
 * identity is idempotent. The resolution read back from the link metadata lands
 * in `state.project`.
 */
export declare function linkVercelProject(options: LinkProjectOptions): SetupBox<SetupState, null, ProjectResolution>;
