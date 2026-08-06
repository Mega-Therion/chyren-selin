import { type GrayMatterFile } from "#compiled/gray-matter/index.js";
/** Options for {@link parseFrontmatter}. */
export interface ParseFrontmatterOptions {
    /**
     * Opt in to gray-matter's built-in code-capable engines, so a `---js` /
     * `---javascript` frontmatter fence is `eval()`d while parsing. This runs
     * arbitrary code the instant the document is read, so only enable it for
     * input you fully control and trust. Defaults to `false`, which rejects a
     * JavaScript frontmatter fence instead of evaluating it.
     */
    readonly allowCodeEngines?: boolean;
}
/**
 * Parses a document's YAML frontmatter and body.
 *
 * Safe by default: the code-capable frontmatter engines are disabled, so a
 * `---js` fence throws rather than executing. This is the only supported way
 * to run gray-matter in eve — callers must not import the bundled module
 * directly, so that untrusted input can never reach an evaluating engine by
 * accident. Pass `{ allowCodeEngines: true }` to deliberately opt back into
 * evaluation for trusted input.
 */
export declare function parseFrontmatter(source: string, options?: ParseFrontmatterOptions): GrayMatterFile<string>;
/** Reports whether a document opens with a frontmatter delimiter. */
export declare function hasFrontmatter(source: string): boolean;
