import { type AuthoredModuleLoadOptions } from "#internal/authored-module-loader.js";
import type { ModuleSourceRef } from "#shared/source-ref.js";
import type { CompiledRuntimeModelCatalogLoader } from "#compiler/model-catalog.js";
/**
 * Shared compile-time context threaded through every per-primitive
 * normalize step.
 *
 * Holds expensive lazily-loaded resources (currently the model catalog)
 * so each `compileAgentManifest` invocation pays the load cost once and
 * reuses the cache across all of its child compilations.
 */
export interface ManifestCompileContext {
    readonly modelCatalog: CompiledRuntimeModelCatalogLoader;
}
export interface ModuleBackedDefinitionLoadOptions {
    readonly externalDependencies?: AuthoredModuleLoadOptions["externalDependencies"];
}
/**
 * Loads one authored module's value for a given source reference and
 * resolves any value-returning factory it may export.
 *
 * Used by every per-primitive compiler that targets a `module` source
 * (channels, sandboxes, tools, schedules, skills, prompt layers,
 * subagents). Wraps execution errors so the message identifies which
 * authored file failed.
 */
export declare function loadModuleBackedDefinition(input: {
    readonly agentRoot: string;
    readonly displayPath?: string;
    readonly externalDependencies?: ModuleBackedDefinitionLoadOptions["externalDependencies"];
    readonly kind: string;
    readonly source: ModuleSourceRef;
}): Promise<unknown>;
