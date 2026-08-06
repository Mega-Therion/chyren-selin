/**
 * Loads and parses a JSON file, returning the parsed value.
 *
 * Paths resolve relative to the application root directory (current working
 * directory). Pass an absolute path to load it directly.
 *
 * @example
 * ```ts
 * const data = await loadJson("evals/data/cases.json");
 * ```
 */
export declare function loadJson(filePath: string): Promise<unknown>;
