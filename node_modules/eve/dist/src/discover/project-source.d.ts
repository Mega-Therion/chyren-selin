/**
 * Minimum directory-entry shape returned by a {@link ProjectSource}.
 *
 * Intentionally matches the subset of `node:fs` `Dirent` methods discovery
 * actually reads: `name` and the structural type predicates. The matching
 * shape lets {@link DiskProjectSource} return real `Dirent<string>` values
 * without an adapter wrapper, while {@link MemoryProjectSource} can return
 * lightweight plain objects.
 */
export interface ProjectSourceEntry {
    readonly name: string;
    isDirectory(): boolean;
    isFile(): boolean;
}
/**
 * Result of a filesystem-style stat against a {@link ProjectSource}.
 *
 * - `directory` / `file`: the path resolves to one of those kinds.
 * - `missing`: the path does not exist in the source.
 * - `other`: the path exists but is neither a directory nor a regular file
 *   (symlink, socket, device). Discovery treats this identically to
 *   `missing` in most places but keeps the distinction for diagnostics.
 */
export type ProjectSourceEntryKind = "directory" | "file" | "missing" | "other";
/**
 * Abstraction over the filesystem root discovery reads from.
 *
 * Every read performed by `src/discover/**` goes through a `ProjectSource`
 * rather than `node:fs` directly. Production callers use
 * {@link createDiskProjectSource} — a one-line wrapper around `node:fs` that
 * preserves existing behaviour. Tests can swap in
 * {@link createMemoryProjectSource} to run discovery against an in-memory
 * tree without touching disk, `mkdtemp`, or any fixture copying.
 *
 * The interface is intentionally small: discovery needs to read directory
 * entries, read UTF-8 text files, and classify paths by kind. Nothing more.
 */
export interface ProjectSource {
    /**
     * Diagnostic label for this source (e.g. `"disk"` or `"memory"`).
     * Used only for logs and error messages.
     */
    readonly kind: "disk" | "memory";
    /**
     * Returns the entries of `directoryPath` without any intrinsic ordering.
     * Callers that require stable ordering should sort explicitly.
     *
     * Throws when the path does not resolve to a directory — callers that
     * want "missing is OK" should stat first.
     */
    readDirectory(directoryPath: string): Promise<readonly ProjectSourceEntry[]>;
    /**
     * Returns the UTF-8 text content of `filePath`. Throws when the path is
     * missing or is not a regular file.
     */
    readTextFile(filePath: string): Promise<string>;
    /**
     * Returns the kind of `targetPath` without throwing for missing paths.
     */
    stat(targetPath: string): Promise<ProjectSourceEntryKind>;
}
/**
 * Creates a {@link ProjectSource} backed by the real filesystem. This is the
 * default for production and for the scenario tier.
 */
export declare function createDiskProjectSource(): ProjectSource;
/**
 * Declarative descriptor of an in-memory directory tree consumed by
 * {@link createMemoryProjectSource}.
 *
 * Keys are paths; values are UTF-8 text or `{ content }` records.
 */
export interface MemoryProjectSourceInput {
    /**
     * Optional root hint used only for diagnostics. The source itself accepts
     * reads against any path — unrelated absolute paths simply resolve as
     * missing.
     */
    readonly rootDir?: string;
    /**
     * Map of absolute paths to file content.
     */
    readonly files: Readonly<Record<string, string | {
        readonly content: string;
    }>>;
    /**
     * Optional list of absolute paths that should exist as directories even
     * though no files live underneath them. Discovery treats these exactly
     * like real empty folders on disk — they appear in `readDirectory`
     * listings of their parent and return `"directory"` from `stat`.
     *
     * Every parent of every file in {@link files} is already registered as
     * a directory automatically, so this field is only needed for empty
     * folders (for example, to assert that an empty `connections/` folder
     * produces no diagnostics).
     */
    readonly directories?: readonly string[];
}
/**
 * Creates a {@link ProjectSource} backed by an in-memory file tree.
 *
 * Directories are inferred from the set of file paths: every parent of
 * every file is treated as a directory, and directory listings return the
 * immediate children. This matches the shape of real filesystems closely
 * enough for all discovery code paths.
 */
export declare function createMemoryProjectSource(input: MemoryProjectSourceInput): ProjectSource;
