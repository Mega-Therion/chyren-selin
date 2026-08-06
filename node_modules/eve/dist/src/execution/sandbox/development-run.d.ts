import type { SandboxBackendTags } from "#shared/sandbox-backend.js";
export declare const EVE_DEVELOPMENT_SANDBOX_RUN_ID_ENV = "EVE_DEVELOPMENT_SANDBOX_RUN_ID";
export declare const EVE_DEVELOPMENT_SANDBOX_METADATA_PATH_TAG = "eve.metadataPath";
export declare const EVE_DEVELOPMENT_SANDBOX_RUN_ID_TAG = "devRunId";
export declare function createDevelopmentSandboxRunId(): string;
export declare function getDevelopmentSandboxRunId(): string | undefined;
export declare function withDevelopmentSandboxTags(tags: SandboxBackendTags | undefined): SandboxBackendTags | undefined;
export declare function withDevelopmentSandboxMetadataPathTag(tags: SandboxBackendTags | undefined, metadataPath: string): SandboxBackendTags | undefined;
