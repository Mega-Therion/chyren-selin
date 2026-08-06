interface BundlerPluginShape {
    readonly name: string;
    load?(id: string): string | null | undefined;
    resolveId?(source: string, importer: string | undefined): string | {
        id: string;
    } | null | undefined;
}
/**
 * Creates the bundler plugin that prunes the local sandbox backends
 * (Docker, just-bash, microsandbox) from hosted Nitro server bundles.
 * Every local-engine export flows through `bindings/local.js`, so
 * stubbing that one module removes all of them; the stub mirrors the
 * facade's export surface.
 */
export declare function createCompiledSandboxBackendPrunePlugin(): BundlerPluginShape;
export {};
