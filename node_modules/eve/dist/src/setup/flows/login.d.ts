import { createPromptCommandOutput } from "#setup/cli/index.js";
import { getVercelAuthStatus } from "#setup/vercel-project.js";
import type { Prompter } from "../prompter.js";
export type LoginFlowResult = 
/** A `vercel whoami` already succeeds; nothing to do. */
{
    kind: "already";
}
/** `vercel login` ran and the directory is now authenticated. */
 | {
    kind: "logged-in";
}
/** `vercel login` exited without leaving an authenticated session. */
 | {
    kind: "failed";
}
/** The Vercel CLI is not installed, so login cannot start. */
 | {
    kind: "cli-missing";
}
/** Vercel could not be reached, so login state could not be determined. */
 | {
    kind: "unavailable";
}
/** The user stopped waiting (Cancel / Esc) before login completed. */
 | {
    kind: "cancelled";
};
/** Injected for tests; defaults to the real auth probe and `vercel login`. */
export interface LoginFlowDeps {
    getVercelAuthStatus: typeof getVercelAuthStatus;
    runVercelLogin: (input: {
        cwd: string;
        onOutput: ReturnType<typeof createPromptCommandOutput>;
        signal?: AbortSignal;
    }) => Promise<boolean>;
}
/**
 * THE LOGIN FLOW for the dev TUI's `/vc:login`. Short-circuits when already
 * authenticated; otherwise runs `vercel login` as a browser flow the TUI waits
 * on (see {@link runVercelLoginWithControls}) and re-probes after, so a
 * half-finished or abandoned login reports `failed`, never a false success.
 */
export declare function runLoginFlow(input: {
    appRoot: string;
    prompter: Prompter;
    /** Run the browser login even when the account-level Vercel session is valid. */
    force?: boolean;
    signal?: AbortSignal;
    deps?: Partial<LoginFlowDeps>;
}): Promise<LoginFlowResult>;
