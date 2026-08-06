import type { ProcessOutputHandler } from "#setup/primitives/process-output.js";
import { type RunVercelOptions } from "#setup/primitives/run-vercel.js";
/** Maximum time allowed for a Vercel Connect mutation. */
export declare const CONNECT_MUTATION_TIMEOUT_MS: number;
/** Outcome of replacing a connector's trigger destination. */
export type ConnectTriggerAttachmentResult = {
    state: "attached";
} | {
    state: "detach-failed";
} | {
    state: "attach-failed";
};
/** Inputs required to replace a Vercel Connect connector's trigger destination. */
export interface ReplaceConnectTriggerOptions {
    connectorUid: string;
    projectRoot: string;
    triggerPath: string;
    onOutput: ProcessOutputHandler;
    projectId?: string;
    orgId?: string;
    environment?: string;
    signal?: AbortSignal;
    deps?: {
        runVercel: (args: string[], options: RunVercelOptions) => Promise<boolean>;
    };
}
/**
 * Replaces a connector's existing trigger destination with one route on an eve
 * project. Detaching first prevents Connect from retaining a pathless default
 * destination created during connector provisioning.
 */
export declare function replaceConnectTrigger(options: ReplaceConnectTriggerOptions): Promise<ConnectTriggerAttachmentResult>;
