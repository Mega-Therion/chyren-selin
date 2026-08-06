/**
 * Converts filesystem paths into ESM-safe import specifiers.
 *
 * Node's ESM loader rejects raw Windows absolute paths such as
 * `G:\app\handler.js` because the drive letter is parsed as a URL scheme.
 * Generated source should import filesystem targets through `file://` URLs
 * while leaving virtual, package, and relative specifiers usable by bundlers.
 */
export declare function normalizeEsmImportSpecifier(specifier: string): string;
/**
 * Serializes an import specifier for direct insertion into generated ESM code.
 */
export declare function stringifyEsmImportSpecifier(specifier: string): string;
/**
 * Rewrites generated ESM source containing raw Windows absolute imports.
 */
export declare function normalizeGeneratedEsmImportSpecifiers(source: string): string;
