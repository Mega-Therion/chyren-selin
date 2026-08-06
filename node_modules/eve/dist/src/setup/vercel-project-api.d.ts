import { type VercelCaptureFailure } from "#setup/primitives/index.js";
import { z } from "zod";
import type { VercelProjectOperationOptions } from "./project-resolution.js";
export type { VercelProjectOperationOptions };
/** Shared deadline for Vercel project list and exact-lookup requests. */
export declare const VERCEL_PROJECT_REQUEST_TIMEOUT_MS = 15000;
declare const VercelTeamListEntrySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    current: z.ZodBoolean;
}, z.core.$strip>;
type VercelTeamListEntry = z.infer<typeof VercelTeamListEntrySchema>;
declare const VercelProjectListEntrySchema: z.ZodObject<{
    name: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
export type VercelProjectListEntry = z.infer<typeof VercelProjectListEntrySchema>;
/** One ranked Vercel project search page and its optional continuation cursor. */
export interface VercelProjectSearchPage {
    readonly projects: VercelProjectListEntry[];
    readonly next?: number;
}
/** Parses one JSON response captured from the Vercel CLI. */
export declare function parseVercelJson(stdout: string, description: string): unknown;
/** Converts a scoped API denial into the Vercel re-authentication action. */
export declare function requireVercelTeamAccess(failure: VercelCaptureFailure): never;
/** Lists up to the maximum 100 Vercel scopes supported by the CLI. */
export declare function listTeams(projectRoot: string, options?: VercelProjectOperationOptions): Promise<VercelTeamListEntry[]>;
/** Lists the 20 most recent Vercel projects in one account scope. */
export declare function listRecentProjects(projectRoot: string, team: string, options?: VercelProjectOperationOptions): Promise<VercelProjectListEntry[]>;
/** Ranks exact and prefix project-name matches ahead of substring matches. */
export declare function rankProjectSearchResults(projects: readonly VercelProjectListEntry[], query: string): VercelProjectListEntry[];
/** Searches one ranked Vercel project page and retains its continuation cursor. */
export declare function searchProjects(projectRoot: string, team: string, query: string, options?: VercelProjectOperationOptions & {
    readonly next?: number;
}): Promise<VercelProjectSearchPage>;
