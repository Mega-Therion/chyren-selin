import { type ExtensionCapabilityRequirements } from "#compiler/extension-compatibility.js";
import type { AgentSourceManifest } from "#discover/manifest.js";
import type { ModuleSourceRef } from "#shared/source-ref.js";
/** Derives only the extension-facing contracts used by one authored tree. */
export declare function deriveExtensionCapabilityRequirements(input: {
    readonly declarationModule: ModuleSourceRef;
    readonly manifest: AgentSourceManifest;
    readonly runtimeDependencies: readonly string[];
    readonly sourceRoot: string;
}): Promise<ExtensionCapabilityRequirements>;
