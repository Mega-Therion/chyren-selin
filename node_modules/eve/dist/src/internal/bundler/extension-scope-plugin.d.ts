/**
 * One extension's on-disk source root paired with the namespace its durable
 * state keys and config binding must be scoped to.
 */
export interface ExtensionScope {
    /** Absolute path to the extension's source root. */
    readonly sourceRoot: string;
    /** Package-derived namespace (e.g. `acme-crm`). */
    readonly packageNamespace: string;
}
/** The subset of the rolldown/rollup plugin shape this plugin implements. */
export interface ExtensionScopeBundlerPlugin {
    readonly name: string;
    resolveId(source: string, importer: string | undefined): string | undefined;
    load(id: string): {
        code: string;
        moduleType: "js";
    } | undefined;
}
/**
 * Path-containment scope plugin for the whole-application bundle (the production
 * build). Any module physically under an extension's source root has its
 * `eve/context`/`eve/extension` imports redirected to a generated shim that
 * bakes the extension's package namespace into `defineState`/`defineExtension`.
 *
 * Returns `null` when there are no extensions, so consumer-only builds carry no
 * extra plugin and their output is byte-identical to a non-extension build.
 */
export declare function createExtensionScopePlugin(scopes: readonly ExtensionScope[]): ExtensionScopeBundlerPlugin | null;
/**
 * Fixed-namespace scope plugin for a single extension-owned module bundle (the
 * dev/eval per-module loader). The compiler already knows the loaded module is
 * extension-owned and under which namespace, so every module in the bundle —
 * the entry plus its same-package dependencies — is scoped, with no reliance on
 * filesystem path matching (which is unreliable under workspace symlinks).
 */
export declare function createFixedNamespaceScopePlugin(namespace: string): ExtensionScopeBundlerPlugin;
