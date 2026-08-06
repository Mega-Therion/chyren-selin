import type { FilePart, UserContent } from "ai";
import type { FetchFileResult } from "#channel/adapter.js";
import type { TeamsAttachment } from "#public/channels/teams/api.js";
import { type UploadPolicyInput } from "#public/channels/upload-policy.js";
import type { UploadPolicy } from "#public/channels/upload-policy.js";
/** File handling options for the native Teams channel. */
export interface TeamsFilesConfig {
    /**
     * Hosts whose file URLs may be fetched, or `"*"` for any host. Defaults to
     * `[]` (no hosts), so attachments are dropped until you allowlist their host.
     */
    readonly allowedHosts?: readonly string[] | "*";
    /** Enable inbound attachment ingestion. Off unless explicitly `true`. */
    readonly enabled?: boolean;
    /** Size and type limits applied to accepted attachments. */
    readonly uploadPolicy?: UploadPolicyInput;
}
/** Normalized file handling policy used by the Teams channel. */
export interface TeamsFilesPolicy {
    readonly allowedHosts: readonly string[] | "*";
    readonly enabled: boolean;
    readonly uploadPolicy: UploadPolicy;
}
/** Normalizes author-provided Teams file options. */
export declare function normalizeTeamsFilesPolicy(config: TeamsFilesConfig | undefined): TeamsFilesPolicy;
/** Collects Teams attachment file parts when file support is explicitly enabled. */
export declare function collectTeamsFileParts(attachments: readonly TeamsAttachment[], policy: TeamsFilesPolicy): FilePart[];
/** Combines text + file parts into the UserContent shape expected by the harness. */
export declare function buildTeamsTurnMessage(text: string, fileParts: readonly FilePart[]): string | UserContent;
/**
 * Builds the channel `fetchFile` resolver for Teams file URLs. Returns null when
 * files are disabled or the URL host is not in `allowedHosts`; otherwise fetches
 * the bytes and throws on a non-2xx response.
 */
export declare function createTeamsFetchFile(policy: TeamsFilesPolicy): (url: string) => Promise<FetchFileResult | null>;
