import type { Dirent } from "node:fs";
/**
 * Candidate authored sources for one flat slot such as `system` or `agent`.
 */
interface FlatSlotCandidates {
    markdownFileName?: string;
    moduleFileNames: string[];
}
/**
 * Candidate authored sources for one named directory slot such as
 * `tools/<name>`.
 */
interface NamedSlotCandidates extends FlatSlotCandidates {
    slotName: string;
}
/**
 * Collects markdown and module candidates for one flat slot in one directory.
 */
export declare function collectFlatSlotCandidates(entries: readonly Pick<Dirent<string>, "isFile" | "name">[], input: {
    markdownFileName?: string;
    moduleBaseName?: string;
}): FlatSlotCandidates;
/**
 * Groups markdown and module candidates for directory-backed named slots.
 */
export declare function collectNamedSlotCandidates(entries: readonly Pick<Dirent<string>, "isFile" | "name">[], input: {
    allowMarkdown: boolean;
    allowModules: boolean;
}): NamedSlotCandidates[];
export {};
