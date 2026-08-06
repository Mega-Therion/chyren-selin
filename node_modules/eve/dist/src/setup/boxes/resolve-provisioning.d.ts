import { type Asker } from "../ask.js";
import { pathExists } from "../path-exists.js";
import { detectProjectResolution, type ProjectResolution } from "../project-resolution.js";
import type { Prompter } from "../prompter.js";
import type { ProvisioningMode, ResolvedAiGateway, ResolvedVercelProject, SetupState, WiringMode } from "../state.js";
import type { SetupBox } from "../step.js";
import { assertNewProjectNameAvailable, isVercelAuthenticated, pickNewProjectName, pickProject, pickTeam, requireAuth, resolveProjectByNameOrId, resolveTeam, validateTeam } from "../vercel-project.js";
/** Injected for tests; defaults to the real Vercel project and fs helpers. */
export interface ResolveProvisioningDeps {
    requireAuth: typeof requireAuth;
    isVercelAuthenticated: typeof isVercelAuthenticated;
    detectProjectResolution: typeof detectProjectResolution;
    pathExists: typeof pathExists;
    validateTeam: typeof validateTeam;
    resolveTeam: typeof resolveTeam;
    pickTeam: typeof pickTeam;
    pickProject: typeof pickProject;
    pickNewProjectName: typeof pickNewProjectName;
    assertNewProjectNameAvailable: typeof assertNewProjectNameAvailable;
    resolveProjectByNameOrId: typeof resolveProjectByNameOrId;
}
export interface ResolveProvisioningOptions {
    /** Resolves the provisioning-tree questions; the composed stack decides how. */
    asker: Asker;
    /**
     * Still drives the Vercel reads that validate a decision (team/project
     * pickers, auth, name availability) and carries the spinner/progress log. The
     * deploy-tree questions themselves now travel the asker.
     */
    prompter: Prompter;
    /** Parent directory the project folder is created inside. Defaults to cwd. */
    targetDirectory?: string;
    /** Headless flags vs interactive prompts. The args are read only when headless. */
    mode: ProvisioningMode;
    /**
     * Whether a detected on-disk link short-circuits the interview. Defaults to
     * true — an in-place setup adopts the link it finds. False skips adoption so
     * the team/project pickers always run: the re-link path's whole point is
     * choosing a different project, so re-adopting the current link would be a
     * dead end.
     */
    adoptExistingLink?: boolean;
    /**
     * Which project choices this interactive composition permits. Onboarding
     * defaults to creating or linking; an explicit link flow goes directly from
     * team selection to the existing-project picker.
     */
    projectSelection?: "create-or-link" | "existing-only";
    teamSelectMessage?: (currentTeam: string) => string;
    deps?: ResolveProvisioningDeps;
}
/** Both provisioning plans plus the model wiring they imply. Input and payload. */
export interface ResolvedProvisioning {
    vercelProject: ResolvedVercelProject;
    aiGateway: ResolvedAiGateway;
    modelWiring: WiringMode;
    /**
     * The detected on-disk link when the target directory is already linked to
     * a Vercel project. Adopted instead of planning a project: the link is the
     * source of truth, so the project plan stays `none` (nothing to create or
     * link) and this resolution seeds `state.project`, exactly as in-project
     * setup models the same fact.
     */
    project?: ProjectResolution;
}
/**
 * THE PROVISIONING BOX: the last interview decision — where the agent runs —
 * made after the agent itself is described (name, model, channels,
 * connections) and before any filesystem writes or `vercel link` side
 * effects. Gather owns every decision (and the Vercel reads validating it);
 * `perform` passes the plan through untouched so `apply` can record it.
 */
export declare function resolveProvisioning(options: ResolveProvisioningOptions): SetupBox<SetupState, ResolvedProvisioning, ResolvedProvisioning>;
