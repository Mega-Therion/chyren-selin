import type { SandboxNetworkPolicy } from "#shared/sandbox-network-policy.js";
export declare const MICROSANDBOX_METADATA_VERSION = 2;
export declare const MICROSANDBOX_METADATA_FILE_NAME = "metadata.json";
export interface MicrosandboxTemplateMetadata {
    readonly optionsHash: string;
    readonly snapshotName: string;
    readonly version: typeof MICROSANDBOX_METADATA_VERSION;
}
export interface MicrosandboxSessionMetadata {
    readonly networkPolicy?: SandboxNetworkPolicy;
    readonly optionsHash: string;
    readonly sandboxName: string;
    readonly stateSnapshotName?: string;
    readonly version: typeof MICROSANDBOX_METADATA_VERSION;
}
export declare function resolveMicrosandboxMetadataPath(rootPath: string): string;
export declare function readTemplateMetadata(path: string): Promise<MicrosandboxTemplateMetadata | null>;
export declare function writeTemplateMetadata(path: string, metadata: MicrosandboxTemplateMetadata): Promise<void>;
export declare function readSessionMetadata(path: string): Promise<MicrosandboxSessionMetadata | null>;
export declare function readSessionMetadataRecord(value: unknown): MicrosandboxSessionMetadata | null;
export declare function writeSessionMetadata(path: string, metadata: MicrosandboxSessionMetadata): Promise<void>;
