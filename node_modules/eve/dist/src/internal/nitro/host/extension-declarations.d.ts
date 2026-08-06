/**
 * Emits declarations for an extension source tree using the extension's own
 * TypeScript installation and authored tsconfig when available.
 */
export declare function emitExtensionDeclarations(input: {
    readonly appRoot: string;
    readonly declarationsRoot: string;
    readonly moduleLogicalPaths: readonly string[];
    readonly sourceRoot: string;
}): Promise<void>;
