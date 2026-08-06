import type { EveEval, EveEvalConfig } from "#evals/types.js";
/**
 * Discovers eval files under `<appRoot>/evals/` by recursively
 * scanning for files matching `*.eval.ts`.
 *
 * Returns absolute paths sorted alphabetically by relative path.
 */
export declare function discoverEvalFiles(appRoot: string): Promise<string[]>;
/**
 * Finds directories under `<appRoot>/agent/` that directly contain
 * `*.eval.ts` files. Used to produce a clear error when eval files are placed
 * inside the agent tree instead of the top-level `evals/` directory that
 * {@link discoverEvalFiles} scans.
 *
 * Returns app-root-relative, POSIX-normalized directory paths, sorted and
 * de-duplicated. Returns `[]` when `agent/` is absent.
 */
export declare function findMisplacedEvalDirs(appRoot: string): Promise<string[]>;
/**
 * Returns true when `evalId` matches one of the requested filters. A filter
 * matches its exact eval id or any eval nested under it, so `"runtime"`
 * matches both `evals/runtime.eval.ts` and every eval in `evals/runtime/`
 * (and every entry of an array-exported `evals/runtime.eval.ts`).
 */
export declare function matchesEvalFilter(evalId: string, filters: readonly string[]): boolean;
/**
 * Imports a discovered eval file and stamps the path-derived id(s) onto
 * the eval definition(s).
 *
 * The file must `export default` either one `EveEvalDefinition` (produced
 * by `defineEval()`) or an array of them. A single definition derives its
 * id from the file path; array entries derive `<file-id>/<index>` ids with
 * the index zero-padded to four digits (e.g. `"weather/0000"`).
 */
export declare function importEvalFile(appRoot: string, filePath: string): Promise<EveEval[]>;
/**
 * Discovers and imports all eval files, optionally filtering by eval id.
 * Filters match exactly or by directory prefix (see {@link matchesEvalFilter}).
 *
 * Throws when two files derive the same eval id (e.g. an array-exported
 * `evals/weather.eval.ts` colliding with `evals/weather/0000.eval.ts`).
 */
export declare function discoverAndImportEvals(appRoot: string, evalIds?: readonly string[]): Promise<EveEval[]>;
/**
 * Discovers and imports the required `evals/evals.config.ts` run-wide
 * configuration (produced by `defineEvalConfig()`).
 *
 * Throws when the file is missing or does not default-export a valid
 * `EveEvalConfig`.
 */
export declare function discoverEvalConfig(appRoot: string): Promise<EveEvalConfig>;
