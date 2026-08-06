import { type ChannelSetupLog } from "#setup/cli/index.js";
import type { VercelProjectReference } from "#setup/project-resolution.js";
import { runVercel, runVercelCaptureStdout } from "#setup/primitives/run-vercel.js";
export declare const LINEAR_TRIGGER_PATH = "/eve/v1/linear";
/** Identity of the Linear connector provisioned for an agent channel. */
export interface LinearConnectorRef {
    id: string;
    uid: string;
}
/** Effects used to provision a Linear Connect connector. */
export interface ProvisionLinearConnectorDeps {
    runVercel: typeof runVercel;
    runVercelCaptureStdout: typeof runVercelCaptureStdout;
}
/** Parses `vercel connect create -F json` output for an app-scoped Linear connector. */
export declare function parseCreatedLinearConnector(stdout: string): LinearConnectorRef | undefined;
/** Finds the canonical Linear connector if it already exists in this Vercel team. */
export declare function findLinearConnector(input: {
    project: VercelProjectReference;
    projectRoot: string;
    slug: string;
    signal?: AbortSignal;
    deps?: ProvisionLinearConnectorDeps;
}): Promise<LinearConnectorRef | undefined>;
/** Attaches a Linear connector's verified events to this agent's production route. */
export declare function attachLinearConnector(input: {
    connector: LinearConnectorRef;
    log: ChannelSetupLog;
    project: VercelProjectReference;
    projectRoot: string;
    signal?: AbortSignal;
    deps?: ProvisionLinearConnectorDeps;
}): Promise<void>;
/** Creates a Linear connector and routes its verified Agent Session events to eve. */
export declare function provisionLinearConnector(input: {
    log: ChannelSetupLog;
    project: VercelProjectReference;
    projectRoot: string;
    slug: string;
    signal?: AbortSignal;
    deps?: ProvisionLinearConnectorDeps;
}): Promise<LinearConnectorRef>;
