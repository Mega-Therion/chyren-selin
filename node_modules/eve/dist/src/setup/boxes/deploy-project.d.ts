import { type ChannelSetupLog } from "#setup/cli/index.js";
import { detectPackageManager } from "#setup/package-manager.js";
import { runPackageManagerInstall } from "#setup/primitives/pm/run.js";
import { runVercel } from "#setup/primitives/run-vercel.js";
import { detectDeployment, type ProjectResolution } from "../project-resolution.js";
import { type SetupState } from "../state.js";
import type { SetupBox } from "../step.js";
import { syncHostFrameworkPreset } from "../vercel-project-framework.js";
/** Injected for tests; defaults to the real subprocess primitives. */
export interface DeployProjectDeps {
    runVercel: typeof runVercel;
    detectPackageManager: typeof detectPackageManager;
    runPackageManagerInstall: typeof runPackageManagerInstall;
    detectDeployment: typeof detectDeployment;
    syncHostFrameworkPreset: typeof syncHostFrameworkPreset;
}
export interface DeployProjectOptions {
    /** Deploy progress and command output stream through this log (rail styling preserved). */
    prompter: {
        log: ChannelSetupLog;
    };
    /** Skip the post-channel Vercel deployment entirely (`--no-deploy`). */
    skip?: boolean;
    /**
     * Run even without a planned or detected project, linking interactively from
     * inside `perform` (the `eve add channel/slack` composition; onboarding always has
     * a plan or skips deploy with the channels).
     */
    ensureLinkedProject?: "interactive-vercel-link";
    /**
     * Headless mode: gates interactive `vercel` commands inside `perform`. The box
     * asks no questions, so the dispatch decision the gather faces used to encode
     * comes from the composition site (the same place that picks the asker base),
     * not from a prompt.
     */
    headless?: boolean;
    deps?: DeployProjectDeps;
}
/**
 * What `perform` consumes. The headless flag gates interactive `vercel`
 * commands inside `perform`; it is fixed at composition time (the box prompts
 * for nothing) and passed straight through {@link DeployProjectOptions.headless}.
 */
export interface DeployProjectInput {
    headless: boolean;
}
/** The deploy facts `apply` records: the (re)deployed project and the cleared flags. */
export interface DeployProjectPayload {
    project: ProjectResolution;
    deploymentPending: boolean;
    deploymentDependenciesInstalled: boolean;
}
/**
 * THE DEPLOY BOX. Owns the post-channel `vercel deploy --prod` once channel
 * setup has marked deployment work pending: dependency install (once per
 * state), aligning the Vercel Framework Preset with the host framework on disk,
 * the production deploy, the env pull, and the deployment probe.
 *
 * The project was linked up front by the link box, so `perform` reuses
 * `state.project` and never triggers a second interactive `vercel link` (the
 * #1020 deadlock). When no resolution exists (no link box ran, e.g. the
 * `eve add channel/slack` composition), it falls back to the interactive bare
 * `vercel link`, or throws {@link HumanActionRequiredError} headlessly.
 *
 * Once the project is linked, {@link syncHostFrameworkPreset} runs before the
 * deploy so a project that gained a host framework (e.g. a web channel) builds
 * the host app instead of the stale `eve` agent preset. It is a no-op for a
 * plain agent (no host framework on disk) or an already-correct preset, so
 * every deploy surface — `eve add channel/slack`, the dev TUI `/deploy`, onboarding —
 * gets the reconcile without composing a separate box.
 */
export declare function deployProject(options: DeployProjectOptions): SetupBox<SetupState, DeployProjectInput, DeployProjectPayload>;
