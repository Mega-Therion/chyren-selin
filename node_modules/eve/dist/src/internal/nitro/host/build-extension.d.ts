import { tryReadExtensionBuildConfig, type ExtensionBuildConfig } from "#internal/nitro/host/extension-build-config.js";
export { tryReadExtensionBuildConfig };
export type { ExtensionBuildConfig };
/**
 * Builds a dist-only extension package. Authored modules are transformed as a
 * path-preserving graph, declarations and assets are emitted beside them, and
 * compatibility-only metadata is written at the agent-shaped dist root.
 */
export declare function buildExtensionPackage(rootDir: string, config: ExtensionBuildConfig): Promise<string>;
