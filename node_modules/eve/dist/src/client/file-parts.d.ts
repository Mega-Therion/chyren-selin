import type { FilePart, UserContent } from "ai";
/**
 * Creates an AI SDK `FilePart` whose data is an inline `data:` URL.
 */
export declare function createDataUrlFilePart(input: {
    readonly bytes: Uint8Array;
    readonly filename?: string;
    readonly mediaType: string;
}): FilePart;
/**
 * Builds one user turn containing text plus an inline file attachment.
 */
export declare function createTextWithFileContent(input: {
    readonly bytes: Uint8Array;
    readonly filename?: string;
    readonly mediaType: string;
    readonly text: string;
}): UserContent;
