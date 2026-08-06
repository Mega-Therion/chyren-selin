/**
 * Generic version-walking migration framework for versioned durable
 * wire shapes. Each migration steps a value one version forward; the
 * runner chains them so a value written at any historic version can
 * be read at the current one.
 */
/**
 * One migration step in a version chain. `to` MUST equal `from + 1`
 * and `migrate` MUST stamp the returned value's `version` field with
 * `to`; the runner verifies both.
 */
export interface VersionMigration {
    readonly from: number;
    readonly to: number;
    migrate: (prior: unknown) => {
        readonly version: number;
    };
}
/**
 * Walks `value` through `migrations` until its `version` matches
 * `targetVersion`. Throws on missing migrations, malformed steps, or
 * a value newer than the runner supports.
 */
export declare function runMigrationChain<TOut extends {
    readonly version: number;
}>(input: {
    readonly value: unknown;
    readonly migrations: readonly VersionMigration[];
    readonly targetVersion: number;
    readonly label: string;
    /**
     * Version to read a wire value as when it carries no `version` field —
     * for shapes that predate versioning ("version 0"). Omit to require an
     * explicit numeric `version` (the default). A present but non-numeric
     * `version` is always malformed, opt-in or not.
     */
    readonly initialVersion?: number;
}): TOut;
