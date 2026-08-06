import type { RegistryConfig } from "#compiled/shadcn-registry/index.js";
export interface AddRegistryMappingsResult {
    added: string[];
    skippedBuiltIn: string[];
    skippedExisting: string[];
}
/** Reads registry namespace mappings from package.json. */
export declare function readRegistryConfig(appRoot: string): Promise<RegistryConfig>;
/** Adds explicit registry namespace mappings to package.json. */
export declare function addRegistryMappings(appRoot: string, arguments_: readonly string[]): Promise<AddRegistryMappingsResult>;
