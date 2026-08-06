import type { SandboxSeedFile } from "#shared/sandbox-backend.js";
import type { InternalSandboxSession, SandboxProcess, SandboxRemovePathOptions, SandboxSession, SandboxSpawnOptions } from "#shared/sandbox-session.js";
export interface FileBackedSandbox {
    readFileBytes(path: string): Promise<Buffer | null>;
    removePath(options: SandboxRemovePathOptions): Promise<void>;
    spawn(options: SandboxSpawnOptions): Promise<SandboxProcess>;
    writeFiles(files: ReadonlyArray<{
        readonly path: string;
        readonly content: Uint8Array;
    }>): Promise<void>;
}
export declare function createFileBackedInternalSandboxSession(input: {
    readonly id: string;
    readonly sandbox: FileBackedSandbox;
}): InternalSandboxSession;
export declare function resolveWorkspacePath(path: string): string;
export declare function pathExists(path: string): Promise<boolean>;
export declare function copyDirectoryAtomically(sourcePath: string, targetPath: string): Promise<void>;
export declare function touchDirectory(path: string): Promise<void>;
export declare function resolveLocalBackendTemplateRootPath(cacheDirectory: string, backendCacheName: string, templateKey: string): string;
export declare function resolveLocalBackendTemplatesDirectory(cacheDirectory: string, backendCacheName: string): string;
export declare function resolveLocalBackendSessionRootPath(cacheDirectory: string, backendCacheName: string, sessionKey: string): string;
export declare function writeSandboxSeedFiles(session: SandboxSession, seedFiles: ReadonlyArray<SandboxSeedFile>): Promise<void>;
