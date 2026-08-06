/**
 * Detects whether an authored extension tree calls `defineState` from
 * `eve/context`. Usage is followed through local re-export barrels — aliased
 * re-exports, `export *`, and import-then-re-export chains — so indirect
 * usage still stamps the `state` capability requirement.
 */
export declare function extensionUsesState(sourceRoot: string): Promise<boolean>;
