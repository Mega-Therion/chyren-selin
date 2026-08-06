import { type ChannelSetupLog, createPromptCommandOutput } from "#setup/cli/index.js";
import type { Prompter } from "./prompter.js";
import { type VercelProjectOperationOptions } from "./vercel-project-api.js";
export interface CreatedProjectFrameworkOptions extends VercelProjectOperationOptions {
    /** Detects whether project sources already use the eve integration for a host framework. */
    detectFrameworkIntegrationImport?: (projectRoot: string, importSpecifier: string) => Promise<boolean>;
    /** Never prompt; ambiguous host framework detections fall back to the eve preset. */
    headless?: boolean;
}
/**
 * Best-effort alignment of a linked Vercel project's Framework Preset with the
 * host framework the project declares on disk (e.g. Next.js).
 *
 * A project created as a standalone eve agent keeps the `eve` preset; adding a
 * host framework via `eve add channel/web` leaves it stale, so the deploy would
 * build the agent instead of the host app. Since that command already deploys on
 * the user's behalf, this switches the preset directly (no prompt) and notes the
 * change. No host framework, an unlinked directory, or an already-correct preset
 * is a no-op; a Vercel API failure warns rather than aborting the deploy.
 */
export declare function syncHostFrameworkPreset(prompter: {
    log: Pick<ChannelSetupLog, "info" | "warning">;
}, projectRoot: string, onOutput: ReturnType<typeof createPromptCommandOutput>, options: VercelProjectOperationOptions): Promise<void>;
export declare function ensureCreatedProjectFramework(prompter: Prompter, projectRoot: string, team: string, projectId: string, onOutput: ReturnType<typeof createPromptCommandOutput>, options: CreatedProjectFrameworkOptions): Promise<void>;
