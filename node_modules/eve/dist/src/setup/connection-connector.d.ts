import { type ChannelSetupLog } from "#setup/cli/index.js";
import type { Prompter } from "#setup/prompter.js";
import { type VercelProjectReference } from "#setup/project-resolution.js";
/** Controls connector selection while adding a Connect-backed connection. */
export interface SetupConnectionConnectorOptions {
    log: ChannelSetupLog;
    prompter: Prompter;
    projectRoot: string;
    slug: string;
    service: string;
    canonicalConnectorName: string;
    project: VercelProjectReference;
    signal?: AbortSignal;
}
/** Connector identity returned by the Vercel CLI. */
export interface ConnectConnectorRef {
    uid: string;
    id: string;
    name?: string;
}
export type SetupConnectionConnectorResult = {
    kind: "existing";
    connectorUid: string;
} | {
    kind: "created";
    connectorUid: string;
    connectorId: string;
};
/** Parses a created connector that can issue user credentials. */
export declare function parseCreatedConnector(stdout: string): ConnectConnectorRef | undefined;
/** Removes a connector created by this setup attempt. */
export declare function cleanupCreatedConnectionConnector(input: {
    log: ChannelSetupLog;
    projectRoot: string;
    connectorId: string;
    /** The linked Vercel owner; inferred from the project link when omitted. */
    orgId?: string;
}): Promise<void>;
/** Attaches the canonical connector by name first, then offers explicit Find/Create fallbacks. */
export declare function setupConnectionConnector(options: SetupConnectionConnectorOptions): Promise<SetupConnectionConnectorResult>;
