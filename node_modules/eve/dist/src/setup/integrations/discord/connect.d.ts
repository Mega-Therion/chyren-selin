import { type ChannelSetupLog } from "#setup/cli/index.js";
import type { VercelProjectReference } from "#setup/project-resolution.js";
import { runVercel, runVercelCaptureStdout } from "#setup/primitives/run-vercel.js";
export declare const DISCORD_TRIGGER_PATH = "/eve/v1/discord";
export interface DiscordConnectorRef {
    id: string;
    uid: string;
}
export interface ProvisionDiscordConnectorDeps {
    runVercel: typeof runVercel;
    runVercelCaptureStdout: typeof runVercelCaptureStdout;
}
/** Parses `vercel connect create -F json` output for a Discord connector. */
export declare function parseCreatedDiscordConnector(stdout: string): DiscordConnectorRef | undefined;
/** Creates a Discord connector and attaches its trigger to eve's route. */
export declare function provisionDiscordConnector(input: {
    botToken: string;
    log: ChannelSetupLog;
    project: VercelProjectReference;
    projectRoot: string;
    slug: string;
    signal?: AbortSignal;
    deps?: ProvisionDiscordConnectorDeps;
}): Promise<DiscordConnectorRef>;
