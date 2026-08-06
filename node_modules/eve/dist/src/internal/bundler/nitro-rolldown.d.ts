type RolldownOutputChunk = {
    readonly type: "chunk";
    readonly code: string;
    readonly fileName: string;
};
type RolldownOutputAsset = {
    readonly type: "asset";
    readonly fileName: string;
    readonly source: string | Uint8Array;
};
type RolldownOutput = {
    readonly output: readonly [RolldownOutputChunk, ...(RolldownOutputChunk | RolldownOutputAsset)[]];
};
type RolldownParseAst = (sourceText: string, options?: Record<string, unknown> | null, filename?: string) => unknown;
export type RolldownParserLanguage = "js" | "jsx" | "ts" | "tsx";
type RolldownParseAstModule = {
    readonly parseAst: RolldownParseAst;
};
/**
 * Loads Rolldown's parser from Nitro's dependency tree so workflow directive
 * transforms can use the same bundler dependency without exposing it publicly.
 */
export declare function loadNitroRolldownParseAst(): Promise<RolldownParseAstModule>;
export declare function inferRolldownParserLanguage(filename: string): RolldownParserLanguage;
export declare function parseWithNitroRolldownAst(filename: string, sourceText: string): Promise<unknown>;
/**
 * Runs a raw Rolldown build. Prefer {@link buildSingleRolldownChunk} for any
 * bundle whose consumer expects one in-memory file; use this directly only
 * for multi-file, written-to-disk output.
 */
export declare function buildWithNitroRolldown(options: Record<string, unknown>): Promise<RolldownOutput>;
/**
 * Runs a Rolldown build whose contract is exactly one in-memory chunk:
 * code splitting is disabled and the result is asserted to contain a
 * single JavaScript chunk, so dynamic imports are inlined rather than
 * split into lazy chunks. Every eve single-file bundle (the authored-module
 * evaluator, immutable development generations, and workflow step/function
 * bundles) goes through this helper so the single-file policy and its
 * assertion cannot drift apart. The final Nitro production server build
 * does not use it and keeps code splitting enabled.
 */
export declare function buildSingleRolldownChunk(description: string, options: Record<string, unknown> & {
    readonly output?: Record<string, unknown>;
}): Promise<RolldownOutputChunk>;
export {};
