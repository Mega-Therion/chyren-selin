import type { ChannelSetupLog } from "#setup/cli/index.js";
import type { VercelProjectReference } from "#setup/project-resolution.js";
import { runVercel, runVercelCaptureStdout } from "#setup/primitives/run-vercel.js";
export declare const PHOTON_CONNECT_SERVICE = "photon";
export declare const PHOTON_CONNECTOR_TYPE = "photon";
export declare const PHOTON_TRIGGER_PATH = "/eve/v1/photon";
/** Photon project credentials collected separately from their Connect storage encoding. */
export interface PhotonProjectCredentials {
    projectId: string;
    projectSecret: string;
}
/** Identity of a native Photon connector created through Vercel Connect. */
export interface PhotonConnectorRef {
    id: string;
    uid: string;
    /** Direct project URL used until Photon is available as a managed trigger connector. */
    webhookUrl?: string;
}
/** Effects used to provision a Photon connector. */
export interface ProvisionPhotonConnectorDeps {
    runVercel: typeof runVercel;
    runVercelCaptureStdout: typeof runVercelCaptureStdout;
}
/** Input for provisioning one Photon connector and its eve webhook destination. */
export interface ProvisionPhotonConnectorOptions {
    credentials: PhotonProjectCredentials;
    log: ChannelSetupLog;
    project: VercelProjectReference;
    projectRoot: string;
    slug: string;
    signal?: AbortSignal;
    deps?: ProvisionPhotonConnectorDeps;
}
/** Parses `vercel connect create -F json` output for a Photon connector. */
export declare function parseCreatedPhotonConnector(stdout: string): PhotonConnectorRef | undefined;
/**
 * Creates a native Photon connector and attaches its verified webhook trigger
 * to the linked project. Secrets travel over stdin, never argv.
 */
export declare function provisionPhotonConnector(options: ProvisionPhotonConnectorOptions): Promise<PhotonConnectorRef>;
