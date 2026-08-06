/**
 * Loads a YAML file and returns its top-level mapping as a plain object.
 *
 * Paths resolve relative to the application root directory (current working
 * directory). An absolute path loads directly. It parses the file as a YAML
 * mapping, so the result is always a `Record<string, unknown>` (never a scalar
 * or array). If the file begins with a `---` frontmatter delimiter, it returns
 * only the frontmatter mapping and ignores any content after the closing `---`.
 *
 * @example
 * ```ts
 * const doc = await loadYaml("evals/data/cases.yaml");
 * const rows = doc.evals;
 * ```
 */
export declare function loadYaml(filePath: string): Promise<Record<string, unknown>>;
