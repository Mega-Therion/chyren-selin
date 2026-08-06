import { type ChannelSetupLog } from "#setup/cli/index.js";
import type { VercelProjectReference } from "#setup/project-resolution.js";
import { runVercel, runVercelCaptureStdout } from "#setup/primitives/run-vercel.js";
export declare const GITHUB_TRIGGER_PATH = "/eve/v1/github";
/** Identity of the GitHub connector provisioned for an agent channel. */
export interface GitHubConnectorRef {
    /** GitHub's actual @mention handle, without the `[bot]` suffix. */
    appSlug: string;
    id: string;
    uid: string;
}
/** Effects used to provision a GitHub Connect connector. */
export interface ProvisionGitHubConnectorDeps {
    runVercel: typeof runVercel;
    runVercelCaptureStdout: typeof runVercelCaptureStdout;
}
/** Parses `vercel connect create -F json` output for an app-scoped GitHub connector. */
export declare function parseCreatedGitHubConnector(stdout: string): Omit<GitHubConnectorRef, "appSlug"> | undefined;
/** Creates a GitHub connector and routes its verified webhooks to eve. */
export declare function provisionGitHubConnector(input: {
    events: readonly string[];
    log: ChannelSetupLog;
    project: VercelProjectReference;
    projectRoot: string;
    slug: string;
    signal?: AbortSignal;
    deps?: ProvisionGitHubConnectorDeps;
}): Promise<GitHubConnectorRef>;
