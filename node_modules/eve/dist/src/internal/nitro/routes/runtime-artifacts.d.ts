import { type RuntimeCompiledArtifactsSource } from "#runtime/compiled-artifacts-source.js";
/**
 * Configuration values needed to resolve the compiled-artifact source for
 * package-owned Nitro routes. Passed explicitly from virtual handlers
 * rather than read from a global runtime configuration store.
 */
export interface DevelopmentNitroArtifactsConfig {
    readonly appRoot: string;
    readonly devRuntimeArtifactsPointerPath: string;
    /**
     * Set when durable Workflow payloads may store a logical generation
     * selector instead of this source's exact snapshot path. Only true when
     * the parent-owned dev World delivers the queue, because only those
     * deliveries install the context that resolves the selector.
     */
    readonly durableArtifactsReference?: "development-generation";
    readonly kind: "development";
    readonly moduleMapLoaderPath: string;
}
export interface ProductionNitroArtifactsConfig {
    readonly kind: "production";
}
export type NitroArtifactsConfig = DevelopmentNitroArtifactsConfig | ProductionNitroArtifactsConfig;
/**
 * Resolves the compiled-artifact source available to package-owned Nitro
 * routes.
 */
export declare function resolveNitroCompiledArtifactsSource(config: NitroArtifactsConfig): RuntimeCompiledArtifactsSource;
