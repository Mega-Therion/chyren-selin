import type { UserContent } from "ai";
import type { LinearFetch } from "#public/channels/linear/api.js";
import { type LinearChannelCredentials } from "#public/channels/linear/auth.js";
/** One trusted Linear upload referenced by markdown image syntax. */
export interface LinearUploadImageReference {
    readonly altText: string;
    readonly end: number;
    readonly start: number;
    readonly url: URL;
}
/** Extracts markdown image references that target Linear's exact upload origin. */
export declare function extractLinearUploadImageReferences(markdown: string): readonly LinearUploadImageReference[];
/** Adds authenticated Linear upload images to otherwise text-only inbound content. */
export declare function attachLinearInboundImages(input: {
    readonly content: UserContent;
    readonly credentials?: LinearChannelCredentials;
    readonly fetch?: LinearFetch;
}): Promise<UserContent>;
