import { detectPackageManager } from "#setup/package-manager.js";
import { runVercel, spawnPackageManager } from "#setup/primitives/index.js";
import { getVercelAuthStatus } from "#setup/vercel-project.js";
import type { Prompter } from "../prompter.js";
export type InstallVercelCliResult = 
/** The CLI is already resolvable; nothing to do. */
{
    kind: "already";
}
/** The package manager installed it and it now resolves. */
 | {
    kind: "installed";
}
/** The install exited non-zero, or the CLI still isn't on PATH afterward. */
 | {
    kind: "failed";
    reason?: string;
}
/** The user interrupted (Ctrl-C / Esc) before the install finished. */
 | {
    kind: "cancelled";
};
/** Injected for tests; defaults to the real probe, detection, and install. */
export interface InstallVercelCliDeps {
    getVercelAuthStatus: typeof getVercelAuthStatus;
    detectPackageManager: typeof detectPackageManager;
    runVercel: typeof runVercel;
    spawnPackageManager: typeof spawnPackageManager;
}
/**
 * THE INSTALL FLOW for the dev TUI's `/vc:install`: the fix command for the
 * "Vercel CLI not found" diagnostic, so every diagnostic has a matching
 * command. Short-circuits when the CLI already resolves; otherwise runs a
 * global install with the project's package manager, streaming output to the
 * rail, then re-probes. A global install can exit clean yet leave the binary
 * off PATH (pnpm/yarn global bins commonly aren't), so success is confirmed by
 * the re-probe, not the exit code alone. `upgrade` invokes the active Vercel
 * CLI's native upgrader so it can update the installation that owns that
 * executable, independent of the project's package manager.
 */
export declare function runInstallVercelCliFlow(input: {
    appRoot: string;
    prompter: Prompter;
    /** Reinstall the latest CLI even when an existing binary resolves. */
    upgrade?: boolean;
    signal?: AbortSignal;
    deps?: Partial<InstallVercelCliDeps>;
}): Promise<InstallVercelCliResult>;
