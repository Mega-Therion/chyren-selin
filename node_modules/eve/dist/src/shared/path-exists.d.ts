/**
 * Returns `true` when `path` exists, `false` when it does not, and
 * rethrows every other filesystem error (`EACCES`, `EIO`, ...).
 *
 * Distinct from `#setup/path-exists.js`, which swallows all errors:
 * callers here make crash-recovery decisions, so a permission failure
 * must surface rather than masquerade as "does not exist".
 */
export declare function pathExists(path: string): Promise<boolean>;
