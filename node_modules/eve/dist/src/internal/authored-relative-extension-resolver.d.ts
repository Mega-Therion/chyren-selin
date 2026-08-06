/**
 * Resolves extensionless path imports before Rolldown's default resolver.
 */
export declare function createAuthoredRelativeExtensionResolverPlugin(input: {
    readonly extensions: readonly string[];
}): Record<string, unknown>;
