import type { MarkdownSourceRef, ModuleSourceRef } from "#shared/source-ref.js";
import { type DiscoverDiagnostic } from "#discover/diagnostics.js";
import type { ProjectSource, ProjectSourceEntry } from "#discover/project-source.js";
/**
 * Shared input shape for {@link discoverNamedSourceDirectory}.
 *
 * The walker collects authored `.ts/.cts/.mts/.js/.cjs/.mjs` modules under
 * one named root (e.g. `tools/`, `channels/`, `hooks/`) and — when
 * `allowMarkdown` is set — also `.md` files lowered through
 * `markdownLowerer` (e.g. `schedules/`). The walker emits a
 * `DISCOVER_SLOT_COLLISION` when a slot has both a markdown and module
 * file of the same base name.
 */
interface DiscoverNamedSourceDirectoryBaseInput {
    /**
     * Top-level directory name relative to `rootPath`
     * (eg. `"tools"`, `"channels"`, `"hooks"`).
     */
    directoryName: string;
    /**
     * Diagnostic code emitted when `directoryName` exists but is not a
     * directory.
     */
    invalidDirectoryCode: string;
    /**
     * Diagnostic message emitted when `directoryName` exists but is not a
     * directory.
     */
    invalidDirectoryMessage: string;
    rootEntries: readonly ProjectSourceEntry[];
    rootPath: string;
    source: ProjectSource;
    /**
     * Whether to descend into subdirectories. When `false`, only leaf files
     * directly inside `directoryName` are considered.
     */
    recursive: boolean;
    /**
     * Validates each path segment encountered during the walk. Called for
     * every leaf slot name and, when `recursive`, every subdirectory name.
     * Failed segments produce a diagnostic and the candidate is dropped.
     */
    validateSegment?: (segment: string, sourcePath: string) => DiscoverDiagnostic | null;
    /**
     * When set, emit this diagnostic for any leaf file that is neither a
     * supported authored module nor (when allowed) a markdown file. When
     * unset, unrecognized leaf files are silently ignored — used by
     * `tools/`, `channels/`, and `hooks/` so authors can drop incidental
     * files into those directories without build errors.
     */
    unsupportedFileCode?: string;
    unsupportedFileMessage?: (sourcePath: string, directoryName: string) => string;
    /**
     * When set, emit this diagnostic for any directory entry that is neither
     * a regular file nor a directory (sockets, FIFOs, etc.). Pairs with
     * `unsupportedFileCode` for callers that want strict leaf checking.
     */
    unsupportedEntryCode?: string;
    unsupportedEntryMessage?: (sourcePath: string, directoryName: string) => string;
}
/**
 * Module-only walker input. Markdown leaves are not collected.
 */
export interface DiscoverNamedSourceDirectoryModuleInput extends DiscoverNamedSourceDirectoryBaseInput {
    allowMarkdown?: false;
}
/**
 * Module-or-markdown walker input. Markdown leaves are lowered through
 * the supplied `markdownLowerer`.
 */
export interface DiscoverNamedSourceDirectoryWithMarkdownInput<TDefinition> extends DiscoverNamedSourceDirectoryBaseInput {
    allowMarkdown: true;
    markdownLowerer: (markdown: string, input: {
        name: string;
    }) => TDefinition;
}
/**
 * Discovers one named directory of authored sources, supporting flat or
 * recursive walks and (optionally) markdown leaves alongside modules.
 *
 * Used by the `tools/` (flat), `channels/` (recursive), `hooks/`
 * (recursive), `lib/` (recursive), and `schedules/` (recursive,
 * markdown-or-module) slots.
 *
 * Returned `sources` preserve depth-first walk order: subdirectories are
 * traversed before leaf files at each level, and entries are alphabetically
 * sorted within each level.
 */
export declare function discoverNamedSourceDirectory(input: DiscoverNamedSourceDirectoryModuleInput): Promise<{
    diagnostics: DiscoverDiagnostic[];
    sources: ModuleSourceRef[];
}>;
export declare function discoverNamedSourceDirectory<TDefinition>(input: DiscoverNamedSourceDirectoryWithMarkdownInput<TDefinition>): Promise<{
    diagnostics: DiscoverDiagnostic[];
    sources: (MarkdownSourceRef<TDefinition> | ModuleSourceRef)[];
}>;
export {};
