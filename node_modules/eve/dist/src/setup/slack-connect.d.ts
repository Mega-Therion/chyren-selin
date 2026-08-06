/**
 * Pure parsers for Vercel Connect CLI/API payloads used by Slackbot
 * provisioning: connector-list shapes, the `connect create` stdout, and the
 * connector detail response. No subprocesses or I/O — just shape validation —
 * so the provisioning orchestrator ({@link import("./slackbot.js")}) stays
 * focused on flow and these stay trivially testable.
 */
import { z } from "zod";
export interface VercelConnectListResponse {
    /** `vercel connect list -F json` (current CLI). */
    connectors?: unknown;
    /** Older CLI builds emitted the same array under `clients`. */
    clients?: unknown;
}
declare const SlackConnectorRefSchema: z.ZodObject<{
    uid: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
/** Identifiers returned by Vercel Connect for a Slack connector. */
export type SlackConnectorRef = z.infer<typeof SlackConnectorRefSchema>;
/** Slack workspace metadata exposed by a connected Slack connector. */
export interface SlackWorkspaceConnection {
    workspaceUrl: string;
    workspaceName?: string;
}
/** Parsed Slack connector state returned by Vercel's connector detail API. */
export interface SlackConnectorDetails {
    ref: SlackConnectorRef;
    workspace?: SlackWorkspaceConnection;
}
/**
 * Parses the exact connector response. Vercel reports a completed Slack
 * workspace connection in `data.slackTeam`; its installations collection can
 * remain empty even after browser setup succeeds.
 */
export declare function parseSlackConnectorDetails(body: unknown): SlackConnectorDetails | undefined;
/**
 * Reads the connector identifiers from `vercel connect create … -F json`
 * stdout, the authoritative source for the just-created connector's UID.
 * Returns `undefined` when stdout is empty or not the expected JSON.
 */
export declare function parseCreatedSlackConnector(stdout: string): SlackConnectorRef | undefined;
/**
 * Finds the expected connector, or the newest Slack connector already attached to this project.
 */
export declare function pickSlackConnector(listJson: unknown, projectId: string | undefined, expectedUid: string | undefined): SlackConnectorRef | undefined;
/**
 * Turns a Slack `app_redirect` install URL into a deep link that opens the
 * Messages tab, a DM compose with the bot, instead of the app's about page.
 * Slack honors `tab=messages` only on `app_redirect` links, the ones carrying
 * `app` and `team` ids; any other URL is returned unchanged.
 * See https://docs.slack.dev/interactivity/deep-linking/.
 */
export declare function slackMessageDeepLink(url: string): string;
/** A Slack connector plus the project ids it is attached to. */
export interface RawSlackConnector {
    uid: string;
    id?: string;
    projectIds: readonly string[];
    createdAt: number;
}
/** Parses Slack connectors (uid + attached project ids) from a connect-list response. */
export declare function parseSlackConnectors(listJson: unknown): RawSlackConnector[];
export {};
