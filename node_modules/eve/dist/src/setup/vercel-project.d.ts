import { createPromptCommandOutput } from "#setup/cli/index.js";
import { runVercel, type VercelCaptureFailure } from "#setup/primitives/index.js";
import { readProjectLink, type ProjectResolution } from "./project-resolution.js";
import type { Prompter } from "./prompter.js";
import type { ResolvedVercelProjectSpec, VercelProjectIdentity } from "./state.js";
import { type VercelProjectOperationOptions } from "./vercel-project-api.js";
import { type CreatedProjectFrameworkOptions } from "./vercel-project-framework.js";
export interface PickProjectOptions extends VercelProjectOperationOptions {
    /** Whether an empty project list may fall back to entering a name to create. */
    allowCreateWhenEmpty?: boolean;
    /**
     * Searches the team for a project with this name before the list opens and
     * suggests the best match: floated to the top, cursor on it, marked
     * "suggested". Best-effort — a failed lookup falls back to the plain list.
     */
    suggestedName?: string;
}
export interface PickTeamOptions extends VercelProjectOperationOptions {
    /** Builds the team selector heading from the current team's display name. */
    selectMessage?: (currentTeam: string) => string;
}
export interface LinkProjectOperationOptions extends CreatedProjectFrameworkOptions {
}
/** Effects used to ensure an interactive Vercel project link. */
export interface EnsureLinkedVercelProjectDeps {
    readProjectLink: typeof readProjectLink;
    runVercel: typeof runVercel;
}
/**
 * Returns the existing Vercel project link or creates one through the Vercel
 * CLI's interactive flow. The CLI owns team and project selection.
 */
export declare function ensureLinkedVercelProject(input: {
    projectRoot: string;
    prompter: Prompter;
    signal?: AbortSignal;
    deps?: EnsureLinkedVercelProjectDeps;
}): Promise<NonNullable<Awaited<ReturnType<typeof readProjectLink>>>>;
export declare function unresolvedProject(): ProjectResolution;
/** Resolves the linked project id from a resolution, if any. */
export declare function projectIdFromResolution(project: ProjectResolution): string | undefined;
/** Resolves one project by exact name or id through the Vercel API. */
export declare function resolveProjectByNameOrId(projectRoot: string, team: string, projectNameOrId: string, options?: VercelProjectOperationOptions): Promise<VercelProjectIdentity | null>;
export declare function assertNewProjectNameAvailable(projectRoot: string, team: string, projectName: string, options?: VercelProjectOperationOptions): Promise<void>;
/**
 * Throws the login action. When the underlying `vercel whoami` failure is
 * known, its diagnostic is folded into the reason: without it the agent only
 * ever hears "log in", even when the real fault is a missing CLI or a transient
 * API error and the user is already authenticated.
 */
export declare function requireVercelLogin(failure?: VercelCaptureFailure): never;
/**
 * Throws the right outcome for a failed `vercel whoami`. ENOENT means the
 * binary isn't installed (its own action, not a login that would fail
 * identically); the explicit not-authenticated diagnostic is a login action;
 * anything else is a transient fault surfaced as a plain error, so the caller
 * reports "try again" rather than mislabeling it "log in".
 */
export declare function requireVercelAuth(failure: VercelCaptureFailure): never;
/**
 * The Vercel auth state, read-only. `cli-missing` (ENOENT) and `unavailable` (a
 * transient network/API fault) are each kept distinct from `logged-out` so a
 * caller never tells the user to log in when the real cause is a missing CLI or
 * an unreachable network. `logged-out` is claimed only from the explicit
 * not-authenticated diagnostic.
 */
export type VercelAuthStatus = "authenticated" | "logged-out" | "cli-missing" | "unavailable";
/** Returns the user-facing reason Vercel-backed setup is unavailable. */
export declare function vercelAuthBlockerReason(authStatus: VercelAuthStatus): string | undefined;
export declare function getVercelAuthStatus(projectRoot: string, options?: VercelProjectOperationOptions): Promise<VercelAuthStatus>;
/**
 * Ensures Vercel authentication before any provisioning. `vercel whoami` exits
 * non-zero when not logged in; any other failure (a missing CLI, a transient
 * API error) is surfaced verbatim rather than mislabeled as a login problem.
 */
export declare function requireAuth(projectRoot: string, prompter?: Prompter, options?: VercelProjectOperationOptions): Promise<void>;
/**
 * Non-throwing auth probe: whether the Vercel CLI has a logged-in user. Used
 * where authentication changes a decision (e.g. adopting an existing link)
 * rather than being a precondition to enforce.
 */
export declare function isVercelAuthenticated(projectRoot: string, options?: VercelProjectOperationOptions): Promise<boolean>;
/**
 * Resolves a passed team slug, or the current scope when unset, to a concrete
 * slug so every provisioning command can pass an explicit `--scope`.
 */
export declare function resolveTeam(projectRoot: string, team: string | undefined, options?: VercelProjectOperationOptions): Promise<string>;
/**
 * Validates a passed team slug against the account's teams, failing fast.
 *
 * When the slug is provided and the account's teams are listable, an unknown
 * slug throws so the run stops before any project mutation. When Vercel returns
 * an empty list, validation does not block and the later scoped command
 * surfaces any real scope error itself.
 *
 * `prompter` is accepted so callers can pass it uniformly across the team
 * resolution helpers; it is unused now that an invalid slug throws.
 */
export declare function validateTeam(prompter: Prompter, projectRoot: string, team: string | undefined, options?: VercelProjectOperationOptions): Promise<void>;
/**
 * Picks the Vercel team (scope). A passed slug is validated and resolved; with
 * zero or one team the current scope is used without prompting; otherwise the
 * user filters and chooses from the list with a single-selection picker.
 */
export declare function pickTeam(prompter: Prompter, projectRoot: string, presetTeam: string | undefined, options?: PickTeamOptions): Promise<string>;
/** Picks an existing project under a team, or a name to create when none exist. */
export declare function pickProject(prompter: Prompter, projectRoot: string, team: string, options?: PickProjectOptions): Promise<ResolvedVercelProjectSpec>;
/** Returns a project name for a new Vercel project, prompting when the default exists. */
export declare function pickNewProjectName(prompter: Prompter, projectRoot: string, team: string, defaultProjectName: string, options?: VercelProjectOperationOptions): Promise<string>;
/**
 * Ensures the concrete project exists (creating it for a `new` plan) and links
 * this directory to it. Acts on a fully-resolved spec — never prompts for a
 * team or project. A newly created project keeps a detected host framework
 * when the matching eve integration import is present; otherwise missing,
 * unsupported, or rejected framework detections are switched back to eve.
 * Returns the linked project, or undefined if `vercel link` did not complete.
 */
export declare function linkProject(prompter: Prompter, projectRoot: string, spec: ResolvedVercelProjectSpec, onOutput: ReturnType<typeof createPromptCommandOutput>, options?: LinkProjectOperationOptions): Promise<VercelProjectIdentity | undefined>;
